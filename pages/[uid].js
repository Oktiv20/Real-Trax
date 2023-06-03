/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getUser } from '../api/userData';
import EngineerCard from '../components/EngineerCard';
import { useAuth } from '../utils/context/authContext';
import ArtistCard from '../components/ArtistCard';

function Home() {
  const { user } = useAuth();
  const [profileView, setProfileView] = useState({});

  const getUserData = () => {
    getUser(user.uid).then(setProfileView);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="text-center my-4 text-white">
        <h1>PROFILE PAGE</h1>
        <hr />
        {profileView.isEngineer ? (
          <EngineerCard key={profileView?.firebaseKey} engineerObj={profileView} />
        ) : (
          <ArtistCard key={profileView?.firebaseKey} artistObj={profileView} />
        )}
      </div>
    </>
  );
}

export default Home;
