import Link from 'next/link';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function SearchItem({ item }) {
  return (
    <div className="text-center my-4 d-flex justify-content-center flex-wrap">
      <Card
        style={{
          width: '18rem',
          height: '18rem',
          background: 'linear-gradient(to bottom right, #e6c200, #ffb700)',
          color: 'black',
          borderRadius: '25%',
          justifyContent: 'center',
          boxShadow: '0 0 10px 5px rgba(255, 165, 0, 0.5)',
          opacity: '0.87',
        }}
      >
        <Card.Body>
          <br />
          <div className="text-center mt-4 justify-content-center">
            <Link passHref href={`/${item.type}/${item.firebaseKey}`}>
              <h1 style={{ color: 'black', cursor: 'pointer' }}>{item.name}</h1>
            </Link>
            <hr />
            <br />
            <h3 style={{ color: 'black' }}>{item.type.toUpperCase()}</h3>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

SearchItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    type: PropTypes.string,
  }),
};

SearchItem.defaultProps = {
  item: {
    name: '',
    firebaseKey: '',
    type: '',
  },
};
