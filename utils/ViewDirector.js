import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBarAuth from '../components/NavBarAuth';
import UserForm from '../components/Forms/UserForm';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth(); // The "user" represents the currently authenticated user & "userLoading" indicates whether the user data is still loading.

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  if (user === 'NO USER') {
    return <UserForm obj={user} />;
  }
  // what the user should see if they are logged in
  if (user && user !== 'NO USER') { // If the user is not null and not 'NO USER', it means there is an authenticated user. In this case, the component returns a JSX fragment containing a navigation bar (NavBarAuth component) and the content of the page (Component) wrapped in a <div>
    return (
      <div
        className="bground-image"
      >
        <NavBarAuth user={user} /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">
          <Component {...pageProps} />
        </div>
      </div>
    );
  }
  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
