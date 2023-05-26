import { PropTypes } from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function EngineerCard({ engineerObj }) {
  return (
    <>
      <Card style={{
        width: '25rem', height: '28rem', margin: '10px', backgroundColor: 'black', color: 'white', borderRadius: '40px', justifyContent: 'center',
      }}
      >
        <Card.Body>
          <Card.Title>{engineerObj.firstName} {engineerObj.lastName}</Card.Title>
          <br />
          <Card.Text>
            Phone Number: {engineerObj.phoneNumber}
            <br />
            <br />
            Email: {engineerObj.email}
            <br />
            <br />
            Daily Rate: {engineerObj.dailyRate}
            <br />
            <br />
            Experience: {engineerObj.experience}
            <br />
            <br />
            Link to Credits: {engineerObj.creditsLink}
          </Card.Text>
          <Link href={`/users/edit/${engineerObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Link href={`/projects/${engineerObj.firebaseKey}`} passHref>
            <Button variant="warning">BOOKINGS</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

EngineerCard.propTypes = {
  engineerObj: PropTypes.shape({
    description: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    dailyRate: PropTypes.string,
    preferredGenre: PropTypes.string,
    experience: PropTypes.string,
    creditsLink: PropTypes.string,
    isEngineer: PropTypes.bool,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
