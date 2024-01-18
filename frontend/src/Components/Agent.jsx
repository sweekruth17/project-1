import React, { useState } from "react";
import axios from "axios";
const Agent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log("handlesub=========>");
      let formData = { name, description, phone, email };
      // formData = JSON.stringify(formData);
      const response = await axios.post(
        "http://localhost:3000/agent/api/support-agents",
        formData,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      console.log(response);
      setResult(JSON.stringify(response));
      console.log("Data given from server:", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="container-fluid text-center m-2">
        <h4>Add new agent deatils</h4>
        <div className="row w-50 mx-auto">
          <div className="col bg-primary-subtle  rounded m-2 p-4">
            <div className="  input-group mb-3">
              <span className="input-group-text">Name</span>
              <input
                type="text"
                className="form-control"
                placeholder="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="  input-group mb-3">
              <span className="input-group-text">Email</span>
              <input
                type="text"
                className="form-control"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="  input-group mb-3">
              <span className="input-group-text">Phone</span>
              <input
                type="text"
                className="form-control"
                placeholder="phone number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div className="  input-group mb-3">
              <span className="input-group-text">Description</span>
              <input
                type="text"
                className="form-control"
                placeholder="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </form>
      <p>Result:{result}</p>
    </>
  );
};

export default Agent;
