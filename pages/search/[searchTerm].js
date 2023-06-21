import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SearchItem from '../../components/SearchItem';
import { globalSearch } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';

export default function SearchBar() {
  const [searchItems, setSearchItems] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchWord } = router.query;

  useEffect(() => {
    globalSearch(searchWord, user.uid).then((returnArray) => setSearchItems(returnArray));
  }, [user, searchWord]);

  return (
    <>
      <h1>Search Results</h1>
      {searchItems.map((item) => (
        <SearchItem item={item} />
      ))}
    </>
  );
}
