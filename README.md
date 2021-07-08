# Adipoli

## Inspiration:
Fintech and Blockchain are two areas I'm pretty much interested in. Fintech, because that's what my daily work entails. Blockchain, because I love smart contracts and the decentralized aspect. Trying to bring both these worlds a bit closer is what inspired me to build Adipoli.

## What it does:
##### 1. Flight Insurance
Users can buy flight insurance by selecting their flight (from the departure and arrival airport) and date of travel, and the policy products they need to insure against, like departure delay or arrival delay and so on.

The premium the user needs to pay is based on the amount of risk for that policy. The risk is calculated from:

* 70% weightage = past performance of that flight (any cancellations, flight delayed for 15, 30, 45 minutes, and so on).
* 30% weightage = departure airport delays (any cancellations, flights delayed for 15, 30, 45 minutes, and so on).

If the risk is high, the premium to be paid will also be higher. The premium calculation is done thanks to Chainlink oracles and smart contracts (which is explained in the blockchain section).

Once they have made the payment (from their Adipoli wallet), they can download the policy document that shows the details of their policy, flight, etc. That's it! All eligible policies shall be paid out automatically within 48 hours of their scheduled arrival, straight to their Adipoli wallet.

##### 2. Crypto-currency
The user can buy crypto-currencies (supported by the platform) using their wallet funds. They can also sell their cryptocurrencies and the amount shall be deposited back into their wallet. They can also swap between cryptocurrencies.

They can see the transactions in the dashboard for each sell and buy action (swap will show sell and a buy record). Each transaction will show which cryptocurrency was bought or sold, the price at which it was bought or sold, and more such details. They can also download the transactions as a CSV file.

There is also a portfolio tracker that shows the value of crypto-currencies they held on each day there is a buy or sell action. They can also see the proportion of cryptocurrencies they hold as a doughnut chart.


##### 3. Rapyd wallet
When a user creates an account in Adipoli, a corresponding Rapyd wallet is created for them. They can fund this wallet using credit cards (up to a maximum of $999 at a time) using Rapyd Collect.

They can also generate a payment link to fund their wallet, that they can share with others (even those outside Adipoli). The payment link is hosted by the Rapyd platform and supports credit cards, cash, and bank transfers.

They can also transfer funds to other Adipoli users, only by using their Adipoli email address.

This wallet is used to fund various actions within Adipoli like buying and selling cryptocurrencies, buying flight insurance, and so on.

## How I built it:

The web app is built using React and NextJS and is hosted on Vercel. It also uses APIs like Rapyd (collect, wallet APIs), CoinGecko (for price-related data), and AviationStack (for flight-related data). User data is stored in an Atlas MongoDB cluster. It also uses a smart contract running in Rinkeny testnet.

###### Backend
All flight-related and crypto-related APIs, database calls are routed through the backend API server, as the API key & secrets are not stored in this GitHub repo (but rather in our server). Likewise, the private key of the ethereum account.

The server also uses a key-value cache to speed up some calculations and for some performance improvements.

The premium for the flight insurance is calculated by the following logic:
* Web app calls the API server
* API server calls the smart contract, as the smart contract functions are set to be called only by the owner of the contract.
* It will trigger calls to the Chainlink Oracles which will retrieve the historical delays of the flight and the airports
* Using the above values, it will use safe math to calculate the premium value
* It's retrieved by the API server and then back to the web app.

The policy maturity payment is calculated by the following logic:
* The policy maturity payment is calculated based on the delay, cancellation of the flight, and the insurance products against which the user has been insured.
* Max possible payment is set to the cancellation rate (which is $100).
* Once the total delay (including the departure and arrival) is calculated, then the total payment is calculated by the following stub:
    * first 15 minutes delays are paid at a rate of $0.1 per minute
    * next 30 minutes are paid at a rate of $0.2 per minute
    * next 60 minutes are paid at a rate of $0.3 per minute
    * next 120 minutes and above are paid at a rate of $0.4 per minute

##### Blockchain
Our smart contract (Adipoli.sol) is deployed to the Rinkeby ethereum testnet.

When a request comes in to calculate the premium for a policy, it'll create 2 Chainlink requests to be sent to the Oracle - once to calculate the airport rating and the other to calculate the flight rating. When any of the jobs are completed, it'll update the state of the Premium object for that policy. Then (thanks to safe math operations), we use the weighted average method to calculate the premium risk.

This is then passed to the backend server.


## Challenges I ran into:

* Debugging smart contract errors was no easy task. It took a few iterations and deployments of the solidity code to get it all working fine.

* Flight data is expensive. API access to such flight data comes with many restrictions and costs.  Hence needed to design the APIs to circumvent a few of those restrictions. To reduce the request limits, a caching layer is also used.

## Accomplishments that I'm proud of:

* No need for claiming insurance payments when your flight is delayed or canceled. It's automatically tabulated by blockchain technology and transferred to your wallet within 48 hours of your scheduled flight landing. You don't have to lift a finger!

* Insurance premium is calculated entirely by a smart contract. Anybody can peek into the solidity code, and see the trustless interaction with oracles and smart contracts. Gotta love blockchain!

* Cryptocurrencies for the masses. You can buy, sell, and even swap between crypto-currencies without understanding the nitty-gritty details of blockchain technologies. Add a portfolio tracker to that as well!

* UI/UX. Clean and modern responsive design created from scratch.

## What I have learned:

* Definitely loved the simple aspect of Rapyd APIs and how easy it is to create a fintech app using Rapyd. Documentation was plenty, but the postman collection was instrumental in helping me get started quickly.

* Though I had been a Solidity learner for quite some time, this hackathon has helped me learn more, with respect to solidity code, debugging, testnets, oracles, and so on.


## What's next for Adipoli:
* Flight Insurance
    * Improve the flight insurance premium calculation logic by adding more data points.
    * More policy products
* Crypto-currency
    * Add more crypto-currencies to the exchange
    * Monthly or weekly recurring buy option
    * Lend your cryptocurrencies and earn interest
* Wallet
    * Save your credit card
    * Auto top-ups (when your balance falls below $x, automatically top-up)
