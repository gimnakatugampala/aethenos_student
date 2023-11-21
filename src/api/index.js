import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

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

        if(result.variable == "00"){

            Swal.fire({
                position: "top-end",
                icon: "success",
                title:"Registered!",
                text: "Successfully Registered",
                showConfirmButton: false,
                timer: 1500
              });

        }
    })
      .catch(error => console.log('error', error));

}