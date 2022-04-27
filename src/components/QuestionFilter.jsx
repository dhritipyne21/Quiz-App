import React, { useState } from "react";
import DropDown from "./utils/DropDown";
import { categories, difficulties, noOfQuestions } from "../filters";
import { Link, useLocation, useNavigate } from "react-router-dom";

const QuestionFilter = () => {
  const [quizFormDetails, setQuizFormDetails] = useState({
    totalQuestions: 10,
    topic: "",
    difficulty: "",
  });
  /**
   * Sets the state variables according to the chnages made in the input fields
   *
   * @param {object} e - Event reference object
   * @return {void}
   */

  const shouldRedirect = true;

  const navigate = useNavigate();
  const handleChange = (e) => {
    setQuizFormDetails({ ...quizFormDetails, [e.target.name]: e.target.value });
  };
  return (
    <>
      <DropDown
        title="Category"
        valuesArray={categories}
        formData={quizFormDetails}
        formName="topic"
        handleChange={handleChange}
        defaultOption="Select a category"
      />
      <DropDown
        title="Difficulty"
        valuesArray={difficulties}
        formData={quizFormDetails}
        formName="difficulty"
        handleChange={handleChange}
        defaultOption="Select a difficulty"
      />
      <DropDown
        title="Number of questions"
        valuesArray={noOfQuestions}
        formData={quizFormDetails}
        formName="totalQuestions"
        handleChange={handleChange}
        defaultOption=""
      />

      <button className="cta-btn"
        onClick={() =>
          navigate(
            `/questions?topic=${quizFormDetails.topic}&totalQuestions=${quizFormDetails.totalQuestions}&difficulty=${quizFormDetails.difficulty}`
          )
        }
      >
        Start Quiz
      </button>
    </>
  );
};

export default QuestionFilter;
