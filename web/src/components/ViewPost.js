import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

import { api } from "../definitions.js";

export const ViewPost = (props) => {
  const [data, setData] = useState([]);
  const [showContentWarning, setShowContentWarning] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`${api}/posts/${props.post}`);
        setData(result.data);
      } catch (e) {
        setData({ post: "<h1>404 Not Found</h1>" });
      }
    };

    fetchData();
  }, [props.post]);

  var cw = "";
  if (props.post === "history" && showContentWarning) {
    cw = <Alert variant="warning" onClose={() => setShowContentWarning(false)} dismissible>
    <p>Content warning: Nudity</p>
  </Alert>;
  }

  return (
    <Container className="qb-textpage">
      {props.userData.isAdmin && (
        <Row>
          <Col>
            <div className="alert alert-info" role="alert">
              You are an admin, so you can{" "}
              <Link to={`/editPost/${props.post}`}>edit this post</Link>.
            </div>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          {data.length === 0 ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div>
              {cw}
              <div dangerouslySetInnerHTML={{ __html: data.post }} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewPost;
