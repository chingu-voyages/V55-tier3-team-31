import React, { useEffect, useState } from 'react';
import { updateUserDetails } from '../services/userService';
import { useResourcesContext } from '../context/resourceContext';
import Select from 'react-select';

const Profile = () => {
  const {loggedInUser} = useResourcesContext();

  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState();

  const [interestsOptions] = useState(['React', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Python']);
  const [editedDetails, setEditedDetails] = useState({
    name: '',
    email: '',
    interests: [],
  });
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent', // Keep the control background transparent
      borderColor: '#4c9a6a', // Apply the theme green color as the border
      borderRadius: '0.5rem',
      padding: '0.25rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#4c9a6a', // Keep the border color consistent on hover
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1f2e2e', // Change dropdown background to black
      border: '1px solid #4c9a6a', // Apply the theme green color as the border
      boxShadow: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#4c9a6a' // Theme green for selected options
        : state.isFocused
        ? 'rgba(76, 154, 106, 0.4)' // Lighter green for focused options
        : 'transparent', // Transparent for unselected options
      color: state.isSelected ? 'white' : 'rgba(255, 255, 255, 0.8)', // White text for selected, subtle white for others
      padding: '0.5rem',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#4c9a6a', // Theme green for selected values
      color: 'white',
      borderRadius: '5px', // Add rounded corners to selected tags
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      ':hover': {
        backgroundColor: '#367c4a', // Darker green on hover
        color: 'white',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: 'white', // Change search text color to white
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
    const selectedValues = selectedOptions.map((option) => option.value);
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


  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-black/10 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {!isEditing ? (
        <div>
          <p className="mb-5"><strong className="block">Name:</strong> {userDetails?.name}</p>
          <p className="mb-5"><strong className="block">Email:</strong> {userDetails?.email}</p>
          <p className="mb-5"><strong className="block">Interests:</strong> {userDetails?.interests?.join(', ')}</p>
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
              value: interest,
              label: interest,
            }))}
            onChange={handleInterestsChange}
            options={interestsOptions.map((interest) => ({
              value: interest,
              label: interest,
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