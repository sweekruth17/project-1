import React, { useState } from "react";

const Ticket = () => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [dateCreated, setDateCreated] = useState(null);
  const [severity, setSeverity] = useState("");
  const [type, setType] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("");
  const [resolvedOn, setResolvedOn] = useState("");

  const onChange = () => {
    const selectedDate = document.getElementById("birthday").value;
    const dateObject = new Date(selectedDate);
    console.log(selectedDate);
    console.log(dateObject);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="container-fluid text-center m-2">
        <h4>Add new Ticket Details</h4>
        <div className="row w-50 mx-auto">
          <div className="col bg-primary-subtle  rounded m-2 p-4">
            <div className="  input-group mb-3">
              <span className="input-group-text">Topic</span>
              <input
                type="text"
                className="form-control"
                placeholder="topic"
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
              />
            </div>
            <div className="  input-group mb-3">
              <span className="input-group-text">Description</span>
              <input
                type="text"
                className="form-control"
                placeholder="description"
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="  input-group mb-3">
              <span className="input-group-text">Date Created</span>
              <input
                id="Date Created"
                type="date"
                className="form-control"
                aria-label="date"
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  setDateCreated(e.target.value);
                }}
              />
            </div>
            <div className="  input-group mb-3">
              <span className="input-group-text">Severity</span>
              <input
                type="text"
                className="form-control"
                placeholder="severity"
                onChange={(e) => {
                  setSeverity(e.target.value);
                }}
              />
            </div>
            <div className="  input-group mb-3">
              <span className="input-group-text">Type</span>
              <input
                type="text"
                className="form-control"
                placeholder="type"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
            </div>
            <div className="  input-group mb-3">
              <span className="input-group-text">Assigned To</span>
              <input
                type="text"
                className="form-control"
                placeholder="Assigned To"
                onChange={(e) => {
                  setAssignedTo(e.target.value);
                }}
              />
            </div>
            <div className="  input-group mb-3">
              <span className="input-group-text">Status</span>

              <select
                className="form-select"
                id="status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="">Select Status</option>

                <option value="New">New</option>

                <option value="Assigned">Assigned</option>

                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div className="  input-group mb-3">
              <span className="input-group-text">Resolved On</span>
              <input
                type="date"
                className="form-control"
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  setResolvedOn(e.target.value);
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Ticket;
