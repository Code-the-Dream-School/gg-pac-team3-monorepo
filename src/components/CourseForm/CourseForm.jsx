import { useState, useEffect } from 'react';
import SideBar from "../SideBar/SideBar.jsx";
import styles from './CourseForm.module.css';

const DEFAULT_LOGO_URL = '/images/CoursesIcon.png';

const CourseForm = ({ initialData = {}, onSubmit, formTitle }) => {
  const [courseName, setCourseName] = useState(initialData.name || '');
  const [courseType, setCourseType] = useState(initialData.type || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [duration, setDuration] = useState(initialData.duration || '');
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(initialData.logoUrl || DEFAULT_LOGO_URL);
  const [errors, setErrors] = useState(null);

    useEffect(() => {
      if (initialData.courseName) setCourseName(initialData.courseName);
      if (initialData.courseType) setCourseType(initialData.courseType);
      if (initialData.description) setDescription(initialData.description);
      if (initialData.duration) setDuration(initialData.duration);
      if (initialData.logoUrl) {
        setLogoPreview(initialData.logoUrl || DEFAULT_LOGO_URL);
      }
    }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!courseName.trim()) newErrors.courseName = 'Please enter course name';
    if (!courseType.trim()) newErrors.courseType = 'Please enter course type';
    if (!description.trim()) newErrors.description = 'Please enter course description';
    if (!duration.trim()) newErrors.duration = 'Please enter course duration';
    return newErrors;
  };

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
      if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
      } else {
        setLogo(null);
        setLogoPreview(DEFAULT_LOGO_URL);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
      onSubmit({courseName, courseType, description, logo, duration});
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
                <div className={styles.errorContainer}>
                  {errors?.courseName && <span>{errors.courseName}</span>}
                </div>
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
                <div className={styles.errorContainer}>
                  {errors?.courseType && <span>{errors.courseType}</span>}
                </div>
              </div>

              <div className={styles.formSection}>
                <label className={styles.logoUploadLabel} htmlFor="logoUpload">Upload logo</label>
                  {logoPreview && (
                <div>
                  <img
                    src={logoPreview}
                    alt="Course Logo"
                    style={{width: '100px', height: '100px', objectFit: 'cover', margin: '10px'}}/>
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
              <div className={styles.errorContainer}>
                {errors?.description && <span>{errors.description}</span>}
              </div>
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
                <div className={styles.errorContainer}>
                {errors?.duration && <span>{errors.duration}</span>}
                </div>
              </div>
              <button type="submit" className={styles.saveFormButton}>Save course</button>
          </form>
      </div>
    );
};

export default CourseForm;
