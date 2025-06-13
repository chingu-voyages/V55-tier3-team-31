import React, { useEffect, useState } from 'react';
import { useResourcesContext } from '../context/resourceContext';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/commonUtils';

const Recommended = () => {
  const { loggedInUser, resources } = useResourcesContext();
  const [recommendedResources, setRecommendedResources] = useState([]);

  useEffect(() => {
    if (!loggedInUser || !loggedInUser.interests?.length) {
      setRecommendedResources([]);
      return;
    }
    
    const userInterests = loggedInUser.interests.map(interest => interest.tag);
    const resourcesWithTags = resources.filter(resource =>
      resource.appliedTagsName.some(tag => userInterests.includes(tag))
    );

    setRecommendedResources(resourcesWithTags)
  }, [loggedInUser]);

  if (!loggedInUser?.interests?.length) {
    return (
      <div className="text-center text-white mt-10">
        <p className="text-lg">You haven't added any interests yet.</p>
        <Link
          to="/profile"
          className="text-green-500 hover:underline"
        >
          Go to Profile Page to add interests
        </Link>
      </div>
    );
  }

  return (
    <>
        <h1 className="text-2xl font-bold text-white mb-6">Recommended Resources</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto mt-10">
        {recommendedResources.length > 0 ? recommendedResources.map(resource => (
            <div
            className='w-full px-5 py-5 rounded gap-6 bg-card/80'
            key={resource.id}
        >
            <a
            className='text-lg mb-5 text-background block'
            href={resource.url}
            target='_blank'
            >
            {resource.name}
            </a>
            <p className='text-sm text-background/50 mb-5'>
            Shared by <span className='font-bold'>{resource.author}</span>{' '}
            on
            <span className='font-bold'>
                {' '}
                {formatDate(resource.createdAt)}
            </span>
            </p>
            <div className='flex items-start flex-wrap gap-4'>
            {resource.appliedTagsName.map((tag, i) => (
                <div
                className='px-2 text-md rounded-full bg-gray-100 text-background'
                key={tag + i}
                >
                {tag}
                </div>
            ))}
            </div>
        </div>
        )) : (
            <p className="text-white">No resources found based on your interests.</p>
        )}
        </div>
    </>
  );
};

export default Recommended;
