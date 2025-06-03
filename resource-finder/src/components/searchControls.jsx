import { useState } from "react";
import { useResourcesContext } from "../context/resourceContext.jsx";
import {
  filterBasedOnSearch,
} from "../utils/commonUtils";

export default function Search() {
  const {
    resources,
    searchText,
    setSearchText,
    searchTags,
    setSearchTags,
    setFilteredResources,
    isFetching,
    setIsFetching,
  } = useResourcesContext();

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const searchResource = async () => {
    try {
      setIsFetching(true);
      const filteredResults = filterBasedOnSearch(
        resources,
        searchText,
        searchTags,
      );
      setFilteredResources(filteredResults);
    } catch (error) {
      console.error("An error occured during the fetching of resource:", error);
      setIsFetching(false);
    } finally {
      setIsFetching(false);
    }
  };

  const clearSearch = () => {
    setSearchText("");
    setSearchTags([]);
  };

  return (
    <div className="!bg-card/40 w-full mh-75 mb-8 rounded-md p-10">
      <div className=" w-full mb-5">
        <p className="text-3xl mb-2 font-['Cactus_Classical_Serif',serif] font-semibold">
          Search by title
        </p>
        <input
          type="text"
          onChange={handleSearchText}
          value={searchText}
          className="bg-background rounded-full pl-5 pr-5 w-full h-12 border border-secondary/20 focus:outline-none focus:ring-3 focus:ring-accent"
          placeholder="Enter keywords from title...."
        />
      </div>
      <div className="flex sm:flex-col md:flex-row gap-6 justify-center w-full">
        <button
          onClick={searchResource}
          disabled={isFetching}
          className="disabled:bg-primary-400 bg-primary px-6 h-10 rounded text-white hover:bg-primary/50 md:basis-xs"
        >
          {isFetching ? "Fetching Resources" : "Search"}
        </button>
        <button
          onClick={clearSearch}
          className="border border-accent px-6 h-10 rounded text-accent hover:bg-accent hover:text-white md:basis-xs"
        >
          {" "}
          Clear{" "}
        </button>
      </div>
    </div>
  );
}
