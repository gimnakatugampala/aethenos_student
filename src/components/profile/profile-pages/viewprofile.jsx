import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from '@mui/material/Button';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from 'react-bootstrap/Spinner';
import { Footer, Header } from "../../../layout";
import { GetStudentProfileDetails, IMG_HOST, UpdateProfileDetails } from '../../../api';

const ViewProfile = () => {

  const [first_Name, setfirst_Name] = useState("")
  const [last_name, setlast_name] = useState("")
  const [headline, setheadline] = useState("")
  const [biography, setbiography] = useState("")
  const [website, setwebsite] = useState("")
  const [twitter, settwitter] = useState("")
  const [facebook, setfacebook] = useState("")
  const [linkedin, setlinkedin] = useState("")
  const [youtube, setyoutube] = useState("")
  const [profile_img, setprofile_img] = useState("")
  const [uploadImage, setuploadImage] = useState("")

  const [btn_loading, setbtn_loading] = useState(false)

  useEffect(() => {
      GetStudentProfileDetails(setfirst_Name,
          setlast_name,
          setheadline,
          setbiography,
          setwebsite,
          settwitter,
          setfacebook,
          setlinkedin,
          setyoutube,
          setprofile_img)
  }, [])
  
  // Save Profile Data
  const handleProfileData = () =>{
      console.log(typeof uploadImage)
      console.log(first_Name)
      console.log(last_name)
      console.log(headline)
      console.log(biography)
      console.log(website)
      console.log(twitter)
      console.log(facebook)
      console.log(linkedin)
      console.log(youtube)

      if(first_Name == ""){
          ErrorAlert("Error","Please Enter First Name")
          return
      }else if(last_name == ""){
          ErrorAlert("Error","Please Enter Last Name")
          return
      }

      UpdateProfileDetails(uploadImage,
          first_Name,
          last_name,
          headline,
          biography,
          website,
          twitter,
          facebook,
          linkedin,
          youtube,
          setbtn_loading)

  }

  // Image Upload
  const handleImageUpload = (event) =>{
      const input =  event.target;
     setuploadImage(input.files[0])

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        console.log(e.target.result)
        setprofile_img(e.target.result)
      };

      reader.readAsDataURL(input.files[0]);
    }
  }



  return (
    <>
     <Header no_top_bar={true} />

     <div className='container mb-5'>
        <h3>Profile & settings</h3>

        <Tabs
        defaultActiveKey="up"
        id="uncontrolled-tab-example"
        className="my-3"
        >
      <Tab eventKey="up" title="Udemy Profile">

        <div className='row'>
            <div className='col-md-6'>

            <div class="mb-3">
                <label class="form-label">First Name</label>
                <input value={first_Name} onChange={(e) => setfirst_Name(e.target.value)} type="text" class="form-control" placeholder="First Name" />
            </div>

            <div class="mb-3">
                <label class="form-label">Last Name</label>
                <input value={last_name} onChange={(e) => setlast_name(e.target.value)} type="text" class="form-control" placeholder="Last Name" />
            </div>

            <label class="form-label">Headline</label>
            <div class="input-group mb-3">
                <input maxLength={60} value={headline} onChange={(e) => setheadline(e.target.value)} type="text" class="form-control" placeholder="Instructor at Udemy" />
                <span class="input-group-text" >{60 - headline.length}</span>
            </div>

            <div class="mb-3">
                <label  class="form-label">Biography</label>
                <textarea value={biography} onChange={(e) => setbiography(e.target.value)} class="form-control"  rows="3"></textarea>
            </div>

            </div>


            <div className='col-md-6'>

            <div class="mb-3">
                <label class="form-label">Website</label>
                <input value={website} onChange={(e) => setwebsite(e.target.value)} type="text" class="form-control" placeholder="URL" />
            </div>

            <label class="form-label">Twitter</label>
                <div class="input-group mb-3">
                <span class="input-group-text" >http://www.twitter.com/</span>
                <input value={twitter} onChange={(e) => settwitter(e.target.value)} type="text" class="form-control"  />
            </div>

            <label class="form-label">Facebook</label>
                <div class="input-group mb-3">
                <span class="input-group-text" >http://www.facebook.com/</span>
                <input value={facebook} onChange={(e) => setfacebook(e.target.value)} type="text" class="form-control"  />
            </div>

            <label class="form-label">LinkedIn</label>
                <div class="input-group mb-3">
                <span class="input-group-text" >http://www.linkedin.com/</span>
                <input value={linkedin} onChange={(e) => setlinkedin(e.target.value)} type="text" class="form-control"  />
            </div>

            <label class="form-label">Youtube</label>
                <div class="input-group mb-3">
                <span class="input-group-text" >http://www.youtube.com/</span>
                <input value={youtube} onChange={(e) => setyoutube(e.target.value)} type="text" class="form-control"  />
            </div>

            </div>
        </div>

        {btn_loading ? <Button  variant="contained"><Spinner size="sm" animation="border" variant="light" /></Button> : <Button  onClick={handleProfileData} variant="contained">Save</Button>}

        

        
    
        

      </Tab>

      
      <Tab eventKey="profile" title="Profile Picture">

        <div className='row'>
            <div className='col-md-6'>

            <p className='m-0 p-0'><b>Image preview</b></p>
            <label>Minimum 200x200 pixels, Maximum 6000x6000 pixels</label>

            <div className='my-4 bg-light border p-3 text-center'>
               {profile_img == "" && uploadImage == "" ? <img src='https://img-c.udemycdn.com/user/200_H/anonymous_3.png' /> : uploadImage != "" ?  <img style={{height:'300px'}} id='previewImage' src={`${profile_img}`} /> : <img style={{height:'300px'}} id='previewImage' src={`${IMG_HOST}${profile_img}`} /> } 
            </div>

            <div class="mb-3">
                <label for="formFile" class="form-label">Upload Image</label>
                <input onChange={(e) => handleImageUpload(e)} accept='image/*' class="form-control" type="file" id="formFile" />
            </div>

            </div>

        </div>

        {btn_loading ? <Button  variant="contained"><Spinner size="sm" animation="border" variant="light" /></Button> : <Button  onClick={handleProfileData} variant="contained">Save</Button>}
     


      </Tab>

    </Tabs>

    </div>

    <Footer />
    </>
  )
}

export default ViewProfile
