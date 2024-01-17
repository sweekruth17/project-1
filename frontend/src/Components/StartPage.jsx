import React from "react";
import Agent from "./Agent";
import Ticket from "./Ticket";
import { Link } from "react-router-dom";
const StartPage = () => {
  return (
    <>
      <div className="container-fluid text-center bg-primary-subtle  rounded m-2 p-2">
        <h5>Features of this Application</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
          molestiae reiciendis possimus, veniam amet voluptatum reprehenderit
          rem aliquid necessitatibus et? Sunt, eligendi. Exercitationem, quo
          quibusdam! Veniam eveniet maiores expedita accusamus.
        </p>
        <div className="row ">
          <div className="col">
            <h6>To create a new Agent</h6>
            <Link to="/agent" target="_blank">
              <button className="btn btn-primary"> Next</button>
            </Link>
          </div>
          <div className="col">
            <h6>To create a new Ticket</h6>
            <Link to="/ticket" target="_blank">
              <button className="btn btn-primary"> Next</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartPage;
