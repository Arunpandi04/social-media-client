import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="custom-container">
        <Container fluid>
          <Row>
            <Col
              className="dashboard-content"
              sm={12}
              style={{ backgroundColor: "red" }}
            >
              <Row>
                <Col sm={6}>
                  <h5>hbnbn</h5>
                </Col>
                <Col sm={6}>
                  <h5>hbnbn</h5>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Dashboard;
