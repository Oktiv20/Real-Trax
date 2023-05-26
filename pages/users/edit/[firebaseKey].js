import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleUser } from '../../../api/userData';
import UserForm from '../../../components/Forms/UserForm';
// import EditArtistForm from '../../../components/Forms/EditArtistForm';

export default function EditUser() {
  const [editUser, setEditUser] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleUser(firebaseKey).then(setEditUser);
  }, [firebaseKey]);

  return (<UserForm obj={editUser} />);
}
