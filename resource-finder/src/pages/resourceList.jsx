import React, { useState } from 'react';
import SearchResult from "../components/searchResults";
import Search from '../components/searchControls';
import { useQuery } from '@tanstack/react-query';
import { getAllResources } from '../services/resourceHelperService';
import { useResourcesContext } from '../context/resourceContext';
import {handleTagDetails} from '../utils/commonUtils';

export default function List() {

    const {setTags, setTagDetails} = useResourcesContext();
    const {
        data,
        isFetching:isFetchingResources,
        refetch
    }
     = useQuery({
        queryKey:["resources"],
        queryFn:getAllResources,
        enabled:false
    })

    const {
        data:allTags,
        isLoading:isFetchingTags
    } = useQuery({
        queryKey:['allTags'],
        queryFn:() => handleTagDetails(setTags, setTagDetails)
    })

    return (
        <>
            <Search fetchResources={refetch} isFetchingTags={isFetchingTags} />
            <SearchResult isLoading={isFetchingResources}/>
        </>
    )
}