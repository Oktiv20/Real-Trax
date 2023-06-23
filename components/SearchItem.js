import Link from 'next/link';
import PropTypes from 'prop-types';

export default function SearchItem({ item }) {
  return (
    <>
      <div className="text-center mt-5 justify-content-center">
        <Link passHref href={`/${item.type}/${item.firebaseKey}`}>
          <h1 style={{ color: '#ffb700', cursor: 'pointer' }}>{item.name}</h1>
        </Link>
        <br />
        <h3 style={{ color: '#ffb700' }}>{item.type.toUpperCase()}</h3>
      </div>
    </>
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
