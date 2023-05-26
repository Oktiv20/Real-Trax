// import { useEffect, useState } from 'react';
// import { Button, FloatingLabel, Form } from 'react-bootstrap';
// import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
// import { getSingleUser, updateUser } from '../../api/userData';
// import { useAuth } from '../../utils/context/authContext';

// const initialState = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   phoneNumber: '',
//   dailyRate: '',
//   preferredGenre: '',
//   experience: '',
//   creditsLink: '',
//   isEngineer: false,
//   uid: '',
// };

// export default function EditArtistForm({ obj }) {
//   const [formInfo, setFormInfo] = useState({ ...initialState });
//   const router = useRouter();
//   const { user } = useAuth();

//   useEffect(() => {
//     getSingleUser().then(setFormInfo);

//     if (obj.firebaseKey) setFormInfo(obj);
//   }, [obj, user.uid]);

//   const handleChange = () => {
//     setFormInfo((prevState) => ({
//       ...prevState,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (obj.firebaseKey) {
//       updateUser(formInfo).then(() => router.push('/'));
//     }
//   };

//   return (
//     <Form
//       onSubmit={handleSubmit}
//       style={{
//         marginTop: '50px',
//         padding: '60px',
//         width: '450px',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: '1em',
//       }}
//     >
//       <h2 className="mt-5" style={{ paddingBottom: '50px' }}>
//         {obj.firebaseKey ? 'Update' : ''} Artist
//       </h2>

//       {/* FIRST NAME INPUT  */}
//       <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
//         <Form.Control type="text" placeholder="Enter your first name" name="firstName" value={formInfo.firstName} onChange={handleChange} required />
//       </FloatingLabel>

//       {/* LAST NAME INPUT  */}
//       <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-3">
//         <Form.Control type="text" placeholder="Enter your last name" name="lastName" value={formInfo.lastName} onChange={handleChange} required />
//       </FloatingLabel>

//       {/* EMAIL INPUT  */}
//       <FloatingLabel controlId="floatingInput3" label="Email" className="mb-3">
//         <Form.Control type="email" placeholder="Enter Email" name="email" value={formInfo.email} onChange={handleChange} required />
//       </FloatingLabel>

//       {/* PHONE NUMBER INPUT  */}
//       <FloatingLabel controlId="floatingInput4" label="Phone Number" className="mb-3">
//         <Form.Control type="tel" placeholder="###-###-####" name="phoneNumber" value={formInfo.phoneNumber} onChange={handleChange} required />
//       </FloatingLabel>

//       {/* TITLE INPUT  */}
//       <FloatingLabel controlId="floatingInput5" label="Title" className="mb-3">
//         <Form.Control type="tel" placeholder="title" name="title" value={formInfo.title} onChange={handleChange} required />
//       </FloatingLabel>

//       {/* SUBMIT BUTTON  */}
//       <Button variant="outline-dark" type="submit">
//         {obj.firebaseKey ? 'Update' : ''} User
//       </Button>
//     </Form>
//   );
// }

// EditArtistForm.propTypes = {
//   obj: PropTypes.shape({
//     firstName: PropTypes.string,
//     lastName: PropTypes.string,
//     email: PropTypes.string,
//     phoneNumber: PropTypes.string,
//     firebaseKey: PropTypes.string,
//     uid: PropTypes.string,
//   }),
// };

// EditArtistForm.defaultProps = {
//   obj: initialState,
// };
