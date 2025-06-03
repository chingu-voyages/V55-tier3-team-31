import SearchIcon from "../assets/magnifying-glass.png";
import { formatDate } from "../utils/commonUtils";
import Loader from "./loader";
import { useResourcesContext } from "../context/resourceContext.jsx";

export default function SearchResult() {
  const { filteredResources, searchText, isFetching } = useResourcesContext();
  return (
    <div className="!bg-card/40 full-width mb-10 rounded-md p-10 relative h-full">
      {!searchText && !filteredResources.length > 0 && !isFetching && (
        <div className="absolute inset-4 rounded border-2 border-dashed border-gray-300 flex justify-center items-center">
          <div className="flex items-center">
            <img
              src={SearchIcon}
              alt="Search Resources"
              className="w-3xs h-2xs filter brightness-0 invert"
            />
            <p className="ml-5 text-white text-2xl">
              Start searching by title or filter
            </p>
          </div>
        </div>
      )}

      {isFetching && <Loader />}
      <div className="h-full w-full">
        <h1 className="text-3xl mb-5 !font-['Cactus_Classical_Serif',serif]">
          Search Results ({filteredResources.length})
        </h1>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
          {filteredResources.map((resource) => (
            <div
              className="w-full px-5 py-5 rounded gap-6 bg-card/80"
              key={resource.id}
            >
              <a
                className="text-lg mb-5 text-background block"
                href={resource.url}
                target="_blank"
              >
                {resource.name}
              </a>
              <p className="text-sm text-background/50 mb-5">
                Shared by <span className="font-bold">{resource.author}</span>{" "}
                on
                <span className="font-bold">
                  {" "}
                  {formatDate(resource.createdAt)}
                </span>
              </p>
              <div className="flex items-start flex-wrap gap-4">
                {resource.appliedTagsName.map((tag, i) => (
                  <div
                    className="px-2 text-md rounded-full bg-gray-100 text-background"
                    key={tag + i}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
