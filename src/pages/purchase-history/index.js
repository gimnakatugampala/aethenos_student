import React, { useEffect } from 'react'
import { Wrapper } from '../../layout'
import SEO from '../../components/seo'
import CardContainer from '../../contexts/CardContainer'
import { Footer, Header } from '../../layout';
import Table from 'react-bootstrap/Table';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from 'react-bootstrap/Button';
import { GetRefunds, PurchaseHistory } from '../../api';
import { useState } from 'react';
import moment from 'moment/moment';
import getSymbolFromCurrency from 'currency-symbol-map';
import Modal from 'react-bootstrap/Modal';




const index = () => {

  const [pHistory, setpHistory] = useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [transactionCode, settransactionCode] = useState("")
  const [refundReason, setrefundReason] = useState("")
  const [refundAmount, setrefundAmount] = useState(0)

  useEffect(() => {
    PurchaseHistory(setpHistory)
    GetRefunds()
  }, [])
  

  return (
    <Wrapper>
    <SEO pageTitle={'Purchase History'} />
    <Header />

    <div className="edu-brand-area brand-area-1 p-5 bg-lighten01">
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
                                  <td><ShoppingCartIcon /> {p.courseTitles[0]}</td>
                                  <td>{moment(p.createdDate).format('MMM DD,YYYY')}</td>
                                  <td>{getSymbolFromCurrency(p.currency)}{p.amount}</td>
                                  <td>{getSymbolFromCurrency(p.currency)}{p.amount} {p.paymentType}</td>
                                  <td><Button variant="outline-danger"><a href={`/card-receipt/${p.transActionCode}`}>Receipt</a></Button></td>
                                  
                                </tr>
                                )) : "No Purchase History"}

                            
                              </tbody>
                            </Table>}     
                                </div>
                            </div>
                        </div>

                        
                        <div className="tab-pane fade" id="refunds" role="tabpanel" aria-labelledby="refunds-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

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
                              <tr>
                                <td>Microsoft - Excel Beginner To Advanced</td>
                                <td>Jun 11, 2020</td>
                                <td>@21.99</td>
                                <td>Stipe</td>
                                <td>No Started</td>
                                <td><Button onClick={handleShow} variant="outline-danger">Ask Refund</Button></td>
                              </tr>
                            </tbody>
                          </Table>

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
          <Modal.Title>Ask Refund</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">Reason</label>
        <textarea className="form-control" placeholder='What is the Reason for the Refund ?' rows="3"></textarea>
        <Button className='m-2' variant="danger">Submit</Button>
      </div>
          
        </Modal.Body>
      </Modal>
    

    <Footer />
</Wrapper>
  )
}

export default index