import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: 'linear-gradient(to bottom right, black 36%, gray 58%, #e6c200)', // Diagonal gradient
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#FFF72E',
        position: 'relative',
        overflow: 'hidden', // Hide overflow to prevent extending the page
      }}
    >
      <div
        className="text-center"
        style={{
          padding: '100px',
          margin: '0',
        }}
      >
        <Image
          className="logo"
          src="../images/real-trax-high-resolution-logo-color-on-transparent-background.png"
          width="220px"
          height="auto"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '180px',
          left: '11rem',
          width: '400px', // Adjust the width as needed to make the image larger
          height: 'auto', // Auto height to maintain aspect ratio
          opacity: '0.8', // Adjust the opacity as needed
          zIndex: '1', // Ensure the microphone image is on top
        }}
      >
        <Image
          className="mic"
          src="../images/RCAmicrophone.png"
          width="90%"
          height="auto"
          style={{
            position: 'relative',
            left: '-50px', // Adjust the left position to make it overflow off the page
          }}
        />
      </div>
      <div
        className="text-center"
        style={{
          position: 'absolute',
          top: '11%',
          left: '50%',
          transform: 'translate(-50%, -50%)', // Center the text vertically and horizontally
          zIndex: '2', // Ensure the text is on top of the microphone image
        }}
      >
        <h1
          style={{
            fontSize: '3.5rem', // Adjust the font size as needed
            // fontWeight: 'bold', // Make the text bold
            whiteSpace: 'nowrap', // Prevent text from wrapping
          }}
        >
          <span style={{ color: 'white' }}>WELCOME TO</span>
          <span
            style={{
              color: 'black',
              position: 'relative',
              display: 'inline-block',
              border: '1.5px',
              padding: '6px',
              marginLeft: '10px', // Adjust the margin as needed
              boxShadow: '0 0 20px 10px rgba(255, 247, 46, 0.7)',
              backgroundColor: '#e6c200',
              borderRadius: '15px',
            }}
          >
            REAL TRAX
            <span />
          </span>
        </h1>
      </div>

      <div
        style={{
          position: 'absolute',
          color: 'white', // Changed text color to white for better blending
          top: '50%',
          right: '25%',
          transform: 'translate(50%, -50%)',
          maxWidth: '500px', // Use maxWidth instead of width for responsiveness
          textAlign: 'left',
          padding: '20px', // Add padding for spacing
          background: 'rgba(0, 0, 0, 0.35)', // Use a semi-transparent black background
          border: '2px solid transparent', // Transparent border
          borderRadius: '20px', // Rounded corners for a sleek look
          boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.9)', // Soft box shadow
        }}
      >
        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '15px' }}>
          Unlock Your Musical Potential!
        </p>
        <p style={{ fontSize: '1.3rem', margin: '0' }}>
          Are you an independent artist looking to turn your musical vision into reality?
          Or an engineer seeking gigs without the hassle of endless searches?
          Look no further! Our platform connects artists and engineers, making collaboration easy and efficient.
          Sign up now to bring your projects to life or find your next gig!
        </p>
      </div>

      <Button
        variant="dark"
        size="lg"
        className="copy-btn"
        onClick={signIn}
        style={{
          background: 'radial-gradient(circle at 30% 50%, #ff0000, #a10000)',
          color: 'white', // Changed text color to white for better contrast
          boxShadow: '6px 6px 20px rgba(0, 0, 0, 1)',
          fontSize: '1.3rem',
          width: '6rem',
          height: '6rem',
          padding: '12px 24px',
          marginBottom: '30px',
          borderRadius: '70px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        RECORD
      </Button>

    </div>
  );
}

export default Signin;
