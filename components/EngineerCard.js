import { PropTypes } from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function EngineerCard({ engineerObj }) {
  // console.log('THIS SHOULD SHOW THE ENGINEER', engineerObj);

  const preferredGenre = Array.isArray(engineerObj.preferredGenre)
    ? engineerObj.preferredGenre.join(', ')
    : engineerObj.preferredGenre;
  return (
    <>
      <Card style={{
        width: '25rem', height: 'auto', margin: '10px', background: 'linear-gradient(to bottom right, #e6c200, #ffb700)', color: 'black', borderRadius: '40px', boxShadow: '0 0 10px 5px rgba(255, 165, 0, 0.5)',
      }}
      >
        <Card.Body>
          <Card.Title style={{
            fontSize: '35px',
          }}
          >{engineerObj?.firstName} {engineerObj?.lastName}
          </Card.Title>
          <br />
          <Card.Text>
            Phone Number: {engineerObj?.phoneNumber}
            <br />
            <br />
            Email: {engineerObj?.email}
            <br />
            <br />
            Daily Rate: {engineerObj?.dailyRate}
            <br />
            <br />
            Preferred Genre(s): {preferredGenre}
            <br />
            <br />
            Experience: {engineerObj?.experience}
            <br />
            <br />
            Link to Credits: {engineerObj?.creditsLink}
          </Card.Text>
          <br />
          <Link href={`/users/edit/${engineerObj?.firebaseKey}`} passHref>
            <Button variant="dark" className="m-2" size="lg" style={{ background: 'black', color: 'white' }}>UPDATE INFO</Button>
          </Link>
          <Link href="/engineerBookings" passHref>
            <Button variant="dark" className="m-2" size="lg" style={{ background: 'black', color: 'white' }}>BOOKINGS</Button>
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
