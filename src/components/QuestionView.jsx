import React, { useState } from "react";

const QuestionView = ({ question, index, setIndex, limit }) => {
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked.toString() });
  };

  const next = () => {
    checkAnswer(formData, question.correct_answers);
    setFormData(defaultFormData);
    setIndex(index + 1);
  };

  const checkAnswer = (options, answer) => {
    JSON.stringify(options) === JSON.stringify(answer)
      ? setScore(score + 1)
      : setScore(score - 0.5);
  };

  return index < limit ? (
    <>
      {skip == 1 ? <p>No Skippin'</p> : <p>Go on baby!</p>}
      <h3>{question.question}</h3>
      <ul>
        {Object.entries(question.answers).map(([key, value]) => {
          return (
            value != null && (
              <div className="form-check">
                <input
                  key={key + "_" + question.id}
                  type="checkbox"
                  name={key + "_correct"}
                  value={key}
                  onChange={(e) => handleChange(e)}
                ></input>
                <label>{value}</label>
              </div>
            )
          );
        })}
      </ul>

      {/* {index > 0 && (
        <button
          onClick={() => {
            setIndex(index - 1);
            setFormData(defaultFormData);
          }}
        >
          Previous
        </button>
      )} */}
      {index < limit - 1 && (
        <button
          onClick={() => {
            JSON.stringify(formData) === JSON.stringify(defaultFormData)
              ? setSkip(1)
              : next();
          }}
        >
          Next
        </button>
      )}
      {index == limit - 1 && (
        <button
          onClick={() => {
            JSON.stringify(formData) === JSON.stringify(defaultFormData)
              ? setSkip(1)
              : next();
          }}
        >
          Submit
        </button>
      )}
    </>
  ) : (
    <h5> Your score is : {score}</h5>
  );
};

export default QuestionView;
