import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/feature/userDetailsSlice";
import { useNavigate } from "react-router-dom";
import style from "./Custom.module.css";

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validation, setValidation] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    number: "",
    email: "",
    gender: "",
  });

  const handler = (e) => {
    e.preventDefault();
    if (formData?.name?.trim()) {
      console.log(formData);
      setValidation(false);
      dispatch(createUser(formData));
      navigate("/");
    } else {
      setValidation(true);
    }
  };
  return (
    <>
      <div style={{ display: "grid", placeItems: "center" }}>
        <h1>Create User Data</h1>
        <Form onSubmit={handler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
              placeholder="Enter Name"
            />
            <p
              className={
                validation && !formData?.name.trim()
                  ? style.errorText
                  : style.errorTextHidden
              }
            >
              Please Enter Partner Name
            </p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  age: e.target.value,
                });
              }}
              placeholder="Enter Age"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  number: e.target.value,
                });
              }}
              placeholder="Enter Number"
            />
          </Form.Group>

          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="Male"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
                onChange={() =>
                  setFormData({
                    ...formData,
                    gender: "Male",
                  })
                }
              />
              <Form.Check
                inline
                label="Female"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
                onChange={() =>
                  setFormData({
                    ...formData,
                    gender: "Female",
                  })
                }
              />
            </div>
          ))}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateUser;
