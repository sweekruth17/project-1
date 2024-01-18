import React from "react";
import Agent from "./Agent";
import Ticket from "./Ticket";
import { Link } from "react-router-dom";
const StartPage = () => {
  return (
    <>
      <div className="container-fluid text-center bg-primary-subtle  rounded m-2 p-2">
        <h5>Features of this Application</h5>
        <p className="w-50 mx-auto text-start">
          <ul>
            <li>Create a new support agent with the specified attributes.</li>
            <li>Create a new support ticket with the specified attributes.</li>
            <li>API end points provided by the backend systema are:</li>
            <ul>
              <li>POST /api/support-agents</li>
              <li>POST /api/support-tickets</li>
              <li>GET /api/support-tickets</li>
            </ul>
            <li>
              Implemented round-robin assignment logic to assign a ticket to the
              next support agent. Change the status to Assigned when an agent is
              assigned
            </li>
          </ul>
        </p>
        <div className="row w-50 mx-auto">
          <div className="col">
            <h6>To create a new Agent</h6>
            <Link to="/agent" target="_blank">
              <button className="btn btn-primary"> Create</button>
            </Link>
          </div>
          <div className="col">
            <h6>To create a new Ticket</h6>
            <Link to="/ticket" target="_blank">
              <button className="btn btn-primary"> Create</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartPage;
