import React from "react";
import { Link, useLocation } from "react-router-dom";

const HomePage = () => {
    
  return (
    <div>
        <Link to="/questions?type=foo">Foo User</Link>
      <Link to="/questions">Go to Questions</Link>
    </div>
  );
};

export default HomePage;
