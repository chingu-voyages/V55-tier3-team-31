
import { getAllTags } from '../services/resourceHelperService';

export const formatDate = (date) => {
    const _date = date ? new Date(date) : new Date();
    const formattedDate = _date.toLocaleDateString("en-us",{
        weekday:'long',
        year:'numeric',
        month:'long',
        day:'numeric'
    })
    return formattedDate;
}

export const handleTagDetails = async(setTags, setTagDetails) => {
    const tagsResp = await getAllTags();
    setTags(tagsResp);
    const tagDetails = {};
    tagsResp.forEach(t => {
        tagDetails[t.id] = t.tag;
    })
    setTagDetails(tagDetails);
    return tagsResp;
}

export const addTagNamesToAllResources = (resources, tagDetails) => {
    const modifiedResources = resources.map((r) => {
        const resource = {...r};
        const modifiedTags = resource.appliedTags.map(tag => tagDetails[tag] );
        resource.appliedTagsName = modifiedTags;
        return resource;
    })
    return modifiedResources;
}

export const filterBasedOnSearch = (resources, text, tags ) => {
    const selectedTags = tags.map(t => t.id);

    const checkMatchingTags = (userTags, resourceTags) => {
        let isMatchingTags = false;
        for(let i=0; i < userTags.length; i++) {
            for(let j=0; j < resourceTags.length; j++) {
                if(userTags[i] === resourceTags[j]) {
                    isMatchingTags = true;
                }
            }
        }
        return isMatchingTags;
    }
    const filteredResults = [];

    for(let i=0; i < resources.length; i++) {
        const textCondition = text.length ? resources[i].name.toLowerCase().includes(text.toLowerCase()) : false;
        const tagCondition = selectedTags.length ? checkMatchingTags(selectedTags, resources[i].appliedTags) : false;
        if(textCondition || tagCondition) {
            filteredResults.push(resources[i]);
        }
    }
    return filteredResults;
}