import { useState, useEffect } from 'react';
import { fetchUserProfile, updateProfileInfo } from '../../services/api';
import PropTypes from 'prop-types';
import user from '../../assets/images/user.svg';
import picture from '../../assets/images/picture.svg';
import email from '../../assets/images/email.svg';
import briefcase from '../../assets/images/briefcase.svg';
import styles from './Profile.module.css';

const Profile = ({ userId }) => {
  const [profileData, setProfileData] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({
    role: '',
    name: '',
    email: '',
    pictureUrl: '',
  });
  const [canEdit, setcanEdit] = useState(false);

  const toggleEdit = () => {
    setcanEdit(!canEdit);
  };

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
    setcanEdit(false);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.title}>
        <h2>Profile</h2>
        <button onClick={toggleEdit} className={styles.editButton}>
          Edit
        </button>
      </div>
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
              <img src={briefcase} alt='role icon' className={styles.svg} />
              <label className={styles.label}>
                Role: {profileData.userType}
              </label>
            </div>
            <div className={styles.inputContainer}>
              <img src={user} alt='user icon' className={styles.svg} />
              <label className={styles.label}>Name:</label>
              <input
                className={styles.input}
                type='text'
                name='name'
                readOnly={!canEdit}
                value={updatedProfile.name}
                onChange={handleName}
              />
            </div>
            <div className={styles.inputContainer}>
              <img src={email} alt='email icon' className={styles.svg} />
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
              <img src={picture} alt='picture icon' className={styles.svg} />
              <label className={styles.label}>Profile URL:</label>
              <input
                className={styles.input}
                type='text'
                name='pictureUrl'
                readOnly={!canEdit}
                value={updatedProfile.pictureUrl}
                onChange={handleProfilePic}
              />
            </div>
            {canEdit && (
              <button className={styles.submit} type='submit'>
                Submit
              </button>
            )}
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
