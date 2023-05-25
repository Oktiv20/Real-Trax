import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserByFBKey } from '../../../api/userData';
import EditArtistForm from '../../../components/Forms/EditArtistForm';

export default function EditArtist() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { editUserFirebaseKey } = router.query;

  useEffect(() => { // Initializing a useEffect hook
    getUserByFBKey(editUserFirebaseKey).then(setEditItem); // Calling the getUserByFBKey function with the editUserFirebaseKey value and updating the editItem state variable with the returned value
  }, [editUserFirebaseKey]); // Adding the editUserFirebaseKey value to the array of dependencies for the useEffect hook

  return (<EditArtistForm obj={editItem} />); // Rendering the UserForm component and passing in the editItem state variable as a prop called obj
}
