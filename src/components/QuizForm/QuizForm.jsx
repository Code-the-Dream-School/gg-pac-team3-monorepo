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
        <div className={styles.quizSection}>
          <label className={styles.titleLabel} htmlFor={"title"}>Quiz title</label>
          <input
            className={styles.quizFormInput}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChangeFormData}
            placeholder={"Enter quiz title"}
          />
        </div>
        <button className={styles.addQuestionButton} onClick={handleAddQuestion}>Add Question</button>
          {
            formData.questions?.map((question, index) => {
              return (
                <div key={`question-${index}`} className={styles.questionsContainer}>
                  <div className={styles.quizQuestionSection}>
                    <label className={styles.questionAnswerLabel} htmlFor={`questionText-${index}`}>Question</label>
                    <input
                      className={styles.quizFormInput}
                      type="text"
                      name={`questionText-${index}`}
                      value={question.questionText}
                      onChange={(e) => handleChangeQuestion(e, index)}
                      placeholder={"Enter your question here"}
                    />
                  </div>
                  <div className={styles.quizSection}>
                    <label className={styles.questionAnswerLabel} htmlFor={`answer-${index}`}>Answer</label>
                    <input
                      className={styles.quizFormInput}
                      type="text"
                      name={`answer-${index}`}
                      value={question.answer}
                      onChange={(e) => handleChangeQuestion(e, index)}
                      placeholder={"Enter the correct answer here"}
                    />
                  </div>
                  {/*<div className={styles.answerOptionContainer}>*/}
                    {
                      question.options.map((option, optionIndex) => {
                        return (
                          <div key={optionIndex} className={styles.quizSection}>
                            <label htmlFor={`option-${index}-${optionIndex}`}>Option</label>
                            <input
                              className={styles.quizFormInput}
                              type="text"
                              name={`option-${index}-${optionIndex}`}
                              value={option}
                              onChange={(e) => handleChangeQuestion(e, index, optionIndex)}
                              placeholder={"Enter an answer option"}
                            />
                          </div>
                        )
                      })
                    }
                    <button className={styles.addAnswerOption} onClick={(e) =>
                      handleAddAnswerOption(e, index)}>
                      Add answer option
                    </button>
                  {/*</div>*/}
                </div>
              )
            })
          }
       <div><button className={styles.submitButton} type="submit">Save Quiz</button></div>
      </form>
    </div>
  );
};

export default QuizForm;