import SearchIcon from '../assets/magnifying-glass.png';
import { formatDate } from '../utils/commonUtils';
import Loader from './loader';
import { useResourcesContext } from '../context/resourceContext.jsx';

export default function SearchResult ({isLoading}) {
    const { filteredResources } = useResourcesContext();
    return (
<div className="!bg-card/40 full-width mb-10 rounded-md p-10 relative h-full">
    {!filteredResources.length > 0 && !isLoading && 
        <div className="absolute inset-4 rounded border-2 border-dashed border-gray-300 flex justify-center items-center">
            <div className="flex items-center">
                <img src={SearchIcon} alt="Search Resources" className="w-3xs h-2xs filter brightness-0 invert" />  
            <p className="ml-5 text-white text-2xl">Start searching by title or filter</p>
            </div>
        </div>
    }
            
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