import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      style={{
        height: '1000px',
        backgroundColor: 'black',
      }}
    >
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '20px',
          maxWidth: '400px',
          margin: '0 auto',
          color: '#ffb700',
        }}
      >
        <h1>WELCOME TO REAL TRAX</h1>
        <hr />
        <Image
          className="logo"
          src="../images/real-trax-high-resolution-logo-color-on-transparent-background.png"
          width="auto"
          height="auto"
        />
        <hr />
        <br />
        <br />
        <p>Click the button below to sign up or log in!</p>
        <Button
          variant="dark"
          size="lg"
          className="copy-btn"
          onClick={signIn}
          styles={{
            background: 'black',
          }}
        >
          Sign Up/Log in
        </Button>
      </div>
    </div>
  );
}

export default Signin;
