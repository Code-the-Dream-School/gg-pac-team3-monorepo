import { useState } from "react";
import SideBar from "../SideBar/SideBar.jsx";
import styles from "./QuizForm.module.css";

const DEFAULT_QUIZ = {
  questions: [],
  title: ''
}

const DEFAULT_QUESTION = {
  answer: '',
  options: [],
  questionText: ''
}

const QuizForm = ({initialData = DEFAULT_QUIZ, handleSubmit}) => {
  const { title, questions } = initialData;
  const [formData, setFormData] = useState({title, questions});

  const handleChangeFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddQuestion = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      questions: [...formData.questions, {...DEFAULT_QUESTION, options: []}]
    })
  }

  const handleChangeQuestion = (e, questionIndex, optionIndex) => {
    const newQuestions = [...formData.questions];
    if (optionIndex !== undefined) {
      newQuestions[questionIndex].options[optionIndex] = e.target.value;
    } else {
      const attrName = e.target.name.split('-')[0];
      console.log({attrName})
      newQuestions[questionIndex][attrName] = e.target.value;
    }
    setFormData({
      ...formData,
      questions: newQuestions
    })
  }

  const handleAddAnswerOption = (e, index) => {
    e.preventDefault();
    const newQuestions = [...formData.questions];
    newQuestions[index].options.push('');
    setFormData({
      ...formData,
      questions: newQuestions
    })
  }

  return (
    <div className={styles.quizFormContainer}>
      <SideBar />
      <form className={styles.quizForm} onSubmit={(e) => handleSubmit(e, formData)}>
        <div>
          <label htmlFor={"title"}>Quiz title</label>
          <input
            className={styles.quizTitleInput}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChangeFormData}
          />
        </div>
        <button className={styles.addQuestionButton} onClick={handleAddQuestion}>Add Question</button>
          {
            formData.questions?.map((question, index) => {
              return (
                <div key={`question-${index}`} className={styles.questionsContainer}>
                  <div className={styles.quizSection}>
                    <label htmlFor={`questionText-${index}`}>Question</label>
                    <input
                      className={styles.questionInput}
                      type="text"
                      name={`questionText-${index}`}
                      value={question.questionText}
                      onChange={(e) => handleChangeQuestion(e, index)}
                    />
                  </div>
                  <div className={styles.quizSection}>
                    <label htmlFor={`answer-${index}`}>Answer</label>
                    <input
                      className={styles.answerInput}
                      type="text"
                      name={`answer-${index}`}
                      value={question.answer}
                      onChange={(e) => handleChangeQuestion(e, index)}
                    />
                  </div>
                  <div className={styles.quizSection}>
                  <button className={styles.addAnswerOption} onClick={(e) => handleAddAnswerOption(e, index)}>Add answer option</button>
                    {
                    question.options.map((option, optionIndex) => {
                      return (
                        <div key={optionIndex}>
                          <label htmlFor={`option-${index}-${optionIndex}`}>Option</label>
                          <input
                            className={styles.optionInput}
                            type="text"
                            name={`option-${index}-${optionIndex}`}
                            value={option}
                            onChange={(e) => handleChangeQuestion(e, index, optionIndex)}
                          />
                        </div>
                      )
                    })
                  }
                  </div>
                </div>
              )
            })
          }
        <button className={styles.submitButton} type="submit">Save</button>
      </form>
    </div>
  );
};

export default QuizForm;