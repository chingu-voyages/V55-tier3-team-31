import SearchIcon from '../assets/magnifying-glass.png';
import { formatDate } from '../utils/commonUtils';
import Loader from './loader';
import { useResourcesContext } from '../context/resourceContext.jsx';
import { useState, useMemo } from 'react';
import { filterBasedOnSearch } from '../utils/commonUtils';

export default function SearchResult() {
  const {
    filteredResources,
    setFilteredResources,
    searchText,
    isFetching,
    tags,
    hasSearched,
    resources
  } = useResourcesContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const TAGS_PER_PAGE = 5; 

  const { paginatedTags, totalPages, hasNext, hasPrev } = useMemo(() => {
    const totalPages = Math.ceil(tags.length / TAGS_PER_PAGE);
    const startIndex = currentPage * TAGS_PER_PAGE;
    const endIndex = startIndex + TAGS_PER_PAGE;
    const paginatedTags = tags.slice(startIndex, endIndex);

    return {
      paginatedTags,
      totalPages,
      hasNext: currentPage < totalPages - 1,
      hasPrev: currentPage > 0,
    };
  }, [tags, currentPage]);

  function handleTagSelect(tag) {
    setSelectedTag(tag);
    setIsDropdownOpen(false);
    setCurrentPage(0); // Reset to first page
    
    // Apply filtering logic
    if (!tag || tag.id === '1048176100892737618') {
      // Clear filter - use search text only or show all
      if (searchText) {
        const filtered = filterBasedOnSearch(resources, searchText, []);
        setFilteredResources(filtered);
      } else {
        setFilteredResources([]);
      }
    } else {
      // Filter by tag (and search text if present)
      let filtered = resources.filter((resource) =>
        resource.appliedTagsName.includes(tag.tag)
      );
      
      // Also apply search text filter if present
      if (searchText) {
        filtered = filtered.filter((resource) =>
          resource.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      
      setFilteredResources(filtered);
    }
  }

  function handleNextPage() {
    if (hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function handlePrevPage() {
    if (hasPrev) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  return (
    <div className='!bg-card/40 full-width mb-10 rounded-md p-10 relative h-full'>
      {!hasSearched && !filteredResources.length > 0 && !isFetching && (
        <div className='absolute inset-4 rounded border-2 border-dashed border-gray-300 flex justify-center items-center'>
          <div className='flex items-center'>
            <img
              src={SearchIcon}
              alt='Search Resources'
              className='w-3xs h-2xs filter brightness-0 invert'
            />
            <p className='ml-5 text-white text-2xl'>
              Start searching by title or filter
            </p>
          </div>
        </div>
      )}

      {isFetching && <Loader />}
      
      <div className='h-full w-full'>
        {/* Show header and filter when there's search text OR when there are results */}
        {(searchText || filteredResources.length > 0) && hasSearched && (
          <div className='flex justify-between mb-5'>
            <h1 className="text-3xl mb-5 !font-['Cactus_Classical_Serif',serif]">
              Search Results ({filteredResources.length})
            </h1>
            <div className='relative'>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='bg-accent rounded px-2 py-2 text-white flex items-center gap-2 min-w-24'
              >
                <span>{selectedTag ? selectedTag.tag : 'Filter'}</span>
                <svg
                  className='w-4 h-4 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className='absolute right-0 mt-1 min-w-48 bg-primary rounded-lg shadow-xl z-10 overflow-hidden'>
                  {/* Navigation Header with Up Chevron */}
                  <div className='flex justify-center items-center px-0 py-0 border-b border-green-500'>
                    <button
                      onClick={handlePrevPage}
                      disabled={!hasPrev}
                      className={`p-1 rounded ${
                        hasPrev
                          ? 'text-white hover:bg-green-500'
                          : 'text-green-300 cursor-not-allowed'
                      }`}
                    >
                      <svg
                        className='w-full h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 15l7-7 7 7'
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Tag Options */}
                  <div className='max-h-64 overflow-y-auto hide-scrollbar'>
                    {paginatedTags.map((tag) => (
                      <div
                        key={tag.id}
                        className={`px-4 py-3 text-white cursor-pointer transition-colors ${
                          selectedTag?.id === tag.id
                            ? 'bg-green-500'
                            : 'hover:bg-green-500'
                        }`}
                        onClick={() => {
                          if (tag.id === '1048176100892737618') {
                            handleTagSelect(null);
                          } else {
                            handleTagSelect(tag);
                          }
                        }}
                      >
                        {tag.tag}
                      </div>
                    ))}
                  </div>

                  {/* Navigation Footer with Down Chevron */}
                  <div className='flex justify-center items-center px-0 py-0 border-t border-green-500'>
                    <button
                      onClick={handleNextPage}
                      disabled={!hasNext}
                      className={`p-1 rounded ${
                        hasNext
                          ? 'text-white hover:bg-green-500'
                          : 'text-green-300 cursor-not-allowed'
                      }`}
                    >
                      <svg
                        className='w-full h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Show "No results found" message separately */}
        {searchText && filteredResources.length === 0 && !isFetching && hasSearched && (
          <div className='flex justify-center items-center mt-8'>
            <p className='text-white text-2xl'>No results found</p>
          </div>
        )}

        {/* Results grid - only show when there are results */}
        {filteredResources.length > 0 && (
          <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6'>
            {filteredResources.map((resource) => (
              <div
                className='w-full px-5 py-5 rounded gap-6 bg-card/80'
                key={resource.id}
              >
                <a
                  className='text-lg mb-5 text-background block'
                  href={resource.url}
                  target='_blank'
                >
                  {resource.name}
                </a>
                <p className='text-sm text-background/50 mb-5'>
                  Shared by <span className='font-bold'>{resource.author}</span>{' '}
                  on
                  <span className='font-bold'>
                    {' '}
                    {formatDate(resource.createdAt)}
                  </span>
                </p>
                <div className='flex items-start flex-wrap gap-4'>
                  {resource.appliedTagsName.map((tag, i) => (
                    <div
                      className='px-2 text-md rounded-full bg-gray-100 text-background'
                      key={tag + i}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
