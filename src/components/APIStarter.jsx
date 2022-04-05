import React, { useState, useEffect } from "react";
import { BASEURL } from "../apiConstant";
import QuestionView from "./QuestionView";

const APIStarter = () => {
  const [response, setResponse] = useState([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`${BASEURL}?apiKey=${process.env.REACT_APP_API_KEY}&limit=10`)
      .then((response) => response.json())
      .then((json) => setResponse(json))
      .catch((error)=> console.log(error));
    console.log("Sometinhg")
  }, []);

  return (
    // <ul>
    //   {/* {response.map((data)=> { return (<li key = {data.id}>{data.question}</li>)}} */}
    //   {response.map((data) => {
    //     return (
    //       <>
    //         <li key={data.id}>{data.question}</li>
    //         <ul>
    //         {Object.entries(data.answers).forEach(([key,value]) => {
    //             console.log(key+'_'+data.id)
    //             return (<li key={key+'_'+data.id}>
    //                 {value}
    //             </li>)
    //         })}
    //         </ul>
    //         <br></br>
    //       </>
    //     );
    //   })}
    // </ul>
    <>{ response.length==0 ? <div></div>: (<div>
        <QuestionView question ={response[index]} index={index} setIndex={setIndex} limit={10}/>
    </div>)}</>
  );
};

export default APIStarter;
