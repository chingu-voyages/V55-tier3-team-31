import { useResourcesContext } from "../context/resourceContext.jsx";
import {filterBasedOnSearch, addTagNamesToAllResources} from '../utils/commonUtils'

export default function Search ({fetchResources, isFetchingTags}) {
    const {setResources, searchText, setSearchText, tags, searchTags, setSearchTags, setFilteredResources, tagDetails} = useResourcesContext();

    const handleSearchText = (e) => {
        setSearchText(e.target.value);
    }

    const handleSearchTags = (e) => {
        console.log(e);
    }

    const searchResource = async() => {
        const resources = await fetchResources();
        const modifiedResources = addTagNamesToAllResources(resources.data, tagDetails);
        setResources(modifiedResources);
        const filteredResults = filterBasedOnSearch(modifiedResources, searchText, searchTags)
        setFilteredResources(filteredResults);
    }

    const clearSearch = () => {
        setSearchText("");
        setSearchTags([]);
    }

    return (
        <div className="bg-white border border-gray-300 w-full mh-75 mb-8 rounded-md p-10">
            <div className=" w-full mb-5">
                <p className="text-xl mb-2">Search by title</p>
                <input type="text"
                onChange={handleSearchText}
                value={searchText}
                className="rounded pl-2 pr-2 w-full h-10 border border-gray-300" placeholder="Enter keywords from title...." />
            </div>
            <div className=" w-full mb-7">
                <p className="text-xl mb-2">Filter by tag</p>
                <input type="text"
                onChange={handleSearchTags}
                className="rounded pl-2 pr-2 w-full h-10 border border-gray-300" placeholder="Enter keywords from title...." />
            </div>
            <div className="w-full grid grid-flow-col gap-6">
                <button onClick={searchResource} disabled={isFetchingTags} className="disabled:bg-blue-400 bg-blue-700  h-10 rounded text-white hover:bg-blue-800"> 
                    {
                    isFetchingTags ? "Fetching Tags..." : "Search"
                     } 
                     </button>
                <button onClick={clearSearch} className="bg-white border border-blue-500 h-10 rounded text-black hover:bg-blue-700 hover:text-white"> Clear </button>
            </div>

        </div>
    )
}