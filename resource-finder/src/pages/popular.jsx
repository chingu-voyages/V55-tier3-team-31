import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/commonUtils';
import { getPopularResources } from '../services/popularService';
import { useResourcesContext } from '../context/resourceContext';

const Popular = () => {
  const [popularResources, setPopularResources] = useState([]);
  const { loggedInUser } = useResourcesContext();
  useEffect(() => {
    const fetchPopularResources = async () => {
        try {
            const resources = await getPopularResources();
            setPopularResources(resources);
        } catch (error) {
            console.error('Error fetching popular resources:', error);
            setPopularResources([]);
        }
    };
    fetchPopularResources();
    }, []);

  if (!popularResources.length) {
    return (
      <div className="text-center text-white mt-10">
        <p className="text-lg">No popular resources available at the moment.</p>
        <Link
          to="/"
          className="text-blue-500 underline"
        >
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
      {popularResources.map(resource => (
        <div
          className="w-full px-5 py-5 rounded gap-6 bg-card/80"
          key={resource.id}
        >
          <a
            className="text-lg mb-5 text-background block"
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {resource.name}
          </a>
          <p className="text-sm text-background/50 mb-5">
            Shared by <span className="font-bold">{resource.author}</span> on
            <span className="font-bold"> {formatDate(resource.createdAt)}</span>
          </p>
          <div className="flex items-start flex-wrap gap-4">
            {resource.appliedTagsName?.map((tag, i) => (
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
  );
};

export default Popular;