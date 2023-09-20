import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/feature/userDetailsSlice";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const { id } = useParams();
  const { users, loading } = useSelector((state) => state.AllUser);

  useEffect(() => {
    if (id) {
      const singleUser = users?.filter((ele) => ele.id === id);
      setFormData(singleUser[0]);
    }
  }, []);

  console.log(formData);

  const handler = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(updateUser(formData));
    navigate("/");
  };
  return (
    <>
      <div style={{ display: "grid", placeItems: "center" }}>
        <h1>Edit User Data</h1>
        <Form onSubmit={handler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={formData && formData?.name}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
              placeholder="Enter Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              value={formData && formData?.age}
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
              value={formData && formData?.email}
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
              value={formData && formData?.number}
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
                value="Male"
                checked={formData && formData?.gender === "Male"}
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
                value="Female"
                checked={formData && formData?.gender === "Female"}
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

export default UpdateUser;
