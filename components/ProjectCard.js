import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { deleteSingleProject } from '../api/projectData';

function ProjectCard({ projectObj, onUpdate }) {
  const deleteThisProject = () => {
    if (window.confirm(`Delete ${projectObj.projectName}?`)) {
      deleteSingleProject(projectObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card style={{
        width: '25rem', height: '28rem', margin: '10px', backgroundColor: 'black', color: 'white', borderRadius: '40px', justifyContent: 'center',
      }}
      >
        <Card.Body>
          <Card.Title>{projectObj.projectName} </Card.Title>
          <br />
          <Card.Text>
            Genre: {projectObj.genre}
            <br />
            <br />
            Tempo: {projectObj.tempo}
            <br />
            <br />
            Key: {projectObj.songKey}
            <br />
            <br />
            Instrument: {projectObj.instruments}
            <br />
            <br />
            Engineer: {projectObj.engineer}
            <br />
            <br />
            Notes: {projectObj.notes}
            <br />
            <br />
            Project Status: Accepted, Pending, or Declined
          </Card.Text>
          <Button variant="danger" onClick={deleteThisProject} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProjectCard;

ProjectCard.propTypes = {
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
  onUpdate: PropTypes.func.isRequired,
};
