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
import { getArtist, getEngineer } from '../../api/userData';

const initialState = {
  projectName: '',
  genre: '',
  tempo: '',
  songKey: '',
  instruments: [],
  engineer_id: '',
  artist_id: '',
  notes: '',
};

export default function ProjectForm({ projectObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [engineers, setEngineers] = useState([]);
  const [artists, setArtists] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  // const [selectedFile, setSelectedFile] = useState(null);

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
    getArtist().then(setArtists);
    getEngineer().then(setEngineers);
    if (projectObj?.firebaseKey) {
      setFormInput((prevState) => ({
        ...prevState,
        ...projectObj,
        engineer: projectObj.engineer || '',
        engineer_id: projectObj.engineer_id || '',
        artist_id: projectObj.artist_id || '',
      }));

      // Convert instruments string to an array of objects with value and label properties
      const instrumentsArray = projectObj.instruments?.split(',').map((instrument) => ({
        value: instrument,
        label: instrument,
      }));
      setSelectedInstruments(instrumentsArray);
    } else {
      setFormInput((initialState));
    }
  }, [projectObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = value;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const handleInstrumentChange = (selectedOptions) => {
    setSelectedInstruments(selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormInput((prevState) => ({
      ...prevState,
      instruments: selectedValues.join(','),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectObj?.firebaseKey) {
      updateProject(formInput)
        .then(() => router.push(`/projects/${projectObj.firebaseKey}`));
    } else {
      const selectedEngineer = engineers.find((engineer) => engineer.lastName === formInput.engineer);
      const engineerId = selectedEngineer ? selectedEngineer.firebaseKey : '';
      const selectedArtist = artists.find((artist) => artist.lastName === formInput.artist);
      const artistId = selectedArtist ? selectedArtist.firebaseKey : '';
      const payload = {
        ...formInput,
        uid: user.uid,
        engineer_id: engineerId,
        artist_id: artistId,
      };
      createProject(payload).then(() => {
        router.push('/projects');
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="center-container text-white mt-5 mb-5">{projectObj?.firebaseKey ? 'Update' : 'Create'} Projects</h1>
        <Form
          className="create-form"
          style={{
            width: '40%', height: 'auto', background: 'linear-gradient(to bottom right, #e6c200, #ffb700)', color: 'black', borderRadius: '40px', boxShadow: '0 0 10px 5px rgba(255, 165, 0, 0.5)', justifyContent: 'center', position: 'relative', marginRight: '0px', marginLeft: '30%',
          }}
          onSubmit={handleSubmit}
        >

          {/* PROJECT NAME INPUT */}
          <FloatingLabel
            controlId="floatingInput1"
            label="Project Name"
            className="form-input"
            style={{
              marginBottom: '10px',
              marginTop: '5%',
              marginLeft: '10%',
            }}
          >
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
          <FloatingLabel
            controlId="floatingInput2"
            label="Genre"
            className="form-input"
            style={{
              marginBottom: '10px',
              width: '50%',
              marginTop: '5%',
              marginLeft: '10%',
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
            }}
          >
            <Form.Select
              type="text"
              placeholder="Genre(s)"
              name="genre"
              value={formInput.genre}
              onChange={handleChange}
              required
              style={{
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
              }}
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
          <FloatingLabel
            controlId="floatingInput3"
            label="Tempo"
            className="form-input"
            style={{
              marginBottom: '10px',
              marginTop: '5%',
              marginLeft: '10%',
            }}
          >
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
          <FloatingLabel
            controlId="floatingInput4"
            label="Key"
            className="form-input"
            style={{
              marginBottom: '10px',
              marginTop: '5%',
              marginLeft: '10%',
            }}
          >
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
          <FloatingLabel
            controlId="floatingInput5"
            className="form-input"
            style={{
              marginBottom: '10px',
              color: 'black',
            }}
          >
            <ReactSelect
              options={sounds}
              isMulti
              closeMenuOnSelect
              value={selectedInstruments}
              onChange={handleInstrumentChange}
              onSubmit={handleSubmit}
              placeholder="Instrument(s)"
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  neutral50: 'primary25',
                  primary: 'black',
                },
              })}
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: '80%',
                  minHeight: '50px',
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  marginTop: '5%',
                  marginLeft: '10%',
                }),
              }}
            />
          </FloatingLabel>

          {/* ENGINEER INPUT */}
          <FloatingLabel
            controlId="floatingInput6"
            label="Engineer"
            className="form-input"
            style={{
              marginBottom: '10px',
              width: '50%',
              marginTop: '5%',
              marginLeft: '10%',
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
            }}
          >
            <Form.Select
              placeholder="Select Engineer"
              name="engineer"
              value={formInput.engineer}
              onChange={handleChange}
              required
              style={{
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
              }}
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
          <FloatingLabel
            controlId="floatingInput7"
            label="Notes"
            className="form-input"
            style={{
              marginBottom: '10px',
              marginTop: '5%',
              marginLeft: '10%',
            }}
          >
            <Form.Control
              type="textarea"
              placeholder="Notes"
              name="notes"
              value={formInput.notes}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          {/* <FloatingLabel controlId="floatingInput8" className="mb-3">
      <input
        type="file"
        name="file"
        value={selectedFile}
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
    </FloatingLabel> */}

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            variant="dark"
            style={{
              marginBottom: '10px',
              color: 'gold',
              marginLeft: '38%',
            }}
          >{projectObj?.firebaseKey ? 'Update' : 'Create'} Project
          </Button>
        </Form>

        <style>
          {`.form-input .form-control {
    border: none;
    background-color: transparent;
  }
  .form-input .form-control:focus {
    outline: none;
    box-shadow: none;
  }
  }
  .form-input:focus {
    outline: none;
    box-shadow: none;
  }
  .form-input .form-floating-label:focus {
    outline: none;
    box-shadow: none;
  }
  .form-input .form-floating-label {
    text-align: center;
    outline: none;
    box-shadow: none;
  }`}
        </style>
      </div>
    </>
  );
}

ProjectForm.propTypes = {
  projectObj: PropTypes.shape({
    projectName: PropTypes.string,
    genre: PropTypes.string,
    tempo: PropTypes.string,
    songKey: PropTypes.string,
    instruments: PropTypes.array,
    engineer: PropTypes.string,
    engineer_id: PropTypes.string,
    artist_id: PropTypes.string,
    notes: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ProjectForm.defaultProps = {
  projectObj: initialState,
};
