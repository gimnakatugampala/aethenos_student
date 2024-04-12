import React from 'react'
import { useRouter } from 'next/router';
import { Wrapper } from '../../layout'
import SEO from '../../components/seo'
import CardContainer from '../../contexts/CardContainer'
import { Footer, Header } from '../../layout';
import Table from 'react-bootstrap/Table';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from 'react-bootstrap/Button';
import { PurchaseHistory } from '../../api';
import { useState } from 'react';
import moment from 'moment/moment';
import getSymbolFromCurrency from 'currency-symbol-map';


const index = () => {

    const router = useRouter();
    const { id } = router.query;
  return (
    <Wrapper>
    <SEO pageTitle={'Receipt'} />
    <Header />

    <div className="edu-brand-area brand-area-1 p-5 bg-lighten01">
            <div className="container-fluid">
                <div className="row">

                <div className='mb-4'>
                <h3 className="title m-0">Receipt</h3>
                <h6>Receipt - June 11, 2020</h6>
                </div>

                <div className='col-md-4'>
                   <h3 >Aethenos, Inc</h3>
                   <h6 className='m-0'>600 Harrison Street, 3rd Floor</h6>
                   <h6 className='m-0'>San Fransisco, CA 9417809,US</h6>
                   <h6 className='m-0 text-danger'><a href='https://aethenos.com/'>aethenos.com</a></h6>
                </div>

                <div className='col-md-4'></div>

                <div className='col-md-4 align-items-center'>
                <h6 className='m-0'><b>Date:</b>Jun 11, 2020</h6>
                <h6 className='m-0'><b>Order #</b>4859304598</h6>
                </div>

                <div className='col-md-4 my-5'>
                   <h6><b>Sold To:</b> Janaka Dissayake 6, LK</h6>
                </div>

                <div className='col-md-12 my-5'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Item</th>
                        <th>Ordered</th>
                        <th>Coupon Code</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                        <td>Microsoft Excel - Excel from Beiginner to QAdvanced</td>
                        <td>June 11, 2020</td>
                        <td>DY*UUEHD</td>
                        <td>1</td>
                        <td>$21.99</td>
                        <td>$21.99</td>
                        </tr>

                        <tr>
                        <td colSpan={3}></td>
                        <td>Total</td>
                        <td>$21.99</td>
                        <td></td>
                        </tr>

                        <tr>
                        <td colSpan={3}></td>
                        <td>Total Paid</td>
                        <td>$21.99</td>
                        <td></td>
                        </tr>
                       
                      
                    </tbody>
                    </Table>

                </div>



                    </div>
                </div>
            </div>

    <Footer />
</Wrapper>
  )
}

export default index