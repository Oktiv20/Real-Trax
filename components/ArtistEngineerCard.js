import { PropTypes } from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function ArtistEngineerCard({ engineerObj }) {
  return (
    <>
      <Card style={{
        width: '25rem', height: '25rem', margin: '10px', background: 'linear-gradient(to bottom right, #FF8300, #f7b008)', color: 'black', borderRadius: '40px',
      }}
      >
        <Card.Body>
          <Card.Title style={{
            fontSize: '35px',
          }}
          >{engineerObj.firstName} {engineerObj.lastName}
          </Card.Title>
          <br />
          <Card.Text>
            Phone Number: {engineerObj.phoneNumber}
            <br />
            Email: {engineerObj.email}
            <br />
            Daily Rate: {engineerObj.dailyRate}
            <br />
            Preferred Genre: {engineerObj.preferredGenre}
            <br />
            Experience: {engineerObj.experience}
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
    preferredGenre: PropTypes.string,
    experience: PropTypes.string,
    creditsLink: PropTypes.string,
    isEngineer: PropTypes.bool.isRequired,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
