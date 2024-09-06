import {useState} from "react";

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

const LessonForm = ({initialData=EMPTY_LESSON, onSubmit}) => {
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
  const [file, setFile] = useState(null)

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
      } else {
        setFile(e.target.files[0])
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

  const handleFormSubmit = (e) => {
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
        // formData[key].forEach((link, index) => {
        //   submitAttrs.append(`lesson[${key}][${index}]`, link)
        // })
      } else {
        if (formData[key] === '') return;
        submitAttrs.append(key, formData[key])
      }
    })
    onSubmit(submitAttrs)
  }

  console.log({formData})

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          {
            Object.keys(descriptionKeys).map((key) => {
              return (
                descriptionKeys[key] && <div key={key} onClick={() => handleDescriptionAdd(key)}>+ {key}</div>
              )
            })
          }
        </div>
        <label htmlFor={"title"}>Title</label>
        <input type="text" name="title" value={formData['title']} onChange={handleChangeFormData}/>
        <label htmlFor={"points"}>Points</label>
        <input type="number" name="points" value={formData['points']} onChange={handleChangeFormData} placeholder={5}/>
        <label htmlFor={"materials"}>Materials</label>
        <textarea name="materials" value={formData['materials']} onChange={handleChangeFormData}/>
        {
          addedDescriptionKeys.map((key) => {
            return (
              <div key={key}>
                <label htmlFor={`description[${key}]`}>{key}</label>
                {
                  key === 'image' && image && <img src={URL.createObjectURL(image)} alt="preview"/>
                }
                {
                  key === 'file' && file && <a href={URL.createObjectURL(file)} download>Download file</a>
                }
                <input
                  type={["file", "image"].includes(key) ? "file" : "text"}
                  name={key}
                  value={formData['description'][key]}
                  onChange={handleDescriptionChange}
                />
                <button onClick={(e) => handleDescriptionRemove(e, key)}>Remove</button>
              </div>
            )
          })
        }
        <div onClick={handleAddVideo}>+ video</div>
        <div>
          {
            formData['videoLinks'].map((link, index) => {
              return (
                <div key={`videoLinks[${index}]`}>
                  <label htmlFor={`videoLinks[${index}]`}>Video link</label>
                  <input type="text" name={`videoLinks[${index}]`} value={link}
                         onChange={(e) => handleVideoChange(e, index)}/>
                  <button onClick={(e) => handleRemoveVideo(e, index)}>Remove</button>
                </div>
              )
            })
          }
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default LessonForm;