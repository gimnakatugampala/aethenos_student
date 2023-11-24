import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'



export const getUserStatus = async() => {
    const CURRENT_USER = JSON.parse(window.localStorage.getItem("aethenos"));
    
    if(CURRENT_USER != null){
        return true
    }else{
        return false
    }



}

export const StudentSignUp = async(fname, lname, email , conpassword) =>{

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

              const user = {
                token:result.token,
                email:"gimna@gmail.com",
                firstname:"Gimna",
                lastname:"Kavishka",
                status:"Student"
              }

              window.localStorage.setItem("aethenos", JSON.stringify(user));

              window.location.href = "/?login=success"

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


export const StudentSignIn = async(email, password) =>{

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

        }else if(result.message == "incorrect password."){

            Swal.fire({
                title: `${result.message}`,
                text: `${result.variable}`,
                icon: 'error',
              })
        }else{

            
            Swal.fire({
                position: "top-end",
                icon: "success",
                title:"Logged In!",
                text: "Successfully LoggedIn",
                showConfirmButton: false,
                timer: 1500
              });

              const user = {
                token:result.token,
                email:result.email,
                firstname:result.fname,
                lastname:result.lname,
                status:"Student"
              }

              window.localStorage.setItem("aethenos", JSON.stringify(user));

              window.location.href = "/?login=success"


        }
    })
    .catch(error => console.log('error', error));

}

export const InstructorSignUp = async(firstname,lastname,email,conpassword) =>{

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

            const user = {
              token:result.token,
              email:"gimna@gmail.com",
              firstname:"Gimna",
              lastname:"Kavishka",
              status:"Instructor"
            }

            window.localStorage.setItem("aethenos", JSON.stringify(user));

            window.location.href = "/?login=success"

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