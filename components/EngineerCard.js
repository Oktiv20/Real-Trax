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
        width: '20rem', height: 'auto', margin: '10px', background: 'linear-gradient(to bottom right, #e6c200, #ffb700)', color: 'black', borderRadius: '40px', boxShadow: '0 0 10px 5px rgba(255, 165, 0, 0.5)',
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
          <Link href="/engineerBookings" passHref>
            <Button variant="dark" className="m-2" size="md" style={{ background: 'black', color: 'white' }}>BOOKINGS</Button>
          </Link>
          <br />
          <Link href={`/users/edit/${engineerObj?.firebaseKey}`} passHref>
            <Button variant="dark" className="m-2" size="md" style={{ background: 'black', color: 'white' }}>UPDATE INFO</Button>
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
