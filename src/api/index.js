
export const StudentSignUp = async() =>{

    var formdata = new FormData();
    formdata.append("email", "sample39@gmail.com");
    formdata.append("firstName", "sdfghngf");
    formdata.append("lastName", "dfbgnhgf");
    formdata.append("password", "Gd@2001");
    formdata.append("profileImg", fileInput.files[0], "[PROXY]");
    formdata.append("gup_type", "1");
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/register/add", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      
}