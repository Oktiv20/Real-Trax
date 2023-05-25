/* eslint-disable react-hooks/exhaustive-deps */
// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
// import UserForm from '../components/Forms/UserForm';
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
      <h1>PROFILE PAGE</h1>
      {profileView.isEngineer ? (
        <EngineerCard key={profileView.firebaseKey} engineerObj={profileView} />
      ) : (
        <ArtistCard key={profileView.firebaseKey} artistObj={profileView} />
      )}
    </>
  );
}

export default Home;
