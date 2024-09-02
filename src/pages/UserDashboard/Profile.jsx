import { useState, useEffect } from 'react';
import { fetchUserProfile, updateProfileInfo } from '../../services/api';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';

const Profile = ({ userId }) => {
  const [profileData, setProfileData] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({
    role: '',
    name: '',
    email: '',
    pictureUrl: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userId) {
          const profile = await fetchUserProfile(userId);
          setProfileData(profile);
          setUpdatedProfile({
            role: profile.userType,
            name: profile.name,
            email: profile.email,
            pictureUrl: profile.profilePictureUrl,
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleName = (event) => {
    const newName = event.target.value;
    setUpdatedProfile((updatedProfile) => ({
      ...updatedProfile,
      name: newName,
    }));
  };

  const handleProfilePic = (event) => {
    const newUrl = event.target.value;
    setUpdatedProfile((updatedProfile) => ({
      ...updatedProfile,
      pictureUrl: newUrl,
    }));
  };

  const handleForm = (event) => {
    event.preventDefault();
    const updateProfile = async () => {
      try {
        await updateProfileInfo(userId, updatedProfile);
        const updatedData = await fetchUserProfile(userId);
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
              src={updatedProfile.pictureUrl}
              alt='Profile Picture'
              className={styles.profileImage}
            />
          </div>
          <form
            id='updateProfileForm'
            className={styles.form}
            onSubmit={handleForm}
          >
            <div className={styles.inputContainer}>
              <label className={styles.label}>
                Role: {profileData.userType}
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Name:</label>
              <input
                className={styles.input}
                type='text'
                name='name'
                value={updatedProfile.name}
                onChange={handleName}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Email:</label>
              <input
                className={styles.input}
                type='text'
                name='email'
                value={updatedProfile.email}
                readOnly={true}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Profile Picture URL:</label>
              <input
                className={styles.input}
                type='text'
                name='pictureUrl'
                value={updatedProfile.pictureUrl}
                onChange={handleProfilePic}
              />
            </div>
            <button className={styles.submit} type='submit'>
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
