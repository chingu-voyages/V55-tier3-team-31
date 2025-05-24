import SearchIcon from '../assets/magnifying-glass.png';
import { formatDate } from '../utils/commonUtils';
import Loader from './loader';
import { useResourcesContext } from '../context/resourceContext.jsx';

export default function SearchResult ({isLoading}) {
    const { filteredResources } = useResourcesContext();
    return (
        <div className="bg-white border border-gray-300 full-width mb-10 rounded-md p-10 relative min-h-[250px]">
            {!filteredResources.length > 0 && !isLoading && <div className="rounded border border-dotted h-full w-full flex justify-center items-center">
                <img src={SearchIcon} alt="Search Resources" />
                <p className="ml-5 text-gray-400/[70%] text-xl">Start searching  by title or filter</p>
            </div>}
            
            {(isLoading) && <Loader/> }
            {filteredResources?.length > 0 &&  <div className="h-full w-full">
                <h1 className="text-xl mb-5">Search Results ({filteredResources.length})</h1>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                { filteredResources.map((resource) => (
                    <div className="w-full border border-gray-300 px-5 py-5 rounded" key={resource.id}>
                        <a className="text-lg mb-5 text-blue-500 block" href={resource.url} target="_blank">{resource.name}</a>
                        <p className="text-sm text-gray-20 mb-5">Shared by <span className="font-bold">{resource.author}</span> on  
                        <span className="font-bold"> {formatDate(resource.createdAt)}</span></p>
                        <div className="flex items-start flex-wrap gap-4">
                        {
                            resource.appliedTagsName.map((tag,i) => (
                                <div className="px-2 text-md rounded-full bg-gray-100"  key={tag+i}>{tag}</div>
                            ))              
                        }
                        </div>
                    </div>))
                }
                </div>
            </div>}

        </div>
    )
}