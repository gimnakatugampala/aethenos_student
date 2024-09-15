import React, { useEffect } from 'react'
import { Wrapper } from '../../layout'
import SEO from '../../components/seo'
import CardContainer from '../../contexts/CardContainer'
import { Footer, Header } from '../../layout';
import Table from 'react-bootstrap/Table';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from 'react-bootstrap/Button';
import { GetMyRefunds, GetRefunds, PurchaseHistory, SendRefundReq } from '../../api';
import { useState } from 'react';
import moment from 'moment/moment';
import getSymbolFromCurrency from 'currency-symbol-map';
import Modal from 'react-bootstrap/Modal';
import LargeLoading from '../../functions/Loading/LargeLoading'
import ErrorAlert from '../../functions/Alert/ErrorAlert';



const index = () => {

  const [pHistory, setpHistory] = useState(null)
  const [refunds, setrefunds] = useState(null)
  const [show, setShow] = useState(false);


  const [refundText, setrefundText] = useState("")
  const [selectedTransactionCode, setselectedTransactionCode] = useState("")
  const [selectedAmount, setselectedAmount] = useState("")
  const [selectedItemCode, setselectedItemCode] = useState("")

  const [isReqSubmitted, setisReqSubmitted] = useState(false)
 

  const handleClose = () => {
    setShow(false)
    PurchaseHistory(setpHistory)
    GetMyRefunds(setrefunds)
  };
  const handleShow = (p) => {
    console.log(p)
    setselectedTransactionCode(p.transactionCode)
    setselectedAmount(p.amount)
    setselectedItemCode(p.itemCode)
    setShow(true)
  };

  useEffect(() => {
    PurchaseHistory(setpHistory)
    GetMyRefunds(setrefunds)
  }, [])


  const handleRefundSubmit = () =>{
      if(refundText == ""){
        ErrorAlert("Empty Field","Please Fill Refund Text")
        return
      }

      SendRefundReq(selectedTransactionCode,selectedItemCode,selectedAmount,refundText,setrefundText,setShow,setisReqSubmitted)


  }
  

  return (
    <Wrapper>
    <SEO pageTitle={'Purchase History'} />
    <Header />

    <div className="edu-brand-area brand-area-1 p-5">
            <div className="container-fluid">
                <div className="row">

                <div className='mb-4'>
                <h3 className="title m-0">Purchase History</h3>
                </div>

                <div className="col-md-12">
                <div className="course-details-content">
                    <ul className="nav nav-tabs justify-content-start" id="myTab" role="tablist">

                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="courses-tab" data-bs-toggle="tab" data-bs-target="#courses"
                            type="button" role="tab" aria-controls="courses" aria-selected="true">Courses</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="refunds-tab" data-bs-toggle="tab" data-bs-target="#refunds"
                            type="button" role="tab" aria-controls="refunds" aria-selected="false">Refunds</button>
                        </li>

                     
                       

                    
                    </ul>
                    
                </div>

           
                </div>

                <div className="col-lg-12 p-3">
                    <div className="tab-content" id="myTabContent">

                        <div className="tab-pane fade show active" id="courses" role="tabpanel" aria-labelledby="courses-tab">
                            <div className="course-tab-content">
                                <div className="course-overview">

                            {pHistory != null && <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>Date</th>
                                  <th>Total</th>
                                  <th>Payment type</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>

                                {pHistory.length > 0 ? pHistory.map((p,index) => (
                                <tr key={index}>
                                  <td><ShoppingCartIcon /> {p.courseDetails[0].courseTitle}</td>
                                  <td>{moment(p.createdDate).format('MMM DD,YYYY')}</td>
                                  <td>{getSymbolFromCurrency(p.currency)}{p.amount}</td>
                                  <td>{getSymbolFromCurrency(p.currency)}{p.amount} {p.paymentType}</td>
                                  <td className='d-flex justify-content-center'><Button variant="outline-danger "><a href={`/card-receipt/${p.transActionCode}`}>Receipt</a></Button></td>
                                  
                                </tr>
                                )) : <p> No Purchase History </p>}

                            
                              </tbody>
                            </Table>}     
                                </div>
                            </div>
                        </div>

                        
                        <div className="tab-pane fade" id="refunds" role="tabpanel" aria-labelledby="refunds-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            {refunds != null ? (
                              <Table striped bordered hover>
                                  <thead>
                                      <tr>
                                          <th></th>
                                          <th>Date</th>
                                          <th>Amount</th>
                                          <th>Refunded To</th>
                                          <th>Status</th>
                                          <th></th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {refunds.length > 0 ? (
                                          refunds.map((p, index) => (
                                              <tr key={index}>
                                                  <td>{p.courseTitle}</td>
                                                  <td>{moment(p.date).format('MMM DD,YYYY')}</td>
                                                  <td>{getSymbolFromCurrency(p.currency)}{(p.amount).toUpperCase()}</td>
                                                  <td>{p.refundedTo}</td>
                                                  <td>{p.status}</td>
                                                  <td className='d-flex justify-content-center'>
                                                    {p.refundedTo != "Free Course" && p.status == "Not Started" && (
                                                    <Button onClick={() => handleShow(p)} variant="outline-danger">Request a Refund</Button>
                                                    )}
                                                  </td>
                                              </tr>
                                          ))
                                      ) : (
                                         <LargeLoading />
                                      )}
                                  </tbody>
                              </Table>
                          ) : (
                              <p>No Refunds</p>
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
          <h4 className='text-center'>Thank You</h4>
          <p>You have successfully submitted your refund request. You will receive an email providing more details about your request. You can also check the status of your refund in your <a className="text-danger" href='/purchase-history'><b>Purchase History</b></a>.</p>

          <p>
          Please Note that it may take 5 - 10 business days for the credit to be reflected in your account.
          </p>
          </div>

      ) : (
        <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Refund Reason</label>
        <textarea value={refundText} onChange={(e) => setrefundText(e.target.value)} className="form-control" placeholder='What is the Reason for the Refund ?' rows="3"></textarea>
        <Button onClick={handleRefundSubmit} className='m-2' variant="danger">Submit</Button>
      </div>

      )}

      
          
        </Modal.Body>
      </Modal>
    

    <Footer />
</Wrapper>
  )
}

export default index