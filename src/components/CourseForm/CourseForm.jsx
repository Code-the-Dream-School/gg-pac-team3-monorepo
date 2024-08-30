import { useState, useEffect } from 'react';
import SideBar from "../SideBar/SideBar.jsx";
import styles from './CourseForm.module.css';

const CourseForm = ({ initialData = {}, onSubmit, formTitle }) => {
  const [courseName, setCourseName] = useState(initialData.name || '');
  const [courseType, setCourseType] = useState(initialData.type || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [duration, setDuration] = useState(initialData.duration || '');
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(initialData.logoUrl || null);

    useEffect(() => {
      if (initialData.courseName) setCourseName(initialData.courseName);
      if (initialData.courseType) setCourseType(initialData.courseType);
      if (initialData.description) setDescription(initialData.description);
      if (initialData.duration) setDuration(initialData.duration);
      if (initialData.logoUrl) {
        setLogoPreview(initialData.logoUrl);
      }
    }, [initialData]);

    const handleNameChange = (e) => {
      setCourseName(e.target.value);
    };

    const handleTypeChange = (e) => {
      setCourseType(e.target.value);
    };

    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };

    const handleDurationChange = (e) => {
      setDuration(e.target.value);
    };

    const handleLogoUpload = (e) => {
      const file = e.target.files[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({courseName, description, logo});
    };

    return (
      <div className={styles.courseFormContainer}>
        <SideBar/>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.courseForm}>
            <h2>{formTitle}</h2>
              <div className={styles.formSection}>
                <label htmlFor="courseName">Course name</label>
                <input
                  className={styles.courseFormInput}
                  type="text"
                  id="courseName"
                  value={courseName}
                  onChange={handleNameChange}
                  placeholder="Enter text here"
                />
              </div>

              <div className={styles.formSection}>
                <label htmlFor="courseType">Course type</label>
                <input
                  className={styles.courseFormInput}
                  id="courseType"
                  value={courseType}
                  onChange={handleTypeChange}
                  placeholder="Enter text here"
                />
              </div>

              <div className={styles.formSection}>
                <label className={styles.logoUploadLabel} htmlFor="logoUpload">Upload logo</label>
                  {logoPreview && (
                <div>
                  <img src={logoPreview} alt="Course Logo"
                    style={{width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px'}}/>
                </div>
                  )}
                <input
                  className={styles.uploadLogoInput}
                  type="file"
                  id="logoUpload"
                  onChange={handleLogoUpload}
                />
              </div>

              <div className={styles.formSection}>
                <label htmlFor="description">Course description</label>
                <textarea
                  className={styles.textarea}
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Enter text here"
                />
              </div>

              <div className={styles.formSection}>
                <label htmlFor="duration">Duration</label>
                <input
                  className={styles.courseFormInput}
                  type="text"
                  id="duration"
                  value={duration}
                  onChange={handleDurationChange}
                  placeholder="Enter text here"
                />
              </div>
              <button type="submit" className={styles.saveFormButton}>Save</button>
          </form>
      </div>
    );
};

export default CourseForm;
