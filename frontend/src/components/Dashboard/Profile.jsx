import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/emotion/user_details/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user_details);
      } catch (error) {
        toast.error('Error fetching user data');
      }
    };
    
    fetchUserData();
  }, []);

  if (!user) return <div className="text-white">Loading...</div>;

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500">
              <img 
                src={`http://localhost:8000/media/${user.profile_picture}`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <input
                type="file"
                className="text-sm"
                onChange={(e) => {/* Handle image upload */}}
              />
            )}
          </div>

          <div className="col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-white/70">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.first_name}
                    className="w-full bg-white/10 rounded-lg p-3"
                  />
                ) : (
                  <p className="text-xl">{user.first_name}</p>
                )}
              </div>
              
              {/* Add other fields similarly */}
              
              <div className="space-y-2">
                <label className="text-white/70">Email</label>
                <p className="text-xl">{user.email}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-white/70">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={user.phone_number}
                    className="w-full bg-white/10 rounded-lg p-3"
                  />
                ) : (
                  <p className="text-xl">{user.phone_number || 'Not provided'}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {/* Handle save */}}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;