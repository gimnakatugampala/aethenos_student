import React, { useEffect } from "react";
import { Wrapper } from "../../layout";
import SEO from "../../components/seo";
import { useTheme } from "next-themes";
import CardContainer from "../../contexts/CardContainer";
import { Footer, Header } from "../../layout";
import Table from "react-bootstrap/Table";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "react-bootstrap/Button";
import {
  GetMyRefunds,
  GetRefunds,
  PurchaseHistory,
  SendRefundReq,
} from "../../api";
import { useState } from "react";
import moment from "moment/moment";
import getSymbolFromCurrency from "currency-symbol-map";
import Modal from "react-bootstrap/Modal";
import LargeLoading from "../../functions/Loading/LargeLoading";
import ErrorAlert from "../../functions/Alert/ErrorAlert";
import { Spinner } from "react-bootstrap";

const index = () => {
  const [pHistory, setpHistory] = useState(null);
  const [refunds, setrefunds] = useState(null);
  const [show, setShow] = useState(false);
  const { theme, setTheme } = useTheme();

  const mainfs = {
    color: theme === "dark" ? "#ffffff" : "",
  };

  const [refundText, setrefundText] = useState("");
  const [selectedTransactionCode, setselectedTransactionCode] = useState("");
  const [selectedAmount, setselectedAmount] = useState("");
  const [selectedItemCode, setselectedItemCode] = useState("");

  const [isReqSubmitted, setisReqSubmitted] = useState(false);
  const [isReqLoading, setisReqLoading] = useState(false)

  const handleClose = () => {
    setShow(false);
    PurchaseHistory(setpHistory);
    GetMyRefunds(setrefunds);
  };
  const handleShow = (p) => {
    console.log(p);
    setselectedTransactionCode(p.transactionCode);
    setselectedAmount(p.amount);
    setselectedItemCode(p.itemCode);
    setShow(true);
  };

  useEffect(() => {
    PurchaseHistory(setpHistory);
    GetMyRefunds(setrefunds);
  }, []);

  const handleRefundSubmit = () => {
    if (refundText == "") {
      ErrorAlert("Empty Field", "Please Fill Refund Text");
      return;
    }

    SendRefundReq(
      selectedTransactionCode,
      selectedItemCode,
      selectedAmount,
      refundText,
      setrefundText,
      setShow,
      setisReqSubmitted,
      setisReqLoading
    );
  };

  return (
    <Wrapper>
      <SEO pageTitle={"Purchase History"} />
      <Header />

      <div className="edu-brand-area brand-area-1 p-2 p-sm-2 p-md-5">
        <div className="container-fluid">
          <div className="row">
            <div className="mb-4">
              <h3 className="title m-0">Purchase History</h3>
            </div>

            <div className="col-md-12">
              <div className="course-details-content">
                <ul
                  className="nav nav-tabs justify-content-start"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="courses-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#courses"
                      type="button"
                      role="tab"
                      aria-controls="courses"
                      aria-selected="true"
                    >
                      Courses
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="refunds-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#refunds"
                      type="button"
                      role="tab"
                      aria-controls="refunds"
                      aria-selected="false"
                    >
                      Refunds
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-12 p-3">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="courses"
                  role="tabpanel"
                  aria-labelledby="courses-tab"
                >
                  <div className="course-tab-content">
                    <div className="course-overview" style={{overflow: "auto"}}>
                      {pHistory != null && pHistory.length > 0 ? (
                        <Table striped bordered hover style={{overflow: "auto"}}>
                          <thead>
                            <tr>
                              <th></th>
                              <th style={mainfs}>Date</th>
                              <th style={mainfs}>Total</th>
                              <th style={mainfs}>Payment type</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {pHistory.length > 0 ? (
                              pHistory.map((p, index) => (
                                <tr key={index}>
                                  <td style={mainfs}>
                                    <ShoppingCartIcon />{" "}
                                    {p.courseDetails[0].courseTitle}
                                  </td>
                                  <td style={mainfs}>
                                    {moment(p.createdDate).format(
                                      "MMM DD,YYYY"
                                    )}
                                  </td>
                                  <td style={mainfs}>
                                    {getSymbolFromCurrency(p.currency)}
                                    {p.amount}
                                  </td>
                                  <td style={mainfs}>
                                    {getSymbolFromCurrency(p.currency)}
                                    {p.amount} {p.paymentType}
                                  </td>
                                  <td className="d-flex justify-content-center" style={mainfs}>
                                    <Button
                                      variant="danger"
                                      className="text-white"
                                      onClick={() => {
                                        // Navigate programmatically
                                        window.location.href = `/card-receipt/${p.transActionCode}`;
                                      }}
                                    >
                                      Receipt
                                    </Button>
                                  </td>

                                </tr>
                              ))
                            ) : (
                              <LargeLoading />
                            )}
                          </tbody>
                        </Table>
                      ) : (
                        <p
                          className="d-flex justify-content-center"
                          style={mainfs}
                        >
                          {" "}
                          No Purchase History
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="refunds"
                  role="tabpanel"
                  aria-labelledby="refunds-tab"
                >
                  <div className="course-tab-content">
                  <div className="course-overview" style={{ overflow: "auto" }}>
                      {refunds && refunds.length > 0 ? (
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th style={mainfs}>Course Title</th>
                              <th style={mainfs}>Date</th>
                              <th style={mainfs}>Amount</th>
                              <th style={mainfs}>Refunded through</th>
                              <th style={mainfs}>Status</th>
                              <th style={mainfs}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {refunds.map((p, index) => (
                              <tr key={index}>
                                <td style={mainfs}>{p.courseTitle || "N/A"}</td>
                                <td style={mainfs}>{p.date ? moment(p.date).format("MMM DD, YYYY") : "N/A"}</td>
                                <td style={mainfs}>
                                  {p.currency ? getSymbolFromCurrency(p.currency) : ""}
                                  {p.amount ? p.amount.toUpperCase() : "N/A"}
                                </td>
                                <td style={mainfs}>{p.refundedTo || "N/A"}</td>
                                <td style={mainfs}>{p.status || "N/A"}</td>
                                <td style={mainfs} className="d-flex justify-content-center">
                                  {p.refundedTo !== "Free Course" && p.status === "Not Started" ? (
                                    <Button onClick={() => handleShow(p)} variant="outline-danger">
                                      Request a refund
                                    </Button>
                                  ) : (
                                    "-"
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ) : refunds === null ? (
                        <LargeLoading />
                      ) : (
                        <p className="d-flex justify-content-center" style={mainfs}>
                          No Refunds
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request a Refund</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isReqSubmitted ? (
            <div>
              <h4 className="text-center">Thank You</h4>
              <p>
                You have successfully submitted your refund request. You will
                receive an email providing more details about your request. You
                can also check the status of your refund in your{" "}
                <a className="text-danger" href="/purchase-history">
                  <b>Purchase History</b>
                </a>
                .
              </p>

              <p>
                Please Note that it may take 5 - 10 business days for the credit
                to be reflected in your account.
              </p>
            </div>
          ) : (
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Refund Reason
              </label>
              <textarea
                value={refundText}
                onChange={(e) => setrefundText(e.target.value)}
                className="form-control"
                placeholder="What is the Reason for the Refund ?"
                rows="3"
              ></textarea>

              {isReqLoading ? (
                 <Button
                 className="m-2"
                 variant="danger"
               >
                  <Spinner size="sm" animation="border" role="status">
                 <span className="visually-hidden">Loading...</span>
                 </Spinner>
               </Button>
              ) : (

                <Button
                  onClick={handleRefundSubmit}
                  className="m-2"
                  variant="danger"
                >
                  Submit
                </Button>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Footer />
    </Wrapper>
  );
};

export default index;
