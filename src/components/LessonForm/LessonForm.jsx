import {useState, useEffect} from "react";
import styles from "./LessonForm.module.css";
import SideBar from "../SideBar/SideBar.jsx";
import {useNavigate} from "react-router-dom";

const EMPTY_LESSON = {
  title: '',
  points: 5,
  materials: '',
  description: {
    Intro: '',
    details: '',
    overview: '',
    video: '',
    file: undefined,
    image: undefined
  },
  videoLinks: []
}

const LessonForm = ({initialData=EMPTY_LESSON, onSubmit, formTitle, redirectTo, quizzes}) => {
  const [formData, setFormData] = useState(initialData)
  const [descriptionKeys, setDescriptionKeys] = useState({
    Intro: true,
    details: true,
    overview: true,
    video: true,
    file: true,
    image: true
  })
  const [addedDescriptionKeys, setAddedDescriptionKeys] = useState([])
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [file, setFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const presentKeys =  Object.keys(initialData.description).filter((key) => {
      return initialData.description[key] !== '' || initialData.description[key] !== undefined
    })
    if (!!presentKeys?.length) {
      setAddedDescriptionKeys(presentKeys)
      const newDescriptionKeys = {...descriptionKeys, ...presentKeys.reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {})
      }
      setDescriptionKeys(newDescriptionKeys)
    }
    if(presentKeys.includes('image')) {
      setImagePreview(initialData.description.image)
    }
    if(presentKeys.includes('file')) {
      setFilePreview(initialData.description.file)
    }
  }, [initialData]);

  const handleChangeFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDescriptionAdd = (descriptionKey) => {
    setAddedDescriptionKeys([...addedDescriptionKeys, descriptionKey]);
    setDescriptionKeys({...descriptionKeys, [descriptionKey]: false})
  }

  const handleDescriptionRemove = (e, descriptionKey) => {
    e.preventDefault();
    const newDescription = {...formData['description']}
    delete newDescription[descriptionKey]
    setFormData({
      ...formData,
      description: newDescription
    })
    setAddedDescriptionKeys(addedDescriptionKeys.filter((key) => key !== descriptionKey))
    setDescriptionKeys({...descriptionKeys, [descriptionKey]: true})
  }

  const handleDescriptionChange = (e) => {
    const prevDescription = formData['description'];
    const newDescription = {
      ...prevDescription,
      [e.target.name]: e.target.value
    }
    setFormData({
      ...formData,
      description: newDescription
    })
    if (e.target.type === 'file') {
      if (e.target.name === 'image') {
        setImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
      } else {
        setFile(e.target.files[0])
        setFilePreview(URL.createObjectURL(e.target.files[0]))
      }
    }
  }

  const handleAddVideo = () => {
    setFormData({
      ...formData,
      videoLinks: [...formData['videoLinks'], '']
    })
  }

  const handleRemoveVideo = (e, index) => {
    e.preventDefault();
    const newVideoLinks = formData['videoLinks'].filter((link, i) => i !== index)
    setFormData({
      ...formData,
      videoLinks: newVideoLinks
    })
  }

  const handleVideoChange = (e, index) => {
    const newVideoLinks = formData['videoLinks'].map((link, i) => {
      if (i === index) {
        return e.target.value
      } else {
        return link
      }
    })
    setFormData({
      ...formData,
      videoLinks: newVideoLinks
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const submitAttrs = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === 'description') {

        if (formData[key].file) {
          submitAttrs.append('file', file)
        }
        if (formData[key].image) {
          submitAttrs.append('image', image)
        }
        const description = {};
        Object.keys(formData[key]).forEach((descriptionKey) => {
          if(descriptionKey === 'file' || descriptionKey === 'image' || formData[key][descriptionKey] === '') return;
          description[descriptionKey] = formData[key][descriptionKey];
        })
        submitAttrs.append('description', JSON.stringify(description))
      } else if (key === 'videoLinks') {

        submitAttrs.append('videoLinks', JSON.stringify(formData[key]))
      } else {
        if (formData[key] === '') return;
        submitAttrs.append(key, formData[key])
      }
    })
    const responseData = await onSubmit(submitAttrs)
    return responseData;
  }

  const handleSaveLesson = (e) => {
    e.preventDefault();
    handleFormSubmit(e);
    navigate(redirectTo);
  }

  const handleAddQuiz = async (e) => {
    e.preventDefault();
    const data = await handleFormSubmit(e);
    if (quizzes?.length) {
      navigate(`${redirectTo}/${data.lessonId}/quiz/edit/${quizzes[0].id}`);
      return;
    } else {
      navigate(`${redirectTo}/${data.lessonId}/quiz/new`);
    }
  }

  return (
    <div className={styles.lessonFormContainer}>
      <SideBar />
      <form onSubmit={handleSaveLesson} className={styles.lessonForm}>
        <h2>{formTitle}</h2>
        <div className={styles.lessonFormSection}>
          <label htmlFor={"title"}>
            Title
          </label>
          <input
            className={styles.lessonFormInput}
            type="text"
            name="title"
            value={formData['title']}
            onChange={handleChangeFormData}
          />
        </div>
        <div className={styles.lessonFormSection}>
          <label htmlFor={"points"}>
            Points
          </label>
          <input
            className={styles.lessonPointsInput}
            type="number"
            name="points"
            value={formData['points']}
            onChange={handleChangeFormData} placeholder={5}
          />
        </div>
        <div className={styles.lessonFormSection}>
          <label htmlFor={"materials"}>Materials</label>
          <textarea
            className={styles.materialsTextarea}
            name="materials"
            value={formData['materials']}
            onChange={handleChangeFormData}
          />
        </div>
        <div className={styles.lessonSteps}>
          {
            Object.keys(descriptionKeys).map((key) => {
              return (
                descriptionKeys[key] && <div key={key} onClick={() => handleDescriptionAdd(key)}>+ {key}</div>
              )
            })
          }
        </div>
        <div className={styles.lessonAddedSteps}>
          {
            addedDescriptionKeys.map((key) => {
              const isFile = key === 'file' || key === 'image';
              return (
                <div key={key} className={styles.addedStep}>
                  <label htmlFor={key} className={ isFile ? styles.lessonLabelFile : undefined}>
                    {key}
                  </label>
                  <input
                    className={styles.lessonFormInput}
                    id={key}
                    type={["file", "image"].includes(key) ? "file" : "text"}
                    name={key}
                    value={['image', 'file'].includes(key) ? undefined : formData['description'][key]}
                    onChange={handleDescriptionChange}
                    style={{display: isFile ? 'none' : 'block'}}
                  />
                  <div>
                    {
                      key === 'image' && imagePreview &&
                      <div>
                        <img src={imagePreview} alt="preview"/>
                      </div>
                    }
                  </div>
                  <div>
                    {
                      key === 'file' && filePreview && <a className={styles.downloadFileLink} href={filePreview} download>Download file</a>
                    }
                    <button className={styles.removeDescriptionButton} onClick={(e) => handleDescriptionRemove(e, key)}>
                      Remove
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      <div className={styles.quizContainer}>
        {
        !!quizzes?.length ? <div className={styles.quizSection}>
          { quizzes[0]?.title }
          <button type="button" className={styles.quizButton}
                  onClick={handleAddQuiz}>Edit quiz</button>
          </div> :
          <button type="button" className={styles.quizButton} onClick={handleAddQuiz}>Add quiz</button>
      }
      </div>
       <div>
         <button type="submit" className={styles.saveLessonButton}>Save</button>
       </div>
      </form>
    </div>
  );
};

export default LessonForm;