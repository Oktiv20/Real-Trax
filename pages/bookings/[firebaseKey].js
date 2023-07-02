import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { viewEngineerBookings } from '../../api/mergedData';
// import { getSingleUser } from '../../api/userData';

export default function ViewBooking() {
  const [projectDetails, setProjectDetails] = useState({});
  // const [artistObj, setArtistObj] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewEngineerBookings(firebaseKey).then(setProjectDetails);
  }, [firebaseKey]);

  // useEffect(() => {
  //   if (projectDetails.artist_id) {
  //     viewUserInfo(firebaseKey)
  //       .then(setArtistObj);
  //   }
  // }, [firebaseKey, projectDetails.artist_id]);

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
          height: '100vh',
        }}
      >
        <Card
          style={{
            width: '25rem',
            height: 'auto',
            margin: '10px',
            background: 'linear-gradient(to bottom right, #FF8300, #f7b008)',
            color: 'black',
            borderRadius: '40px',
            alignItems: 'center',
          }}
        >
          <Card.Body>
            <br />
            <Card.Title>{projectDetails?.projectName}</Card.Title>
            <hr />
            <br />
            <Card.Text>
              {/* Artist: {artistObj?.firstName} {artistObj?.lastName}
              <br />
              <br /> */}
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
              Notes: {projectDetails?.notes}
              <br />
              <br />
              Project Status: Accepted, Pending, or Declined
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
