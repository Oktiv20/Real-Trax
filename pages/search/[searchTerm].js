import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SearchItem from '../../components/SearchItem';
import { globalSearch } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';

export default function SearchBar() {
  // The SearchBar component handles the search functionality by retrieving the search term from the query parameters, performing a search operation using the globalSearch function, and displaying the search results through the SearchItem component. The search results are updated whenever the user or search term changes.
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
      <hr style={{ color: 'white', borderWidth: '3px', opacity: '0.5' }} />
      {searchItems.map((item) => (
        <SearchItem key={item.firebaseKey} item={item} />
      ))}
    </>
  );
}
