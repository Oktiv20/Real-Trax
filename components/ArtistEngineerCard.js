import { PropTypes } from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function ArtistEngineerCard({ engineerObj }) {
  const preferredGenre = Array.isArray(engineerObj.preferredGenre)
    ? engineerObj.preferredGenre.join(', ')
    : engineerObj.preferredGenre;
  return (
    <>
      <Card style={{
        width: '25rem', height: 'auto', margin: '10px', background: 'linear-gradient(to bottom right, #e6c200, #ffb700)', color: 'black', borderRadius: '40px', boxShadow: '0 0 10px 5px rgba(255, 165, 0, 0.5)',
      }}
      >
        <Card.Body>
          <Card.Title style={{
            fontSize: '35px',
          }}
          >{engineerObj.firstName} {engineerObj.lastName}
          </Card.Title>
          <Card.Text>
            Phone Number: {engineerObj.phoneNumber}
            <br />
            <br />
            Email: {engineerObj.email}
            <br />
            <br />
            Daily Rate: {engineerObj.dailyRate}
            <br />
            <br />
            Preferred Genre: {preferredGenre}
            <br />
            <br />
            Experience: {engineerObj.experience}
            <br />
            <br />
            Link to Credits: {engineerObj.creditsLink}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

ArtistEngineerCard.propTypes = {
  engineerObj: PropTypes.shape({
    description: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    dailyRate: PropTypes.string,
    preferredGenre: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    experience: PropTypes.string,
    creditsLink: PropTypes.string,
    isEngineer: PropTypes.bool.isRequired,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
