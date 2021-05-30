import Link from 'next/link'

import Card from '../components/card';
import Container from '../components/container';
import useUser from '../components/lib/useUser';

const FlightInsurance = () => {
  const { user } = useUser({ redirectTo: '/login' })

  if (!user || user.isLoggedIn === false) {
    return null;
  }

  return (
    <Container title="Adipoli | Flight Insurance">
      <h1 className="title">
        Flight <span>Insurance</span>
      </h1>
    </Container>
  )
};

export default FlightInsurance;
