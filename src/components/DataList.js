import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { showList, deleteUser } from "../redux/feature/userDetailsSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

const DataList = () => {
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const [radioBtn, setRadioBtn] = useState("");
  const dispatch = useDispatch();

  const { users, loading, searchData } = useSelector((state) => state.AllUser);
  //   console.log("first", allData);

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
      <div>
        {show && <CustomModal id={id} show={show} setShow={setShow} />}
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="All"
              name="gender"
              type={type}
              id={`inline-${type}-1`}
              checked={radioBtn === ""}
              onChange={(e) => setRadioBtn("")}
            />
            <Form.Check
              inline
              label="Male"
              name="gender"
              type={type}
              id={`inline-${type}-1`}
              value="Male"
              checked={radioBtn === "Male"}
              onChange={(e) => setRadioBtn(e.target.value)}
            />
            <Form.Check
              inline
              label="Female"
              name="gender"
              type={type}
              id={`inline-${type}-2`}
              value="Female"
              checked={radioBtn === "Female"}
              onChange={(e) => setRadioBtn(e.target.value)}
            />
          </div>
        ))}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridGap: "2%",
            marginTop: "2%",
            marginLeft: "2%",
          }}
        >
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

              .map((i, idx) => {
                return (
                  <div key={idx}>
                    <Card style={{ width: "16rem" }}>
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
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default DataList;
