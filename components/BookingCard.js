import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

function BookingCard({ projectObj }) {
  return (
    <Card
      className="project-card"
      style={{
        width: '20rem',
        height: '20rem',
        margin: '10px',
        background: 'linear-gradient(to bottom right, #FF8300, #f7b008)',
        color: 'black',
        borderRadius: '50%',
        justifyContent: 'center',
        boxShadow: '0 0 10px 5px rgba(255, 165, 0, 0.5)',
        position: 'relative',
      }}
    >
      <Card.Body>
        <br />
        <br />
        <br />
        <Card.Title style={{ fontSize: '23px' }}>{projectObj?.projectName}</Card.Title>
        <br />
        <br />
        <div className="card-buttons">
          <Link href={`/bookings/${projectObj?.firebaseKey}`} passHref>
            <Button variant="dark" className="m-2 view-button" size="sm" style={{ background: 'black', color: 'white' }}>
              VIEW
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
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
    engineer: PropTypes.bool,
    notes: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
