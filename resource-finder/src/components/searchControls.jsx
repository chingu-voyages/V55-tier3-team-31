import { useResourcesContext } from '../context/resourceContext.jsx';
import {
  filterBasedOnSearch,
  addTagNamesToAllResources,
} from '../utils/commonUtils';

export default function Search({ fetchResources, isFetchingTags }) {
  const {
    setResources,
    searchText,
    setSearchText,
    tags,
    searchTags,
    setSearchTags,
    setFilteredResources,
    tagDetails,
  } = useResourcesContext();

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };


  const searchResource = async () => {
    const resources = await fetchResources();
    const modifiedResources = addTagNamesToAllResources(
      resources.data,
      tagDetails
    );
    setResources(modifiedResources);
    const filteredResults = filterBasedOnSearch(
      modifiedResources,
      searchText,
      searchTags
    );
    setFilteredResources(filteredResults);
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchTags([]);
  };

  return (
    <div className='!bg-card/40 w-full mh-75 mb-8 rounded-md p-10'>
      <div className=' w-full mb-5'>
        <p className="text-3xl mb-2 font-['Cactus_Classical_Serif',serif] font-semibold">
          Search by title
        </p>
        <input
          type='text'
          onChange={handleSearchText}
          value={searchText}
          className='bg-background rounded-full pl-5 pr-5 w-full h-12 border border-secondary/20 focus:outline-none focus:ring-3 focus:ring-accent'
          placeholder='Enter keywords from title....'
        />
      </div>
      <div className='flex sm:flex-col md:flex-row gap-6 justify-center w-full'>
        <button
          onClick={searchResource}
          disabled={isFetchingTags}
          className='disabled:bg-primary-400 bg-primary px-6 h-10 rounded text-white hover:bg-primary/50 md:basis-xs'
        >
          {isFetchingTags ? 'Fetching Tags...' : 'Search'}
        </button>
        <button
          onClick={clearSearch}
          className='border border-accent px-6 h-10 rounded text-accent hover:bg-accent hover:text-white md:basis-xs'
        >
          {' '}
          Clear{' '}
        </button>
      </div>
    </div>
  );
}
