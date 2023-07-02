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
          height: '80vh',
        }}
      >
        <Card
          style={{
            width: '30rem',
            height: 'auto',
            marginTop: '0px',
            margin: '10px',
            background: 'linear-gradient(to bottom right, #FF8300, #f7b008)',
            color: 'black',
            borderRadius: '40px',
            alignItems: 'center',
            paddingTop: '30px',
          }}
        >
          <Card.Title style={{
            fontSize: '26px',
          }}
          >{projectDetails?.projectName}
          </Card.Title>
          <Card.Body>
            <hr />
            <Card.Text style={{
              fontSize: '20px',
            }}
            >
              Genre: {projectDetails?.genre}
              <br />
              <br />
              Tempo: {projectDetails?.tempo}
              <br />
              <br />
              Key: {projectDetails?.songKey}
              <br />
              <br />
              Instrument(s): {instruments}
              <br />
              <br />
              Engineer: {projectDetails?.engineer}
              <br />
              <br />
              Notes: {projectDetails?.notes}
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
