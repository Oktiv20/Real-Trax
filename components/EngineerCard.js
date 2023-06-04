import { PropTypes } from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function EngineerCard({ engineerObj }) {
  // console.log('THIS SHOULD SHOW THE ENGINEER', engineerObj);
  return (
    <>
      <Card style={{
        width: '25rem', height: '35rem', margin: '10px', background: 'linear-gradient(to bottom right, #FF8300, #f7b008)', color: 'black', borderRadius: '40px',
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
            Preferred Genre(s): {engineerObj?.preferredGenre}
            <br />
            <br />
            Experience: {engineerObj?.experience}
            <br />
            <br />
            Link to Credits: {engineerObj?.creditsLink}
          </Card.Text>
          <br />
          <Link href={`/users/edit/${engineerObj?.firebaseKey}`} passHref>
            <Button variant="dark" className="m-2" size="md" style={{ background: 'black', color: 'white' }}>EDIT</Button>
          </Link>
          <Link href="/engineerBookings" passHref>
            <Button variant="dark" className="m-2" size="md" style={{ background: 'black', color: 'white' }}>BOOKINGS</Button>
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
