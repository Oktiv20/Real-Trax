/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createUser, getUserLogin, updateUser } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dailyRate: '',
  preferredGenre: [],
  experience: '',
  creditsLink: '',
  isEngineer: false,
  uid: '',
};
export default function UserForm({ obj }) {
  const [formInfo, setFormInfo] = useState({ ...initialState });
  const [showEngineer, setShowEngineer] = useState(obj?.isEngineer || false);
  const router = useRouter();
  const { setUser, uid } = useAuth();

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

  useEffect(() => {
    if (obj?.firebaseKey) setFormInfo(obj);
  }, [obj]);

  useEffect(() => {
    setShowEngineer(formInfo.isEngineer);
  }, [formInfo.isEngineer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBooleanChange = (event) => {
    const { name, value } = event.target;
    // Convert the value to a boolean and update the form input state using the setFormInput function and the previous state
    const newValue = value === 'null' ? null : value === 'true';
    setFormInfo((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleGenreChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormInfo((prevState) => ({
      ...prevState,
      preferredGenre: selectedValues,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj?.firebaseKey) {
      updateUser(formInfo).then(() => router.push('/'));
    } else {
      const payload = { ...formInfo, uid };
      createUser(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateUser(patchPayload).then(() => {
          getUserLogin(uid).then((userData) => {
            setUser(userData);
          });
        });
      });
    }
  };

  return (
    <div
      className="bground-image"
      style={{
        height: '1000px',
      }}
    >
      <Form
        onSubmit={handleSubmit}
        style={{
          marginLeft: '500px',
          padding: '30px',
          width: '450px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '1em',
          backgroundColor: 'black',
        }}
      >
        <h2 className="mt-5" style={{ paddingBottom: '50px', color: 'white' }}>
          {obj?.firebaseKey ? 'Update' : 'Create'} User
        </h2>

        {/* FIRST NAME INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter your first name" name="firstName" value={formInfo.firstName || ''} onChange={handleChange} required />
        </FloatingLabel>

        {/* LAST NAME INPUT  */}
        <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter your last name" name="lastName" value={formInfo.lastName || ''} onChange={handleChange} required />
        </FloatingLabel>

        {/* EMAIL INPUT  */}
        <FloatingLabel controlId="floatingInput3" label="Email" className="mb-3">
          <Form.Control type="email" placeholder="Enter Email" name="email" value={formInfo.email || ''} onChange={handleChange} required />
        </FloatingLabel>

        {/* PHONE NUMBER INPUT  */}
        <FloatingLabel controlId="floatingInput4" label="Phone Number" className="mb-3">
          <Form.Control type="tel" placeholder="###-###-####" name="phoneNumber" value={formInfo.phoneNumber || ''} onChange={handleChange} required />
        </FloatingLabel>

        {/* TITLE INPUT  */}
        <FloatingLabel controlId="floatingInput5" label="Title" className="mb-3">
          <Form.Control type="text" placeholder="title" name="title" value={formInfo.title || ''} onChange={handleChange} required />
        </FloatingLabel>

        {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
        <div>
          <Form.Check
            className="text-white mb-3"
            type="checkbox"
            id="isEngineer"
            name="isEngineer"
            label="Engineer?"
            checked={formInfo.isEngineer}
            onChange={(e) => {
              setFormInfo((prevState) => ({
                ...prevState,
                isEngineer: e.target.checked,
                handleBooleanChange,
              }));
            }}
            onClick={() => setShowEngineer(true)}
          />
        </div>

        { showEngineer
        && (
        <div>
          <FloatingLabel controlId="floatingInput6" label="Daily Rate" className="mb-3">
            <Form.Control type="text" placeholder="Enter your daily rate" name="dailyRate" value={formInfo.dailyRate || ''} onChange={handleChange} required />
          </FloatingLabel>

          {/* PREFERRED GENRE */}
          <FloatingLabel controlId="floatingInput6" className="mb-3">
            <ReactSelect
              options={category}
              isMulti
              closeMenuOnSelect
              value={category.filter((option) => formInfo.preferredGenre.includes(option.value))}
              onChange={handleGenreChange}
              onSubmit={handleSubmit}
              placeholder="Preferred Genre(s)"
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: '100%',
                  minHeight: '50px',
                }),
              }}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea" label="Experience" className="mb-3">
            <Form.Control type="textarea" placeholder="Experience" style={{ height: '75px' }} name="experience" value={formInfo.experience || ''} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput7" label="Credits Link" className="mb-3">
            <Form.Control type="text" placeholder="Credits Link" name="creditsLink" value={formInfo.creditsLink || ''} onChange={handleChange} required />
          </FloatingLabel>
        </div>
        )}

        {/* SUBMIT BUTTON  */}
        <Button variant="dark" type="submit" style={{ color: '#e6c200' }}>
          {obj?.firebaseKey ? 'Update' : 'Create'} User
        </Button>
      </Form>
    </div>
  );
}

UserForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    dailyRate: PropTypes.string,
    preferredGenre: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    experience: PropTypes.string,
    creditsLink: PropTypes.string,
    isEngineer: PropTypes.bool,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

UserForm.defaultProps = {
  obj: initialState,
};
