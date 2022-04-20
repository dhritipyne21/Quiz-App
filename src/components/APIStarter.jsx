import React, { useState, useEffect } from "react";
import { BASEURL } from "../apiConstant";
import QuestionView from "./QuestionView";
import response from "./demoResponse";
import { Link, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ApiStarter = () => {
  let query = useQuery();

  const topic = query.get("topic");
  const totalQuestions = query.get("totalQuestions");
  const difficulty = query.get("difficulty");

  localStorage.setItem("storedAnswers", []);
  const [allAnswers, setAllAnswers] = useState({});
  const [questionLimit, setQuestionLimit] = useState(totalQuestions);
  const [response, setResponse] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const storeCorrectAns = (response) => {
    let ans = {};
    Object.entries(response).forEach(([key, value]) => {
      ans = { ...ans, [value.id]: value.correct_answers };
    });

    setAllAnswers(ans);
  };

  useEffect(() => {
    fetch(
      `${BASEURL}?apiKey=${process.env.REACT_APP_API_KEY}&category=${topic}&difficulty=${difficulty}&limit=${totalQuestions}`
    )
      .then((response) => response.json())
      .then((json) => {
        setResponse(json);
        storeCorrectAns(json);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {response.length === 0 ? null : (
        <div>
          <QuestionView
            question={response[questionIndex]}
            correctAns={allAnswers}
            questionIndex={questionIndex}
            setQuestionIndex={setQuestionIndex}
            limit={questionLimit}
          />
        </div>
      )}
    </>
  );
};

export default ApiStarter;
