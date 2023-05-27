/* eslint-disable react/forbid-prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
// import UserForm from '../components/Forms/UserForm';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../api/userData';
import EngineerCard from '../components/EngineerCard';
// import { clientCredentials } from '../utils/client';
import { useAuth } from '../utils/context/authContext';
import ArtistCard from '../components/ArtistCard';

// const endpoint = clientCredentials.databaseURL;

function Home({ initialUser }) {
  const { user } = useAuth();
  const [profileView, setProfileView] = useState({});

  const getUserData = () => {
    getUser(user.uid).then(setProfileView);
  };

  useEffect(() => {
    getUserData(initialUser.results);
  }, [initialUser]);

  return (
    <>
      <h1>PROFILE PAGE</h1>
      <div>
        {profileView.isEngineer ? (
          <EngineerCard key={profileView.firebaseKey} engineerObj={profileView} />
        ) : (
          <ArtistCard key={profileView.firebaseKey} artistObj={profileView} />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const initialUser = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dailyRate: '',
    preferredGenre: '',
    experience: '',
    creditsLink: '',
    isEngineer: false,
    uid: '',
  };
  return { props: { initialUser } };
}

export default Home;

Home.propTypes = {
  initialUser: PropTypes.shape({
    results: PropTypes.array,
  }).isRequired,
};
