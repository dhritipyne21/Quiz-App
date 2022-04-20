import React from "react";
import { Link } from "react-router-dom";

const ScorePage = ({ score }) => {
  return (
    <>
      <h5> Your score is : {score}</h5>
      <Link to="/home">Go to Questions</Link>
    </>
  );
};

export default ScorePage;
