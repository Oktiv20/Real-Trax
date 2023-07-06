import { PropTypes } from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function EngineerCard({ engineerObj }) {
  // This checks if the engineerObj.preferredGenre is an array by using the Array.isArray() method. It returns true if engineerObj.preferredGenre is an array. If engineer.preferredGenre is an array, it joins the elements of the engineerObj.preferredGenre array into a single string, separated by commas and a space.
  const preferredGenre = Array.isArray(engineerObj.preferredGenre)
    ? engineerObj.preferredGenre.join(', ')
    : engineerObj.preferredGenre;
  return (
    <>
      <Card style={{
        width: '350px',
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
              src="Images/engineerImage.png"
              style={{
                height: '90px', width: '90px', borderRadius: '20%', objectFit: 'cover',
              }}
            />
          </div>
          <Card.Title style={{ fontSize: '40px', marginBottom: '10px' }}>
            {engineerObj?.firstName} {engineerObj?.lastName}
          </Card.Title>
          <br />
          <Card.Text>
            <strong>Phone:</strong> {engineerObj?.phoneNumber}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> {engineerObj?.email}
          </Card.Text>
          <Card.Text>
            <strong>Daily Rate:</strong> {engineerObj?.dailyRate}
          </Card.Text>
          <Card.Text>
            <strong>Preferred Genre(s):</strong> {preferredGenre}
          </Card.Text>
          <Card.Text>
            <strong>Experience:</strong> {engineerObj?.experience}
          </Card.Text>
          <Card.Text>
            <strong>Credits Link:</strong> {engineerObj?.creditsLink}
          </Card.Text>
          <div style={{ display: 'flex' }}>
            <Link href="/engineerBookings" passHref>
              <Button variant="dark" style={{ background: 'black', color: 'white', marginRight: '40px' }}>
                BOOKINGS
              </Button>
            </Link>
            <Link href={`/users/edit/${engineerObj?.firebaseKey}`} passHref>
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

EngineerCard.propTypes = {
  engineerObj: PropTypes.shape({
    description: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    dailyRate: PropTypes.string,
    preferredGenre: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    experience: PropTypes.string,
    creditsLink: PropTypes.string,
    isEngineer: PropTypes.bool,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
