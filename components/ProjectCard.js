import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleProject } from '../api/projectData';

function ProjectCard({ projectObj, onUpdate }) {
  const deleteThisProject = () => {
    if (window.confirm(`Delete ${projectObj?.projectName}?`)) {
      deleteSingleProject(projectObj?.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card
      className="project-card"
      style={{
        width: '20rem',
        height: '20rem',
        margin: '10px',
        background: 'linear-gradient(to bottom right, #e6c200, #ffb700)',
        color: 'black',
        borderRadius: '50%',
        justifyContent: 'center',
        boxShadow: '0 0 10px 5px rgba(255, 165, 0, 0.5)',
        position: 'relative',
        opacity: '0.9',
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
          <Link href={`/projects/${projectObj?.firebaseKey}`} passHref>
            <Button variant="dark" className="m-2 view-button" size="sm" style={{ background: 'black', color: 'white' }}>
              VIEW
            </Button>
          </Link>
          <Link href={`/projects/edit/${projectObj?.firebaseKey}`} passHref>
            <Button variant="dark" className="m-2 edit-button" size="sm" style={{ background: 'black', color: 'white' }}>
              EDIT
            </Button>
          </Link>
          <Button
            variant="dark"
            onClick={deleteThisProject}
            className="m-2 delete-button"
            size="sm"
            style={{ background: 'black', color: 'white' }}
          >
            DELETE
          </Button>
        </div>
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
    engineer: PropTypes.string,
    notes: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
