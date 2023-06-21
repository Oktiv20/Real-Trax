import Link from 'next/link';
import PropTypes from 'prop-types';

export default function SearchItem({ item }) {
  return (
    <>
      <Link passHref href={`/${item.type}/${item.firebaseKey}`}>
        <h2>{item.name}</h2>
      </Link>
      <p>{item.type}</p>
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
