import { useState, useEffect } from 'react';
import { fetchUserProfile, updateProfileInfo } from '../../services/api';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';

const Profile = ({ userId }) => {
  const [profileData, setProfileData] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userId) {
          const profile = await fetchUserProfile(userId);
          setProfileData(profile);
          setUpdatedProfile({
            name: profile.name,
            email: profile.email,
            role: profile.userType,
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
    setUpdatedProfile({
      ...updatedProfile,
      name: newName,
    });
  };

  const handleEmail = (event) => {
    const newEmail = event.target.value;
    setUpdatedProfile({
      ...updatedProfile,
      email: newEmail,
    });
  };

  const handleForm = (event) => {
    event.preventDefault();
    const updateProfile = async () => {
      try {
        const update = await updateProfileInfo(userId, updatedProfile.name);
      } catch (error) {
        console.log(error);
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
              alt='Profile'
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
                Role: {updatedProfile.role}
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Name:</label>
              <input
                className={styles.input}
                type='text'
                value={updatedProfile.name}
                onChange={handleName}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Email:</label>
              <input
                className={styles.input}
                type='text'
                value={updatedProfile.email}
                readOnly={true}
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

// Prop validation
Profile.propTypes = {
  userId: PropTypes.string.isRequired, // userId is required and must be a string
};

export default Profile;
