import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getSingleUser } from '../../api/userData';

export default function ViewUser() {
  const [engineerObj, setEngineerObj] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleUser(firebaseKey).then(setEngineerObj);
  }, [firebaseKey]);

  // This checks if the engineerObj?.preferredGenre is an array by using the Array.isArray() method. It returns true if engineerObj?.preferredGenre is an array. If engineerObj?.preferredGenre is an array, it joins the elements of the engineerObj?.preferredGenre array into a single string, separated by commas and a space.
  const preferredGenre = Array.isArray(engineerObj?.preferredGenre)
    ? engineerObj?.preferredGenre.join(', ')
    : engineerObj?.preferredGenre;

  return (
    <div className="text-center my-4 text-white">
      <h1>ENGINEER DETAILS</h1>
      <hr style={{ color: 'white', borderWidth: '3px', opacity: '0.5' }} />
      <div className="card-container">
        <Card
          style={{
            width: '350px',
            margin: '50px auto',
            background: 'linear-gradient(to bottom right, #e6c200, #ffb700)',
            color: 'black',
            borderRadius: '40px',
            justifyContent: 'center',
            boxShadow: '0 0 10px 5px rgba(255, 165, 0, 0.5)',
            opacity: '0.87',
          }}
        >
          <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card.Title style={{ fontSize: '40px', marginBottom: '10px' }}>
              {engineerObj?.firstName} {engineerObj?.lastName}
            </Card.Title>
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
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
