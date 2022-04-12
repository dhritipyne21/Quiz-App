import React, { useState } from "react";
import { Link } from "react-router-dom";

const QuestionView = ({ question, correctAns, index, setIndex, limit }) => {
  //const givenAns = localStorage.getItem(question.id)
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
    // checkAnswer(formData, question.correct_answers);
    storeAnswer(formData);
    setFormData(defaultFormData);
    setIndex(index + 1);
  };

  const prev = () => {
    // checkAnswer(formData, question.correct_answers);
    storeAnswer(formData);
    setFormData(defaultFormData);
    setIndex(index - 1);
  };

  const calculateScore = () => {

    // console.log("score")
    // return Object.keys(correctAns).reduce((acc, questionId) => {
    //     JSON.stringify(correctAns[questionId]) === JSON.stringify(givenAns[questionId]) && acc++
    //     return acc
    // }, 0)  
    
    return Object.keys(givenAns).reduce((acc, questionId) => {
      let flag=true
      console.log(givenAns)
      Object.entries(givenAns[questionId]).forEach(([key,value])=>{
        //console.log(key)
        //console.log(correctAns[questionId][key])
         
          if (correctAns[questionId][key] !== givenAns[questionId][key]){
              flag =false   
          }    
      })
      if(flag){
          acc++
      }
      return acc;
      },0)

}

  const renderOptions = (flag) => {
    var option_status =
      flag == 0
        ? defaultFormData
        : givenAns[question.id];

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
    //localStorage.setItem(question.id, JSON.stringify(options));
    setGivenAns({...givenAns,[question.id]:options})
    console.log({...givenAns,[question.id]:options});

  };

  return index < limit ? (
    <>
      {/* {skip == 1 ? <p>No Skippin'</p> : <p>Go on baby!</p>} */}
      <h3>{question.question}</h3>
      <ul>
        {givenAns[question.id] == null || givenAns[question.id] == undefined
          ? renderOptions(0)
          : renderOptions(1)}
      </ul>

      {index > 0 && (
        <button
          onClick={() => {
            // JSON.stringify(formData) === JSON.stringify(defaultFormData)
            //   ? setSkip(1)
            //   : prev();
            prev();
          }}
        >
          Previous
        </button>
      )}
      {index < limit - 1 && (
        <button
          onClick={() => {
            // JSON.stringify(formData) === JSON.stringify(defaultFormData)
            //   ? setSkip(1)
            //   : next();
            next();
          }}
        >
          Next
        </button>
      )}
      {index == limit - 1 && (
        <button
          onClick={() => {
            // JSON.stringify(formData) === JSON.stringify(defaultFormData)
            //   ? setSkip(1)
            //   : next();
            setScore(calculateScore());
            setIndex(index + 1);
          }}
        >
          Submit
        </button>
      )}
    </>
  ) : (
    <>
    <h5> Your score is : {score}</h5>
    <Link to="/hello">Go to Questions</Link>
    </>
  );
};

export default QuestionView;
