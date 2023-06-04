import Link from 'next/link';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function ArtistCard({ artistObj }) {
  return (
    <>
      <Card style={{
        width: '25rem', height: '25rem', margin: '10px', background: 'linear-gradient(to bottom right, #FF8300, #f7b008)', color: 'black', borderRadius: '40px', boxShadow: '0 0 10px 5px rgba(255, 165, 0, 0.5)',
      }}
      >
        <Card.Body>
          <br />
          <Card.Title style={{
            fontSize: '35px',
          }}
          >{artistObj.firstName} {artistObj.lastName}
          </Card.Title>
          <br />
          <Card.Text style={{
            fontSize: '25px',
          }}
          >
            Phone Number: {artistObj.phoneNumber}
            <br />
            <br />
            Email: {artistObj.email}
            <br />
            <br />
            Title: {artistObj.title}
          </Card.Text>
          <Link href={`/users/edit/${artistObj.firebaseKey}`} passHref>
            <Button variant="dark" className="m-2" size="md" style={{ background: 'black', color: 'white' }}>UPDATE INFORMATION</Button>
          </Link>
          <Link href="/projects" passHref>
            <Button variant="dark" className="m-2" size="md" style={{ background: 'black', color: 'white' }}>PROJECTS</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

ArtistCard.propTypes = {
  artistObj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    title: PropTypes.string,
    isEngineer: PropTypes.bool,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
