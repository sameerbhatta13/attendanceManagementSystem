import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APP_URL } from '../config';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem('jwt'));
        const token = tokenData?.token;

        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await axios.get(`${APP_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response?.status === 401) {
          toast.error('Unauthorized. Please log in again.');
        } else {
          toast.error(error.response?.data?.message || 'Failed to fetch profile');
        }
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center text-primary mb-4">Employee Profile</h2>
      
      <div className="row justify-content-center">
        <div className="col-md-4 text-center">
          <img
            src={profileData.profilePicture}
            alt="Profile"
            className="img-fluid rounded-circle border border-primary mb-3"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
          <h4 className="mb-2">{profileData.firstName} {profileData.lastName}</h4>
          <p className="text-muted">{profileData.position}</p>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <p><strong>Employee ID:</strong> {profileData.employeeId}</p>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Phone:</strong> {profileData.phone}</p>
              <p><strong>Department:</strong> {profileData.department}</p>
              <p><strong>Address:</strong></p>
              <ul>
                <li><strong>Street:</strong> {profileData.address.street}</li>
                <li><strong>City:</strong> {profileData.address.city}</li>
                <li><strong>State:</strong> {profileData.address.state}</li>
                <li><strong>Postal Code:</strong> {profileData.address.postalCode}</li>
                <li><strong>Country:</strong> {profileData.address.country}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Profile;
