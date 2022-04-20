import React, { useState } from "react";

import ScorePage from "./ScorePage";

const QuestionView = ({
  question,
  correctAns,
  questionIndex,
  setQuestionIndex,
  limit,
}) => {
  const defaultFormData = {
    answer_a_correct: "false",
    answer_b_correct: "false",
    answer_c_correct: "false",
    answer_d_correct: "false",
    answer_e_correct: "false",
    answer_f_correct: "false",
  };

  const [score, setScore] = useState(0);
  const [skip, setSkip] = useState(0);
  const [formData, setFormData] = useState(defaultFormData);
  const [givenAns, setGivenAns] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked.toString() });
  };

  const next = () => {
    storeAnswer(formData);
    setFormData(defaultFormData);
    setQuestionIndex(questionIndex + 1);
  };

  const prev = () => {
    storeAnswer(formData);
    setFormData(defaultFormData);
    setQuestionIndex(questionIndex - 1);
  };

  const calculateScore = () => {
    return Object.keys(givenAns).reduce((acc, questionId) => {
      let flag = true;
      Object.keys(givenAns[questionId]).forEach((key) => {
        if (correctAns[questionId][key] !== givenAns[questionId][key]) {
          flag = false;
        }
      });
      if (flag) {
        acc++;
      }
      return acc;
    }, 0);
  };

  const renderOptions = (flag) => {
    var option_status = flag === 0 ? defaultFormData : givenAns[question.id];

    return Object.entries(question.answers).map(([key, value]) => {
      let isChecked = option_status[key + "_correct"] === "true" ? true : false;
      return (
        value != null && (
          <div className="form-check">
            <input
              key={key + "_" + question.id}
              type="checkbox"
              name={key + "_correct"}
              value={key}
              defaultChecked={isChecked}
              onChange={(e) => handleChange(e)}
            ></input>
            <label>{value}</label>
          </div>
        )
      );
    });
  };

  const storeAnswer = (options) => {
    setGivenAns({ ...givenAns, [question.id]: options });
  };

  return questionIndex < limit ? (
    <>
      <h3>{question.question}</h3>
      <ul>
        {givenAns[question.id] === null || givenAns[question.id] === undefined
          ? renderOptions(0)
          : renderOptions(1)}
      </ul>

      {questionIndex > 0 && (
        <button
          onClick={() => {
            prev();
          }}
        >
          Previous
        </button>
      )}
      {questionIndex < limit - 1 && (
        <button
          onClick={() => {
            next();
          }}
        >
          Next
        </button>
      )}
      {questionIndex === limit - 1 && (
        <button
          onClick={() => {
            setScore(calculateScore());
            setQuestionIndex(questionIndex + 1);
          }}
        >
          Submit
        </button>
      )}
    </>
  ) : (
    <ScorePage score={score} />
  );
};

export default QuestionView;
