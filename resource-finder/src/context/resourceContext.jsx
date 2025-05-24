import { createContext, useContext, useState } from "react";

export const ResourcesContext = createContext({
    resources:[],
    setResources:() => {},
    tags:[],
    setTags:() => {},
    tagDetails:{},
    setTagDetails:() => {},
    filteredResources:[],
    setFilteredResources:() => {},
    searchText:"",
    setSearchText:() => {},
    searchTags:[],
    setSearchTags:() => {}
})

export const ResourcesContextProvider = ({children}) => {
    const [resources, setResources] = useState([]);
    const [tags, setTags] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchTags, setSearchTags] = useState([]);
    const [tagDetails, setTagDetails] = useState({});
    return (
        <ResourcesContext.Provider value={{
            resources, setResources,
            tags, setTags,
            filteredResources, setFilteredResources,
            searchText, setSearchText,
            searchTags, setSearchTags,
            tagDetails, setTagDetails
        }}>
            {children}
        </ResourcesContext.Provider>
    )
}

export const useResourcesContext = () => useContext(ResourcesContext);