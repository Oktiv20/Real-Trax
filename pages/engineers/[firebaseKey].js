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
      <div className="text-center my-4 d-flex justify-content-center flex-wrap">
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
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
