import React from "react";
import { useSelector } from "react-redux";
import style from "./Custom.module.css";
import { Card, ListGroup } from "react-bootstrap";

const CustomModal = ({ id, setShow, show }) => {
  const allUser = useSelector((state) => state.AllUser.users);

  const singleUser = allUser?.filter((ele) => ele.id === id);
  console.log(singleUser);

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modalContainer}>
          <button onClick={() => setShow(false)}>Close</button>
          <Card style={{ width: "16rem" }}>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>Name : {singleUser[0].name}</ListGroup.Item>
                <ListGroup.Item>Email :{singleUser[0].email}</ListGroup.Item>
                <ListGroup.Item>Age : {singleUser[0].age}</ListGroup.Item>
                <ListGroup.Item>Gender :{singleUser[0].gender}</ListGroup.Item>
                <ListGroup.Item>Number : {singleUser[0].number}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
