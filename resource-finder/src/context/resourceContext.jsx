import { createContext, useContext, useState, useEffect } from "react";
// Assuming apiService.js and utils.js are in appropriate locations (e.g., same directory or ../services, ../utils)
// You might need to adjust these paths based on your project structure.
import { addTagNamesToAllResources } from "../utils/commonUtils"; // Placeholder import
import resourcesData from "../data/resources.json"; // Local JSON data for resources
import tagsData from "../data/tags.json"; // Local JSON data for tags

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
    setSearchTags:() => {},
    isFetching: false,
    setIsFetching: () => {},
    isUserLoggedIn: false,
    setIsUserLoggedIn: () => {},
    loggedInUser: null,
    setLoggedInUser: () => {},
});

export const ResourcesContextProvider = ({children}) => {
    const [resources, setResources] = useState([]);
    const [tags, setTags] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchTags, setSearchTags] = useState([]);
    const [tagDetails, setTagDetails] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null); 

    const loadResources = async () => {
        try {
            setIsFetching(true);
            
            // Use local JSON data instead of network requests
            const resourcesResp = resourcesData;
            const tagsResp = tagsData;
            
            
            // Create tagDetails mapping
            const newTagDetailsMap = {};
            tagsResp.forEach(t => {
                newTagDetailsMap[t.id] = t.tag;
            });
            
            // Add tag names to resources immediately
            const resourcesWithTagNames = addTagNamesToAllResources(resourcesResp, newTagDetailsMap);
            console.log("Resources with tag names:", resourcesWithTagNames);
            
            setResources(resourcesWithTagNames);
            setTags(tagsResp);

            setTagDetails(newTagDetailsMap);
        } catch (error) {
            console.error("Error loading resources:", error);
        } finally {
            setIsFetching(false);
        }
    };

    // Call loadResources on component mount
    useEffect(() => {
        loadResources();
    }, []);

    return (
        <ResourcesContext.Provider value={{
            resources, setResources,
            tags, setTags,
            filteredResources, setFilteredResources,
            searchText, setSearchText,
            searchTags, setSearchTags,
            tagDetails, setTagDetails,
            isFetching, setIsFetching,
            hasSearched, setHasSearched,
            isUserLoggedIn, setIsUserLoggedIn,
            loggedInUser, setLoggedInUser
        }}>
            {children}
        </ResourcesContext.Provider>
    )
}

export const useResourcesContext = () => useContext(ResourcesContext);
