import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { viewProjectDetails } from '../../api/mergedData';

export default function ViewProject() {
  const [projectDetails, setProjectDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewProjectDetails(firebaseKey).then(setProjectDetails);
  }, [firebaseKey]);

  // This checks if the projectDetails.instruments is an array by using the Array.isArray() method. It returns true if projectDetails.instruments is an array. If projectDetails.instruments is an array, it joins the elements of the projectDetails.instruments array into a single string, separated by commas and a space.
  const instruments = Array.isArray(projectDetails.instruments)
    ? projectDetails.instruments.join(', ')
    : projectDetails.instruments;

  return (
    <div className="text-center my-4 text-white">
      <h1>PROJECT DETAILS</h1>
      <hr style={{ color: 'white', borderWidth: '3px', opacity: '0.5' }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '55vh',
          opacity: '0.9',
        }}
      >
        <Card
          style={{
            width: '30rem',
            height: 'auto',
            marginTop: '0px',
            margin: '10px',
            background: 'linear-gradient(to bottom right, #e6c200, #ffb700)',
            color: 'black',
            borderRadius: '40px',
            alignItems: 'center',
            paddingTop: '30px',
          }}
        >
          <Card.Title style={{
            fontSize: '26px',
            marginBottom: '-10px',
          }}
          >{projectDetails?.projectName}
          </Card.Title>
          <Card.Body>
            <hr />
            <Card.Text style={{
              fontSize: '20px',
            }}
            >
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
                <strong>Engineer:</strong> {projectDetails?.engineer}
              </Card.Text>
              <Card.Text>
                <strong>Notes:</strong> {projectDetails?.notes}
              </Card.Text>
              {/* <br />
              <br />
              Project Status: Accepted, Pending, or Declined */}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
