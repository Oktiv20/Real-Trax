import Link from 'next/link';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function ArtistCard({ artistObj }) {
  return (
    <>
      <Card style={{
        width: '25rem', height: '18rem', margin: '10px', backgroundColor: 'black', color: 'white', borderRadius: '40px', justifyContent: 'center',
      }}
      >
        <Card.Body>
          <Card.Img variant="top" src={artistObj.photoURL} />
          <Card.Title>{artistObj.firstName} {artistObj.lastName}</Card.Title>
          <br />
          <Card.Text>
            Phone Number: {artistObj.phoneNumber}
            <br />
            <br />
            Email: {artistObj.email}
            <br />
            <br />
            Title: {artistObj.title}
          </Card.Text>
          <Link href={`/users/edit/${artistObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Link href={`/projects/${artistObj.firebaseKey}`} passHref>
            <Button variant="warning">PROJECTS</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

ArtistCard.propTypes = {
  artistObj: PropTypes.shape({
    photoURL: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    title: PropTypes.string,
    dailyRate: PropTypes.string,
    preferredGenre: PropTypes.string,
    experience: PropTypes.string,
    creditsLink: PropTypes.string,
    isEngineer: PropTypes.bool,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
