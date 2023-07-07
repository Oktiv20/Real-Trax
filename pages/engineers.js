/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getEngineer } from '../api/userData';
import ArtistEngineerCard from '../components/ArtistEngineerCard';

export default function Engineer() {
  const { user } = useAuth();
  const [engineerUsers, setEngineerUsers] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  const category = [
    { value: '', label: 'All' },
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

  const getAllEngineers = () => {
    getEngineer(user.uid).then(setEngineerUsers);
  };

  useEffect(() => {
    getAllEngineers();
  }, []);

  useEffect(() => {
    if (selectedGenre !== '') {
      getAllEngineers(); // Fetch engineer users whenever selectedGenre changes
    }
  }, [selectedGenre]);

  const handleGenreChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedGenre(selectedOption);
  };

  const filteredEngineers = selectedGenre
    ? engineerUsers.filter((engineer) => engineer.preferredGenre.includes(selectedGenre))
    : engineerUsers;

  return (
    <>
      <div className="text-center my-4 text-white">
        <h1>ENGINEERS</h1>
        <hr style={{ color: 'white', borderWidth: '3px', opacity: '0.5' }} />
        <h3 style={{
          color: 'white',
        }}
        >Filter Engineers
        </h3>
        <Form>
          <Form.Select
            type="text"
            placeholder="Filter Engineers"
            value={selectedGenre}
            onChange={handleGenreChange}
            style={{
              width: '50%',
              minHeight: '30px',
              marginLeft: '25%',
              background: '#ffb700',
              border: 'none',
              boxShadow: '0 0 10px 5px rgba(255, 165, 0, 0.5)',
            }}
            className="text-center"
          >
            <option value="">Select Genre</option>
            {category.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </Form>
        {engineerUsers.length > 0 ? (
          <div className="text-center my-4 d-flex flex-wrap">
            {filteredEngineers.map((engineer) => (
              <ArtistEngineerCard key={engineer.firebaseKey} engineerObj={engineer} onUpdate={getAllEngineers} />
            ))}
          </div>
        ) : (
          <p>No engineers found.</p>
        )}
      </div>
    </>
  );
}
