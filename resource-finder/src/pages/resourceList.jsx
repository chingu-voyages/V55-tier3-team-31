import React, { useEffect, useState } from 'react';
import SearchResult from "../components/searchResults";
import Search from '../components/searchControls';
import { useQuery } from '@tanstack/react-query';
import { getAllResources } from '../services/resourceHelperService';
import { useResourcesContext } from '../context/resourceContext';
import {handleTagDetails} from '../utils/commonUtils';
export default function List() {

    return (
        <>
            <Search/>
            <SearchResult />
        </>
    )
}
