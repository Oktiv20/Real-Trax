import Link from 'next/link';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function ArtistCard({ artistObj }) {
  return (
    <>
      <Card style={{
        width: '380px',
        margin: '10px',
        background: 'linear-gradient(to bottom right, #e6c200, #ffb700)',
        color: 'black',
        borderRadius: '40px',
        boxShadow: '0 0 10px 5px rgba(255, 165, 0, 0.5)',
        opacity: '0.87',
      }}
      >
        <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '110px',
            width: '100px',
            backgroundColor: 'white',
            borderRadius: '30%',
            marginBottom: '20px',
            opacity: '0.9',
          }}
          >
            <Card.Img
              variant="top"
              src="Images/musicianImage.png"
              style={{
                height: '90px', width: '90px', borderRadius: '20%', objectFit: 'cover',
              }}
            />
          </div>
          <Card.Title style={{ fontSize: '40px', marginBottom: '10px' }}>
            {artistObj?.firstName} {artistObj?.lastName}
          </Card.Title>
          <br />
          <Card.Text style={{ fontSize: '20px' }}>
            <strong>Phone:</strong> {artistObj?.phoneNumber}
          </Card.Text>
          <br />
          <Card.Text style={{ fontSize: '20px' }}>
            <strong>Email:</strong> {artistObj?.email}
          </Card.Text>
          <br />
          <Card.Text style={{ fontSize: '20px' }}>
            <strong>Title:</strong> {artistObj?.title}
          </Card.Text>
          <br />
          <div style={{ display: 'flex' }}>
            <Link href="/projects" passHref>
              <Button variant="dark" style={{ background: 'black', color: 'white', marginRight: '40px' }}>
                PROJECTS
              </Button>
            </Link>
            <Link href={`/users/edit/${artistObj?.firebaseKey}`} passHref>
              <Button variant="dark" style={{ background: 'black', color: 'white' }}>
                UPDATE INFO
              </Button>
            </Link>
          </div>
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
