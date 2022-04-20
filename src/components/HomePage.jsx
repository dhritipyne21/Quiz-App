import React from "react";
import { Link, useLocation } from "react-router-dom";
import QuestionFilter from "./QuestionFilter";

const HomePage = () => {
  return (
    <div>
      <QuestionFilter />
      {/* <Link to="/questions?type=foo">Foo User</Link> */}
      {/* <Link to="/questions">Go to Questions</Link> */}
    </div>
  );
};

export default HomePage;
