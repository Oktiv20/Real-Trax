import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleProject } from '../api/projectData';

function ProjectCard({ projectObj, onUpdate }) {
  const deleteThisProject = () => {
    if (window.confirm(`Delete ${projectObj.projectName}?`)) {
      deleteSingleProject(projectObj.firebaseKey).then(() => onUpdate());
    }
  };

  // const isEngineer = projectObj.engineer === true;

  return (
    <Card style={{
      width: '18rem', height: '15rem', margin: '10px', backgroundColor: 'goldenrod', color: 'black', borderRadius: '40px', justifyContent: 'center',
    }}
    >
      <Card.Body>
        <br />
        <Card.Title>{projectObj.projectName}</Card.Title>
        <br />
        <br />
        <Link href={`/projects/${projectObj.firebaseKey}`} passHref>
          <Button variant="success" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/projects/edit/${projectObj.firebaseKey}`} passHref>
          <Button variant="info" className="m-2">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisProject} className="m-2">
          DELETE
        </Button>
        {/* <p hidden>Is Engineer: {isEngineer ? 'Yes' : 'No'}</p> */}
      </Card.Body>
    </Card>
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
    engineer: PropTypes.bool.isRequired,
    notes: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
