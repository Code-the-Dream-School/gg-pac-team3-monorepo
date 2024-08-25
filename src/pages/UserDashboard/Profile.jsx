import { useState, useEffect } from 'react';
import { fetchUserProfile } from '../../services/api';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';

const Profile = ({ userId }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userId) {
          const profile = await fetchUserProfile(userId);
          setProfileData(profile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <div className={styles.profileContainer}>
      <h2>Profile Information</h2>
      {profileData && (
        <>
          <div>
            <img
              src={profileData.profilePictureUrl}
              alt='Profile'
              className={styles.profileImage}
            />
          </div>
          <div className={styles.profileDetails}>
            <p>
              <strong>Name:</strong> {profileData.name}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

// Prop validation
Profile.propTypes = {
  userId: PropTypes.string.isRequired, // userId is required and must be a string
};

export default Profile;
