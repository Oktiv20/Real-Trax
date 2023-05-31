/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getEngineer } from '../api/userData';
import ArtistEngineerCard from '../components/ArtistEngineerCard';

export default function Engineer() {
  const { user } = useAuth();

  const [enginnerUsers, setEnginnerUsers] = useState([]);

  const getAllEngineers = () => {
    getEngineer(user.uid).then(setEnginnerUsers);
  };

  useEffect(() => {
    getAllEngineers();
  }, []);

  return (
    <div className="text-center my-4 text-white">
      <h1>ENGINEERS</h1>
      <hr />
      <div className="text-center my-4 d-flex flex-wrap">
        {enginnerUsers.map((engineer) => (
          <ArtistEngineerCard key={engineer.firebaseKey} engineerObj={engineer} onUpdate={getAllEngineers} />
        ))}
      </div>
    </div>
  );
}
