/* eslint-disable react-hooks/exhaustive-deps */
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../api/userData';

function BookingCard({ projectObj }) {
  const { user } = useAuth();
  const [cardView, setCardView] = useState({});

  const getCardView = () => {
    getUser(user.uid).then(setCardView);
  };

  useEffect(() => {
    getCardView();
  }, [user]);

  return (
    <>
      <Card style={{
        width: '18rem', height: '15rem', margin: '10px', backgroundColor: 'goldenrod', color: 'black', borderRadius: '40px', justifyContent: 'center',
      }}
      >
        <Card.Body>
          <Card.Title>{projectObj.projectName}</Card.Title>
          {cardView.isEngineer ? (
            <><br />
              <Link href={`/projects/${projectObj.firebaseKey}`} passHref>
                <Button variant="success" className="m-2">VIEW</Button>
              </Link>
            </>
          ) : (
            <div>
              {/* <Link href={`/projects/${projectObj.firebaseKey}`} passHref>
                <Button variant="outline-primary" className="m-2">
                  VIEW
                </Button>
              </Link> */}
              {/* <Link href="/updateBooking" passHref>
                <Button variant="outline-primary" className="m-2">
                  Accept Booking
                </Button>
              </Link> */}
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default BookingCard;

BookingCard.propTypes = {
  projectObj: PropTypes.shape({
    projectName: PropTypes.string,
    genre: PropTypes.string,
    tempo: PropTypes.string,
    songKey: PropTypes.string,
    instruments: PropTypes.string,
    engineer: PropTypes.bool.isRequired,
    notes: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
