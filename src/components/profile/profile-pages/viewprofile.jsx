import React from 'react';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Footer, Header } from "../../../layout";

const ViewProfile = () => {
  return (
    <>
     <Header no_top_bar={true} />

     <div className='container my-2'>

     <div className='profile-header'>
    <div className="view-profileimg">
            <img className='rounded-circle' width={150} height={150} src="https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg" alt="user" />
          </div>
    </div>

         <div className='row mt-2'>
            <div className='col-md-6'>

            <div className="mb-3">
              <label className="form-label m-0 p-0">First Name</label>
              <h5 className='m-0 p-0'>Gimna</h5>
            </div>

            <div className="mb-3">
              <label className="form-label m-0 p-0">Last Name</label>
              <h5 className='m-0 p-0'>Katugampala</h5>
            </div>

            <div className="mb-3">
              <label className="form-label m-0 p-0">Headline</label>
              <h5 className='m-0 p-0'>Instructor at Udemy</h5>
            </div>

            <div className="mb-3">
              <label className="form-label m-0 p-0">Biography</label>
              <h5 className='m-0 p-0'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus explicabo obcaecati aut porro omnis quas inventore molestias alias. Enim illo blanditiis quam suscipit maiores. Sed iste amet non accusamus autem.</h5>
            </div>


            </div>

            <div className='col-md-6'>

            <div className="mb-3">
              <label className="form-label m-0 p-0"><i className="fas fa-globe"></i> Website</label>
              <h5 className='m-0 p-0'>exon.lk</h5>
            </div>

            <div className="mb-3">
              <label className="form-label m-0 p-0"><i className="fab fa-twitter"></i>Twitter</label>
              <h5 className='m-0 p-0'>@exonlk</h5>
            </div>

            <div className="mb-3">
              <label className="form-label m-0 p-0"><i className="fab fa-facebook"></i> Facebook</label>
              <h5 className='m-0 p-0'>@exonlk</h5>
            </div>

            <div className="mb-3">
              <label className="form-label m-0 p-0"><i className="fab fa-linkedin"></i> LinkedIn</label>
              <h5 className='m-0 p-0'>@exonlk</h5>
            </div>

            <div className="mb-3">
              <label className="form-label m-0 p-0"><i className="fab fa-youtube"></i> Youtube</label>
              <h5 className='m-0 p-0'>@exonlk</h5>
            </div>
          

            </div>
         </div>
   

     </div>

    <Footer />
    </>
  )
}

export default ViewProfile
