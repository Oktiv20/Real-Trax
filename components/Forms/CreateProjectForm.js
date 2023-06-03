/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createProject, updateProject } from '../../api/projectData';
import { getEngineer } from '../../api/userData';

const initialState = {
  projectName: '',
  genre: '',
  tempo: '',
  songKey: '',
  instruments: [],
  engineer_id: '',
  notes: '',
};

export default function ProjectForm({ projectObj, engineerObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [engineers, setEngineers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const [selectedInstruments, setSelectedInstruments] = useState([]);

  const sounds = [
    { value: 'Drums', label: 'Drums' },
    { value: 'Bass', label: 'Bass' },
    { value: 'Electric Guitar', label: 'Electric Guitar' },
    { value: 'Acoustic Guitar', label: 'Acoustic Guitar' },
    { value: 'Piano', label: 'Piano' },
    { value: 'Synth', label: 'Synth' },
    { value: 'B3 Organ', label: 'B3 Organ' },
    { value: 'Strings', label: 'Strings' },
    { value: 'Horns', label: 'Horns' },
    { value: 'Woodwinds', label: 'Woodwinds' },
  ];

  useEffect(() => {
    getEngineer().then(setEngineers);
    if (projectObj?.firebaseKey) {
      setFormInput((prevState) => ({
        ...prevState,
        ...projectObj,
        engineer: projectObj.engineer || '',
        engineer_id: engineerObj.firebaseKey,
      }));

      // Convert instruments string to an array of objects with value and label properties
      const instrumentsArray = projectObj.instruments?.split(', ').map((instrument) => ({
        value: instrument,
        label: instrument,
      }));
      setSelectedInstruments(instrumentsArray);
    } else {
      setFormInput((initialState));
    }
  }, [projectObj, user, engineerObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = value;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectObj.firebaseKey) {
      updateProject(formInput)
        .then(() => router.push(`/projects/${projectObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createProject(payload).then(() => {
        router.push('/projects');
      });
    }
  };

  const handleInstrumentChange = (selectedOptions) => {
    setSelectedInstruments(selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormInput((prevState) => ({
      ...prevState,
      instruments: selectedValues.join(','),
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{projectObj.firebaseKey ? 'Update' : 'Create'} Projects</h2>

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
          <option value="R&B">Hip-Hop</option>
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
      <FloatingLabel controlId="floatingInput5" className="mb-3">
        <ReactSelect
          options={sounds}
          isMulti
          closeMenuOnSelect={false}
          value={selectedInstruments}
          onChange={handleInstrumentChange}
          onSubmit={handleSubmit}
          placeholder="Instrument(s)"
          styles={{
            control: (provided) => ({
              ...provided,
              width: '100%',
              minHeight: '50px',
            }),
          }}
        />
      </FloatingLabel>

      {/* ENGINEER INPUT */}
      <FloatingLabel controlId="floatingInput6" label="Engineer" className="mb-3">
        <Form.Select
          placeholder="Select Engineer"
          name="engineer"
          value={formInput.engineer}
          onChange={handleChange}
          required
        >
          <option value="">Select an Engineer</option>
          {engineers.map((engineer) => (
            <option key={engineer.uid} value={engineer.lastName}>
              {engineer.firstName} {engineer.lastName}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

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
    instruments: PropTypes.array.isRequired,
    engineer: PropTypes.bool.isRequired,
    engineer_id: PropTypes.string,
    notes: PropTypes.string,
    firebaseKey: PropTypes.string,
    label: PropTypes.string,
    isSelected: PropTypes.bool,
  }),
};

ProjectForm.propTypes = {
  engineerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
};

ProjectForm.defaultProps = {
  projectObj: initialState,
};

ProjectForm.defaultProps = {
  engineerObj: initialState,
};
