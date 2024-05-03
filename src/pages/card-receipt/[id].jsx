import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { Wrapper } from '../../layout'
import SEO from '../../components/seo'
import CardContainer from '../../contexts/CardContainer'
import { Footer, Header } from '../../layout';
import Table from 'react-bootstrap/Table';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from 'react-bootstrap/Button';
import { PurchaseHistory, TransactionDetails } from '../../api';
import { useState } from 'react';
import moment from 'moment/moment';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Triangle } from "react-loader-spinner";


const index = () => {

    const router = useRouter();
    const { id } = router.query;
    const [details, setdetails] = useState(null)


    useEffect(() => {
        if(id != null ){
            TransactionDetails(id,setdetails)
        }
    }, [id])
    

  return (
    <Wrapper>
    <SEO pageTitle={'Receipt'} />
    <Header />

    <div className="edu-brand-area brand-area-1 p-5 bg-lighten01">
            <div className="container-fluid">

                {details != null ? (
                <div className="row">

                <div className='mb-4'>
                <h3 className="title m-0">Receipt</h3>
                <h6>Receipt - {moment(details.transactionDate).format('MMM DD,YYYY')}</h6>
                </div>

                <div className='col-md-4'>
                   <h3 >Aethenos Limited,</h3>
                   <h6 className='m-0'>4th Floor, Silverstream House,</h6>
                   <h6 className='m-0'>45 Fitzroy Street,</h6>
                   <h6 className='m-0'>London W1T 6EB,</h6>
                   <h6 className='m-0'>United Kingdom</h6>
                   <h6 className='m-0 text-danger'><a href='https://aethenos.com/'>aethenos.com</a></h6>
                </div>

                <div className='col-md-4'></div>

                <div className='col-md-4 align-items-center'>
                <h6 className='m-0'><b>Date:</b>{moment(details.transactionDate).format('MMM DD,YYYY')}</h6>
                <h6 className='m-0'><b>Order #</b>{details.transActionCode}</h6>
                </div>

                <div className='col-md-4 my-5'>
                   <h6><b>Sold To:</b>{details.userName}</h6>
                </div>

                <div className='col-md-12 my-5'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Item</th>
                        <th>Ordered</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                        {details.orderDetails.orderHasItems.map((item,index) => (

                        <tr key={index}>
                        <td>{item.courseTitle}</td>
                        <td>{moment(item.buyDate).format('MMM DD,YYYY')}</td>
                        <td>1</td>
                        <td>{getSymbolFromCurrency(item.currency)}{item.itemPrice}</td>
                        <td>{getSymbolFromCurrency(item.currency)}{item.itemPrice}</td>
                        </tr>
                        ))}


                        <tr>
                        <td colSpan={2}></td>
                        <td>Total</td>
                        <td>{getSymbolFromCurrency(details.orderDetails.currency)}{details.orderDetails.total}</td>
                        <td></td>
                        </tr>

                        <tr>
                        <td colSpan={2}></td>
                        <td>VAT</td>
                        <td>{getSymbolFromCurrency(details.orderDetails.currency)}{details.vat}</td>
                        <td></td>
                        </tr>

                        <tr>
                        <td colSpan={2}></td>
                        <td>Total Paid</td>
                        <td>{getSymbolFromCurrency(details.orderDetails.currency)}{details.orderDetails.total}</td>
                        <td></td>
                        </tr>
                       
                      
                    </tbody>
                    </Table>

                </div>



                    </div>
                ) :  <div className="d-flex justify-content-center align-items-center">
                <Triangle
                  visible={true}
                  height="150"
                  width="150"
                  color="#e01D20"
                  ariaLabel="triangle-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>}


                </div>
            </div>

    <Footer />
</Wrapper>
  )
}

export default index