import { useState, useEffect } from 'react';
import { fetchUserProfile, updateProfileInfo } from '../../services/api';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';

const Profile = ({ userId }) => {
  const [profileData, setProfileData] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({
    name: '',
    email: '',
    profilePictureUrl: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userId) {
          const profile = await fetchUserProfile(userId);
          setProfileData(profile);
          setUpdatedProfile({
            name: profile.name,
            email: profile.email,
            profilePictureUrl: profile.profilePictureUrl,
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updateProfile = async () => {
      try {
        await updateProfileInfo(userId, updatedProfile);
        const updatedData = await fetchUserProfile(userId); // Fetch the updated profile data
        setProfileData(updatedData);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    };
    updateProfile();
  };

  return (
    <div className={styles.profileContainer}>
      <h2>Profile</h2>
      {profileData && (
        <>
          <div>
            <img
              src={profileData.profilePictureUrl}
              alt="Profile"
              className={styles.profileImage}
            />
          </div>
          <form
            id="updateProfileForm"
            className={styles.form}
            onSubmit={handleFormSubmit}
          >
            <div className={styles.inputContainer}>
              <label className={styles.label}>Role: {profileData.userType}</label>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Name:</label>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={updatedProfile.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Email:</label>
              <input
                className={styles.input}
                type="text"
                name="email"
                value={updatedProfile.email}
                readOnly={true}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Profile Picture URL:</label>
              <input
                className={styles.input}
                type="text"
                name="profilePictureUrl"
                value={updatedProfile.profilePictureUrl}
                onChange={handleChange}
              />
            </div>
            <button className={styles.submit} type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  userId: PropTypes.string.isRequired, // userId is required and must be a string
};

export default Profile;
