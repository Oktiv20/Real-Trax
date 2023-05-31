import Link from 'next/link';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function ArtistCard({ artistObj }) {
  return (
    <>
      <Card style={{
        width: '25rem', height: '20rem', margin: '10px', backgroundColor: 'goldenrod', color: 'black', borderRadius: '40px',
      }}
      >
        <Card.Body>
          <br />
          <Card.Title>{artistObj.firstName} {artistObj.lastName}</Card.Title>
          <br />
          Phone Number: {artistObj.phoneNumber}
          <br />
          <br />
          Email: {artistObj.email}
          <br />
          <br />
          Title: {artistObj.title}
          <br />
          <br />
          <Link href={`/users/edit/${artistObj.firebaseKey}`} passHref>
            <Button variant="info" className="m-2">EDIT</Button>
          </Link>
          <Link href="/projects" passHref>
            <Button variant="success" className="m-2">PROJECTS</Button>
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
