import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SearchItem from '../../components/SearchItem';
import { globalSearch } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';

export default function SearchBar() {
  const [searchItems, setSearchItems] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchTerm } = router.query;

  useEffect(() => {
    globalSearch(searchTerm, user.uid).then((returnArray) => setSearchItems(returnArray));
  }, [user, searchTerm]);

  return (
    <>
      <h1 className="text-center my-4 d-flex justify-content-center flex-wrap" style={{ color: 'white' }}>Search Results</h1>
      <hr style={{ color: 'white', borderWidth: '3px', opacity: '1' }} />
      {searchItems.map((item) => (
        <SearchItem key={item.firebaseKey} item={item} />
      ))}
    </>
  );
}
