// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.6/vendor/Ownable.sol";
import "@chainlink/contracts/src/v0.6/vendor/SafeMathChainlink.sol";

/**
 * @title Adipoli is a contract which requests data from the Chainlink network
 * @dev This contract is designed to work on multiple networks, including
 * local test networks
 */
contract Adipoli is ChainlinkClient, Ownable {
  using SafeMathChainlink for uint256;
  using Chainlink for Chainlink.Request;

  address private oracle;
  bytes32 private jobId;
  uint256 private fee;

  string private constant GET_AIRPORT_DELAY_URL = "https://adipoli.vercel.app/api/airport/delay";
  string private constant GET_FLIGHT_RATING_URL = "https://adipoli.vercel.app/api/flight/stats";

  struct Flight {
    string from;
    string to;
    string code;
    string name;
    string departureTime;
    string arrivalTime;
  }

  struct Payment {
    bool paid;
    uint256 amount;
    string txHash;
  }

  struct Policy {
    string policyId;
    string owner;
    string date;
    string[] products;
    Flight flight;
    Payment premium;
    Payment payment;
  }

  enum PremiumRequestStatus {INIT, SENT, COMPLETED}

  struct Premium {
    bool init;
    uint256 airportRating;
    uint256 flightRating;
    PremiumRequestStatus hasAirportRating;
    PremiumRequestStatus hasFlightRating;
  }

  string[] policyIds;
  mapping(string => bool) isPolicy;
  mapping(string => Policy) policies;
  mapping(string => Premium) premiums;
  mapping(bytes32 => string) requests;

  constructor()
    public
  {
    setPublicChainlinkToken();

    oracle = 0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40;
    jobId = "3b7ca0d48c7a4b2da9268456665d11ae";
    fee = 0.01 * 10 ** 18;
  }

  // Create a new policy.
  function createNewPolicy(Policy memory _policy)
    public
    onlyOwner
  {
    // Verify that the payment is valid.
    uint256 _premium = calcPremiumHelper(_policy.policyId);
    require(_premium <= _policy.premium.amount);

    policies[_policy.policyId] = _policy;
    isPolicy[_policy.policyId] = true;
    policyIds.push(_policy.policyId);
  }

  function getUnpaidPolicies(string memory date)
    public
    view
    onlyOwner
    returns (Policy[] memory)
  {
    uint256 _count = unpaidPoliciesCount(date);
    Policy[] memory _policies = new Policy[](_count);

    uint256 _pushIndex;
    for (uint _index = 0; _index < policyIds.length; ++_index) {
      Policy memory _policy = policies[policyIds[_index]];

      if (
        _policy.payment.paid == false &&
        equals(_policy.owner, '0x0') == false &&
        equals(date, _policy.date)
      ) {
        _policies[_pushIndex] = _policy;
        _pushIndex++;
      }
    }

    return _policies;
  }

  // Get policy details.
  function getPolicy(string memory _policyId)
    public
    view
    onlyOwner
    returns (Policy memory)
  {
    if (isPolicy[_policyId] == true) {
      // Policy exists.
      Policy memory _policy = policies[_policyId];
      return _policy;
    } else {
      // Policy doesnt exist.
      // Return a dummy.
      string[] memory products;
      Policy memory _policy = Policy(
        "0",
        "0x0",
        "",
        products,
        Flight("", "", "", "", "", ""),
        Payment(false, 0, ""),
        Payment(false, 0, "")
      );
      return _policy;
    }
  }

  function getPremium(string memory _policyId)
    public
    view
    onlyOwner
    returns (uint256 _result)
  {
    // Calculate the premium if chainlink requests have all returned.
    // Its done using weighted average.
    _result = 0;
    if (
      premiums[_policyId].hasAirportRating ==
      PremiumRequestStatus.COMPLETED &&
      premiums[_policyId].hasFlightRating ==
      PremiumRequestStatus.COMPLETED
    ) {
      _result = calcPremiumHelper(_policyId);
    }
  }

  // Calculate the policy premium.
  function calculatePremium(
    string memory _policyId,
    string memory _from,
    string memory _flight
  ) public onlyOwner {
    // Set the initial state.
    if (premiums[_policyId].init == false) {
      premiums[_policyId].hasAirportRating = PremiumRequestStatus.INIT;
      premiums[_policyId].hasFlightRating = PremiumRequestStatus.INIT;
      premiums[_policyId].init = true;
    }

    // Send the chainlink requests to the oracles if not sent.
    if (premiums[_policyId].hasAirportRating == PremiumRequestStatus.INIT) {
      getAirportRating(_policyId, _from);
    }
    if (premiums[_policyId].hasFlightRating == PremiumRequestStatus.INIT) {
      getFlightRating(_policyId, _flight);
    }
  }

  function setAirportRating(bytes32 _requestId, uint256 _score)
    public
    recordChainlinkFulfillment(_requestId)
  {
    premiums[requests[_requestId]].hasAirportRating = PremiumRequestStatus
      .COMPLETED;
    premiums[requests[_requestId]].airportRating = _score;
  }

  function setFlightRating(bytes32 _requestId, uint256 _rating)
    public
    recordChainlinkFulfillment(_requestId)
  {
    premiums[requests[_requestId]].hasFlightRating = PremiumRequestStatus
      .COMPLETED;
    premiums[requests[_requestId]].flightRating = _rating;
  }

  function payPolicy(string memory _policyId, uint256 amount)
    public
    onlyOwner
  {
    require(isPolicy[_policyId] == true);
    require(equals(policies[_policyId].owner, '0x0') == false);
    require(policies[_policyId].premium.paid == true);
    require(policies[_policyId].payment.paid == false);

    policies[_policyId].payment.paid = true;
    policies[_policyId].payment.amount = amount;
  }

  fallback() external payable {}

  receive() external payable {}

  /*
   * HELPER FUNCTIONS
   */

  // Calculate the value based on weighted average.
  // Flight Rating (based on historical performance) is given 70% weightage.
  // Departure Airport Rating is given 30% weightage.
  function calcPremiumHelper(string memory _policyId)
    private
    view
    onlyOwner
    returns (uint256 _result)
  {
    uint256 a = premiums[_policyId].flightRating.mul(7);
    uint256 f = premiums[_policyId].airportRating.mul(3);
    _result = a.add(f).div(10);
  }

  function getAirportRating(string memory _policyId, string memory _airport)
    private
    returns (bytes32 requestId)
  {
    string memory _url = string(
      abi.encodePacked(GET_AIRPORT_DELAY_URL, "?airport=", _airport)
    );

    requestId = createRequestTo(_url, "score", this.setAirportRating.selector);

    requests[requestId] = _policyId;
    premiums[_policyId].hasAirportRating = PremiumRequestStatus.SENT;
  }

  function getFlightRating(
    string memory _policyId,
    string memory _flight
  ) private returns (bytes32 requestId) {
    string memory _url = string(
      abi.encodePacked(GET_FLIGHT_RATING_URL, "?flight=", _flight)
    );

    requestId = createRequestTo(_url, "score", this.setFlightRating.selector);

    requests[requestId] = _policyId;
    premiums[_policyId].hasFlightRating = PremiumRequestStatus.SENT;
  }

 /**
  * @notice Creates a request to the specified Oracle contract address
  * @dev This function ignores the stored Oracle contract address and
  * will instead send the request to the address specified
  * @param _url The URL to fetch data from
  * @param _path The dot-delimited path to parse of the response
  * @param _callbackFn The callback function to call once request is processed
  */
  function createRequestTo(
    string memory _url,
    string memory _path,
    bytes4 _callbackFn
  )
    private
    returns (bytes32)
  {
    Chainlink.Request memory req = buildChainlinkRequest(
      jobId,
      address(this),
      _callbackFn
    );
    req.add("get", _url);
    req.add("path", _path);
    return sendChainlinkRequestTo(oracle, req, fee);
  }

  function equals(
    string memory a,
    string memory b
  )
    private
    pure
    returns (bool)
  {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
  }

  function unpaidPoliciesCount(string memory date)
    private
    view
    returns(uint256)
  {
    uint256 resultCount;

    for (uint _index = 0; _index < policyIds.length; ++_index) {
      Policy memory _policy = policies[policyIds[_index]];

      if (
        _policy.payment.paid == false &&
        equals(_policy.owner, '0x0') == false &&
        equals(date, _policy.date)
      ) {
        resultCount++;
      }
    }

    return resultCount;
  }

}
