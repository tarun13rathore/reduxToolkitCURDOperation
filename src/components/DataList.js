import React, { useEffect, useState } from "react";
import { Card, ListGroup, Button, Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showList, deleteUser } from "../redux/feature/userDetailsSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

const DataList = () => {
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const [radioBtn, setRadioBtn] = useState("");
  const dispatch = useDispatch();

  const { users, loading, searchData } = useSelector((state) => state.AllUser);

  useEffect(() => {
    dispatch(showList());
  }, []);

  if (loading) {
    return (
      <>
        <h2>Loading</h2>
      </>
    );
  }

  return (
    <>
      <div className="">
        {show && <CustomModal id={id} show={show} setShow={setShow} />}
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            {/* Your radio buttons here */}
          </div>
        ))}
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {users &&
            users
              .filter((i) => {
                if (searchData.length === 0) {
                  return i;
                } else {
                  return i.name
                    .toLowerCase()
                    .includes(searchData.toLowerCase());
                }
              })
              .filter((i) => {
                if (radioBtn === "Male") {
                  return i.gender === radioBtn;
                } else if (radioBtn === "Female") {
                  return i.gender === radioBtn;
                } else return i;
              })
              .map((i, idx) => (
                <Col key={idx}>
                  <Card style={{ width: "100%" }}>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>Name : {i?.name}</ListGroup.Item>
                        <ListGroup.Item>Email : {i?.email}</ListGroup.Item>
                      </ListGroup>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="info"
                          onClick={() => {
                            setId(i?.id);
                            setShow(true);
                          }}
                        >
                          View
                        </Button>
                        <Button>
                          <Link
                            style={{ color: "white", textDecoration: "none" }}
                            to={`/edit/${i?.id}`}
                          >
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => dispatch(deleteUser(i?.id))}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
        </Row>
      </div>
    </>
  );
};

export default DataList;
