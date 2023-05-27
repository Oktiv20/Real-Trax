import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createProject, getProjects, updateProject } from '../../api/projectData';

const initialState = {
  projectName: '',
  genre: '',
  tempo: '',
  songKey: '',
  instruments: '',
  engineer: '',
  notes: '',
};

export default function ProjectForm({ projectObj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [engineers, setEngineers] = useState([]);
  // const [projects, setProjects] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getProjects(user.uid).then(setFormInput);

    if (projectObj.firebaseKey) setFormInput(projectObj);
  }, [projectObj, user]);

  // useEffect(() => {
  //   getEngineers(user.uid).then(setEngineers);

  //   if (engineerObj.firebaseKey) setFormInput(engineerObj);
  // }, [projectObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectObj.firebaseKey) {
      updateProject(formInput).then(() => router.push(`/projects/${projectObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createProject(payload).then(() => {
        router.push('/projects');
      });
    }
  };

  // <div className="text-center d-flex flex-wrap">
  //   {projects.map((project) => (
  //     <ProjectCard key={project.firebaseKey} projectObj={project} onUpdate={getAllTheProjects} />
  //   ))}
  // </div>;

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{projectObj.firebaseKey ? 'Update' : 'Create'} Projects</h2>

      {/* PROJECT NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Project Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Project Name"
          name="projectName"
          value={formInput.projectName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* GENRE INPUT */}
      <FloatingLabel controlId="floatingInput2" label="Genre" className="mb-3">
        <Form.Select
          type="text"
          placeholder="Genre(s)"
          name="genre"
          value={formInput.genre}
          onChange={handleChange}
          required
        >
          <option value="">Select Genre</option>
          <option value="Pop">Pop</option>
          <option value="Country">Country</option>
          <option value="Rock">Rock</option>
          <option value="Indie">Indie</option>
          <option value="R&B">R&B</option>
          <option value="Metal">Metal</option>
          <option value="Jazz">Jazz</option>
          <option value="Classical">Classical</option>
          <option value="Folk">Folk</option>
          <option value="Soul">Soul</option>
          <option value="Punk">Punk</option>
          <option value="Blues">Blues</option>
        </Form.Select>
      </FloatingLabel>

      {/* TEMPO INPUT */}
      <FloatingLabel controlId="floatingInput3" label="Tempo" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Tempo"
          name="tempo"
          value={formInput.tempo}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SONG KEY INPUT */}
      <FloatingLabel controlId="floatingInput4" label="Key" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Key"
          name="songKey"
          value={formInput.songKey}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* INSTRUMENT INPUT */}
      <FloatingLabel controlId="floatingInput5" label="Instrument" className="mb-3">
        <Form.Select
          type="text"
          placeholder="Instrument(s)"
          name="instruments"
          value={formInput.instruments}
          onChange={handleChange}
          required
        >
          <option value="">Select Instrument</option>
          <option value="Drums">Drums</option>
          <option value="Bass">Bass</option>
          <option value="Electric Guitar">Electric Guitar</option>
          <option value="Acoustic Guitar">Acoustic Guitar</option>
          <option value="Piano">Piano</option>
          <option value="Synth">Synth</option>
          <option value="B3 Organ">B3 Organ</option>
          <option value="Strings">Strings</option>
          <option value="Horns">Horns</option>
          <option value="Woodwinds">Woodwinds</option>
        </Form.Select>
      </FloatingLabel>

      {/* ENGINEER INPUT
      <FloatingLabel controlId="floatingInput6" label="Engineer" className="mb-3">
        <Form.Select
          type="text"
          placeholder="Select Engineer"
          name="engineer"
          value={formInput.engineer}
          onChange={handleChange}
          required
        >
          <option value="">Select an Engineer</option>
          {
            engineers.map((engineer) => (
              <option
                key={engineer.firebaseKey}
                value={engineer.firebaseKey}
              >
                {engineer.firstName} {engineer.lastName}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel> */}

      {/* NOTES INPUT */}
      <FloatingLabel controlId="floatingInput7" label="Notes" className="mb-3">
        <Form.Control
          type="textarea"
          placeholder="Notes"
          name="notes"
          value={formInput.notes}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON */}
      <Button type="submit">{projectObj.firebaseKey ? 'Update' : 'Create'} Project</Button>
    </Form>
  );
}

ProjectForm.propTypes = {
  projectObj: PropTypes.shape({
    projectName: PropTypes.string,
    genre: PropTypes.string,
    tempo: PropTypes.string,
    songKey: PropTypes.string,
    instruments: PropTypes.string,
    engineer: PropTypes.bool,
    notes: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ProjectForm.defaultProps = {
  projectObj: initialState,
};
