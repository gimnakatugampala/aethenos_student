import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Cookies from 'js-cookie';
import ErrorAlert from '../functions/Alert/ErrorAlert';
import SuccessAlert from '../functions/Alert/SuccessAlert';
import { useState } from 'react';

export const USERTOKEN = Cookies.get('aethenos') 
const CURRENT_USER = Cookies.get('aethenos') 

// Unauthorized
const Unauthorized = (result,rediect_url) =>{

  if(result == 401){
    Cookies.remove('aethenos', { path: '' })
    window.location.href = `/login?sessionTimeout=true&rediect-url=${rediect_url}`
  }
}



export const StudentSignUp = async(fname, lname, email , conpassword,setloading,router) =>{


    var formdata = new FormData();
    formdata.append("email", `${email}`);
    formdata.append("firstName", `${fname}`);
    formdata.append("lastName", `${lname}`);
    formdata.append("password", `${conpassword}`);
    formdata.append("gup_type", "1");
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/register/add", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)

        if(result.variable == "200"){

            Swal.fire({
                position: "top-end",
                icon: "success",
                title:"Registered!",
                text: `${result.message}`,
                showConfirmButton: false,
                timer: 1500
              });

              setloading(false)

              Cookies.set('aethenos', `${result.token}`, { expires: 7 })
              Cookies.set('aethenos_topic_filled', false)

              router.push(`/student-interests?token=${result.token}`)
              // window.location.href = `/student-interests?token=${result.token}`
              
           
        }else{

            Swal.fire({
                title: 'Login Error!',
                text: `${result.message}`,
                icon: 'error',
              })

              setloading(false)
        }

    })
      .catch(error => console.log('error', error));

}


export const StudentSignIn = async(email, password,setloading,router) =>{

  setloading(true)


    var formdata = new FormData();
    formdata.append("email", `${email}`);
    formdata.append("password", `${password}`);

    var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    fetch("https://aethenosadmin.exon.lk:2053/aethenos-api/authentication/student", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)

        if(result.message == "User not found"){

            Swal.fire({
                title: `${result.message}`,
                text: `${result.variable}`,
                icon: 'error',
              })

              setloading(false)

        }else if(result.message == "incorrect password."){

            Swal.fire({
                title: `${result.message}`,
                text: `${result.variable}`,
                icon: 'error',
              })

              setloading(false)
        }else{

            
            Swal.fire({
                position: "top-end",
                icon: "success",
                title:"Logged In!",
                text: "Successfully LoggedIn",
                showConfirmButton: false,
                timer: 1500
              });

              setloading(false)


              Cookies.set('aethenos', `${result.token}`, { expires: 7 })

              // window.location.href = "/?login=success"

              router.push(`/?login=success`)


        }
    })
    .catch(error => console.log('error', error));

}

export const InstructorSignUp = async(firstname,lastname,email,conpassword,router) =>{



  var formdata = new FormData();
  formdata.append("email", `${email}`);
  formdata.append("firstName", `${firstname}`);
  formdata.append("lastName", `${lastname}`);
  formdata.append("password", `${conpassword}`);
  formdata.append("gup_type", "2");
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/register/add", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.variable == "200"){

          Swal.fire({
              position: "top-end",
              icon: "success",
              title:"Registered!",
              text: `${result.message}`,
              showConfirmButton: false,
              timer: 1500
            });

            Cookies.set('aethenos', `${result.token}`, { expires: 7 })

            // window.location.href = "/?login=success"

            router.push(`/?login=success`)

      }else{

          Swal.fire({
              title: 'Login Error!',
              text: `${result.message}`,
              icon: 'error',
            })
      }

  })
    .catch(error => console.log('error', error));
}

export const GetCategoriesMenu = async(setnavbar_list) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getAllCategorySubCategoryTopics", requestOptions)
    .then(response => response.json())
    .then(result => {
      setnavbar_list(result)
      console.log(result)
    })
    .catch(error => console.log('error', error));

}

export const InstructorVerify = async() =>{
  const CURRENT_USER = JSON.parse(window.localStorage.getItem("aethenos"));
    
    if(CURRENT_USER != null){

      if(CURRENT_USER.status == "Instructor"){

        return true

      }else if(CURRENT_USER.status == "Student"){
        return false
      }

      // console.log(CURRENT_USER.status)
        
    }else{

      return false
    }

}

export const GetStudentTopics = async(setSuggestions,setFilteredSuggestions) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/studentProfile/getTopics", requestOptions)
    .then(response => response.json())
    .then(result => {
      
      Unauthorized(result.status,`/student-interests?token=${CURRENT_USER}`)

      if(result.message == "Error"){
        ErrorAlert(result.message,result.variable)
        return
      }

      setSuggestions(result)
      setFilteredSuggestions(result)

    })
    .catch(error => console.log('error', error));
}

export const AddStudentTopic = async(selectedSuggestions,setloading,router) =>{

  
  setloading(true)

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
 formdata.append("topic", `${selectedSuggestions[0].id},${selectedSuggestions[1].id},${selectedSuggestions[2].id},${selectedSuggestions[3].id},${selectedSuggestions[4].id}`);

var requestOptions = {
  method: 'POST',
  body: formdata,
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/studentProfile/setTopics", requestOptions)
  .then(response => response.json())
  .then(result => {
    Unauthorized(result.status,`/student-interests?token=${CURRENT_USER}`)

    

    if(result.variable =="200"){
      SuccessAlert("Added",result.message)
      setloading(false)
      Cookies.set('aethenos_topic_filled', true)
      router.push(`/?login=success`)
    }

  })
  .catch(error => console.log('error', error));




}

export const Logout = async(setCURRENTUSER) =>{
  Cookies.remove('aethenos')
  setCURRENTUSER(Cookies.get('aethenos'))

}

export const GetCourseCategory = async(setcategories) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getCourseCategory", requestOptions)
    .then(response => response.json())
    .then(result => {
      setcategories(result.map((item) => ({
        link: `/courses/${item.linkName}/`,
        title: item.name
      })))
    })
    .catch(error => console.log('error', error));

}

export const GetCourseCategoryTitle = async(setCategoryName,id,setloading_top_title) =>{
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getCategorynameBylinkName/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      setCategoryName(result)
      // console.log(result.message)

      setTimeout(() => {
        
        setloading_top_title(false)
      }, 1500);

    })
    .catch(error => console.log('error', error));
}

export const GetCourseSubCategoryTitle = async(code,setCategoryName,setSubCategoryName,setloading_top_title) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getCategoryAndSubCategorynameBylinkName/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      setCategoryName(result.categoryName)
      setSubCategoryName(result.subCategoryName)
      setloading_top_title(false)

    })
    .catch(error => console.log('error', error));

}