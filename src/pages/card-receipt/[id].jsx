import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Wrapper } from "../../layout";
import SEO from "../../components/seo";
import CardContainer from "../../contexts/CardContainer";
import { Footer, Header } from "../../layout";
import Table from "react-bootstrap/Table";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "react-bootstrap/Button";
import { PurchaseHistory, TransactionDetails } from "../../api";
import { useState } from "react";
import moment from "moment/moment";
import getSymbolFromCurrency from "currency-symbol-map";
import { Triangle } from "react-loader-spinner";
import FormatNumbers from "../../functions/FormatNumbers";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [details, setdetails] = useState(null);

  useEffect(() => {
    if (id != null) {
      TransactionDetails(id, setdetails);
    }
  }, [id]);

  return (
    <Wrapper>
      <SEO pageTitle={"Receipt"} />
      <Header />

      <div className="edu-brand-area brand-area-1 p-2 p-sm-2 p-md-5 ">
        <div className="container-fluid">
          {details != null ? (
            <div className="row col-md-12">
              <div className="col-md-5">
                <div className="mb-4">
                  <h3 className="title m-0">Receipt</h3>
                  <h6>
                    Receipt -{" "}
                    {moment(details.transactionDate).format("MMM DD,YYYY")}
                  </h6>
                </div>

                <div className="">
                  <h3>Aethenos Limited</h3>
                  <h6 className="m-0">4th Floor, Silverstream House,</h6>
                  <h6 className="m-0">45 Fitzroy Street,</h6>
                  <h6 className="m-0">London W1T 6EB,</h6>
                  <h6 className="m-0">United Kingdom</h6>
                  <h6 className="m-0 text-danger">
                    <a href="https://aethenos.com/">aethenos.com</a>
                  </h6>
                </div>

                <div className="my-5">
                  <h6 className="m-0">
                    <b>Date:</b>
                    {moment(details.transactionDate).format("MMM DD,YYYY")}
                  </h6>
                  <h6 className="m-0">
                    <b>Order #</b>
                    {details.transActionCode}
                  </h6>
                  <h6>
                    <b>Sold To:</b>
                    {details.userName}
                  </h6>
                </div>
              </div>

              <div className="col-md-7" style={{overflow: "auto"}}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Ordered date</th>
                      <th>List Price</th>
                      <th>Your Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.orderDetails.orderHasItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.courseTitle}</td>
                        <td>{moment(item.buyDate).format("MMM DD,YYYY")}</td>
                        <td>
                          {getSymbolFromCurrency(item.currency)}
                          {FormatNumbers(item.listPrice)}
                        </td>
                        <td>
                          {getSymbolFromCurrency(item.currency)}
                          {FormatNumbers(item.itemPrice)}
                        </td>
                      </tr>
                    ))}


                     <br />

                    <tr>
                      <td colSpan={2}></td>
                      <td>Subtotal</td>
                      <td>
                        {getSymbolFromCurrency(details.orderDetails.currency)}
                        {FormatNumbers(details.amount)}
                      </td>
                
                    </tr>


                    <tr>
                      <td colSpan={2}></td>
                      <td>Tax rate</td>
                      <td>
                        {details.vatPercentage}
                      </td>
                
                    </tr>

                    <br />

                    <tr>
                      <td colSpan={2}></td>
                      <td>Tax</td>
                      <td>
                        {getSymbolFromCurrency(details.orderDetails.currency)}
                        {details.vat}
                      </td>
                
                    </tr>



                    <tr>
                      <td colSpan={2}></td>
                      <td>Total Paid</td>
                      <td>
                       <b><u>{getSymbolFromCurrency(details.orderDetails.currency)}
                        {FormatNumbers(details.amount)}</u></b>
                      </td>
                  
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <Triangle
                visible={true}
                height="150"
                width="150"
                color="#e01D20"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </Wrapper>
  );
};

export default index;
