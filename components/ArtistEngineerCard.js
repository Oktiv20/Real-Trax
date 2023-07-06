import { PropTypes } from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function ArtistEngineerCard({ engineerObj }) {
  // This checks if the engineerObj.preferredGenre is an array by using the Array.isArray() method. It returns true if engineerObj.preferredGenre is an array. If engineer.preferredGenre is an array, it joins the elements of the engineerObj.preferredGenre array into a single string, separated by commas and a space.
  const preferredGenre = Array.isArray(engineerObj.preferredGenre)
    ? engineerObj.preferredGenre.join(', ')
    : engineerObj.preferredGenre;
  return (
    <>
      <Card style={{
        width: '19rem', height: 'auto', margin: '10px', background: 'linear-gradient(to bottom right, #e6c200, #ffb700)', color: 'black', borderRadius: '40px', boxShadow: '0 0 10px 5px rgba(255, 165, 0, 0.5)', opacity: '0.87',
      }}
      >
        <Card.Body>
          <Card.Title style={{
            fontSize: '35px',
          }}
          >{engineerObj.firstName} {engineerObj.lastName}
            <hr />
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
