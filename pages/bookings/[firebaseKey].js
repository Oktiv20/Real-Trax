import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { viewEngineerBookings } from '../../api/mergedData';

export default function ViewBooking() {
  const [projectDetails, setProjectDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewEngineerBookings(firebaseKey).then(setProjectDetails);
  }, [firebaseKey]);

  // This checks if the projectDetails.instruments is an array by using the Array.isArray() method. It returns true if projectDetails.instruments is an array. If projectDetails.instruments is an array, it joins the elements of the projectDetails.instruments array into a single string, separated by commas and a space.
  const instruments = Array.isArray(projectDetails.instruments)
    ? projectDetails.instruments.join(', ')
    : projectDetails.instruments;

  return (
    <div className="text-center my-4 text-white">
      <h1>BOOKING DETAILS</h1>
      <hr style={{ color: 'white', borderWidth: '3px', opacity: '0.5' }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '40px',
          opacity: '0.9',
        }}
      >
        <Card
          style={{
            width: '25rem',
            height: 'auto',
            background: 'linear-gradient(to bottom right, #e6c200, #ffb700)',
            color: 'black',
            borderRadius: '40px',
            alignItems: 'center',
          }}
        >
          <Card.Body style={{
            paddingTop: '0px',
          }}
          >
            <br />
            <Card.Text style={{
              fontSize: '30px',
            }}
            ><strong>Artist: {projectDetails?.artistObject?.firstName} {projectDetails?.artistObject?.lastName}</strong>
            </Card.Text>
            <Card.Text><strong>Phone Number:</strong> {projectDetails?.artistObject?.phoneNumber}</Card.Text>
            <hr />
            <Card.Title style={{
              marginBottom: '25px',
            }}
            >{projectDetails?.projectName}
            </Card.Title>
            <Card.Text>
              <strong>Genre:</strong> {projectDetails?.genre}
            </Card.Text>
            <Card.Text>
              <strong>Tempo:</strong> {projectDetails?.tempo}
            </Card.Text>
            <Card.Text>
              <strong>Key:</strong> {projectDetails?.songKey}
            </Card.Text>
            <Card.Text>
              <strong>Instrument(s):</strong> {instruments}
            </Card.Text>
            <Card.Text>
              <strong>Notes:</strong> {projectDetails?.notes}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
