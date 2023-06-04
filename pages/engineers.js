/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getEngineer } from '../api/userData';
import ArtistEngineerCard from '../components/ArtistEngineerCard';

export default function Engineer() {
  const category = [
    { value: 'Blues', label: 'Blues' },
    { value: 'Classical', label: 'Classical' },
    { value: 'Country', label: 'Country' },
    { value: 'Folk', label: 'Folk' },
    { value: 'Indie', label: 'Indie' },
    { value: 'Jazz', label: 'Jazz' },
    { value: 'Metal', label: 'Metal' },
    { value: 'Pop', label: 'Pop' },
    { value: 'Punk', label: 'Punk' },
    { value: 'Rock', label: 'Rock' },
    { value: 'R&B', label: 'R&B' },
    { value: 'Soul', label: 'Soul' },
  ];

  const { user } = useAuth();
  const [engineerUsers, setEngineerUsers] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const getAllEngineers = () => {
    getEngineer(user.uid).then(setEngineerUsers);
  };

  useEffect(() => {
    getAllEngineers();
  }, []);

  const handleGenreChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedGenres(selectedOptions);
  };

  const filteredEngineers = engineerUsers.filter((engineer) => selectedGenres.every((genre) => engineer.preferredGenre.includes(genre)));

  return (
    <div className="text-center my-4 text-white">
      <h1>ENGINEERS</h1>
      <hr />
      <FloatingLabel>
        <Form.Select
          controlId="floatingInput1"
          label="Preferred Genre(s)"
          className="mb-3"
          value={selectedGenres}
          onChange={handleGenreChange}
          closemenuonselect="true"
          placeholder="Select A Genre"
          styles={{
            width: '50%',
            minHeight: '30px',
          }}
        >
          {category.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <div className="text-center my-4 d-flex flex-wrap">
        {filteredEngineers.map((engineer) => (
          <ArtistEngineerCard key={engineer.firebaseKey} engineerObj={engineer} onUpdate={getAllEngineers} />
        ))}
      </div>
    </div>
  );
}
