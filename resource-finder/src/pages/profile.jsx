import React, { useEffect, useState } from 'react';
import { updateUserDetails } from '../services/userService';
import { useResourcesContext } from '../context/resourceContext';
import Select from 'react-select';

const Profile = () => {
  const {loggedInUser, tags} = useResourcesContext();

  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState();

  const [interestsOptions, setInterestsOptions] = useState([]);
  const [editedDetails, setEditedDetails] = useState({
    name: '',
    email: '',
    interests: [],
  });
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent', 
      borderColor: '#4c9a6a', 
      borderRadius: '0.5rem',
      padding: '0.25rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#4c9a6a',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1f2e2e', 
      border: '1px solid #4c9a6a', 
      boxShadow: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#4c9a6a' 
        : state.isFocused
        ? 'rgba(76, 154, 106, 0.4)' 
        : 'transparent', 
      color: state.isSelected ? 'white' : 'rgba(255, 255, 255, 0.8)', 
      padding: '0.5rem',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#4c9a6a', 
      color: 'white',
      borderRadius: '5px', 
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      ':hover': {
        backgroundColor: '#367c4a',
        color: 'white',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleInterestsChange = (selectedOptions) => {
   const selectedValues = selectedOptions.map((option) => {
    const tag = {
      id: option.value,
      tag: option.label
    }
    return tag;
   });
    setEditedDetails({ ...editedDetails, interests: selectedValues });
  };

  const handleSave = async () => {
    await updateUserDetails(editedDetails);
    setUserDetails(editedDetails);
    setIsEditing(false);
  };

  useEffect(() => {
    setUserDetails(loggedInUser);
    setEditedDetails(loggedInUser);
  }, [loggedInUser]);

  useEffect(() => {
    const isSaveBtnDisabled = editedDetails?.name.trim() === '';
    setIsSaveDisabled(isSaveBtnDisabled);
  }, [editedDetails?.name]);

  useEffect(() => {
    setInterestsOptions(tags);
  },[tags]);


  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-black/10 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {!isEditing ? (
        <div>
          <p className="mb-5"><strong className="block">Name:</strong> {userDetails?.name}</p>
          <p className="mb-5"><strong className="block">Email:</strong> {userDetails?.email}</p>
          <p className="mb-5"><strong className="block">Interests:</strong> 
          { userDetails?.interests.length > 0 ? ( userDetails?.interests.map((interest, index) => (
            <span key={index} className="inline-block bg-white text-black px-2 py-1 rounded-lg mr-2 mb-2 mt-2">
              {interest.tag}
            </span>
          ))) : (
            <span className="text-gray-400">No interests added</span>
          )}
          </p>
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/80 transition-all duration-300"
          >
            Edit
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={editedDetails.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#4c9a6a] rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={editedDetails.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#4c9a6a] rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Interests</label>
          <Select
            isMulti
            value={editedDetails.interests.map((interest) => ({
              value: interest.id,
              label: interest.tag,
            }))}
            onChange={handleInterestsChange}
            options={interestsOptions.map((interest) => ({
              value: interest.id,
              label: interest.tag,
            }))}
            styles={customStyles}
            className="w-full"
          />
          </div>
          <button
            onClick={handleSave}
            disabled={isSaveDisabled}
            className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 mr-2 ${
              isSaveDisabled
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/80'
            }`}
            title={isSaveDisabled ? 'Name is required to save.' : ''}
          >
            Save
          </button>
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;