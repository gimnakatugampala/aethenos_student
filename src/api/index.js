import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Cookies from 'js-cookie';
import ErrorAlert from '../functions/Alert/ErrorAlert';
import SuccessAlert from '../functions/Alert/SuccessAlert';
import { useState } from 'react';
import { ENV_STATUS } from '../functions/env';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';



export const USERTOKEN = Cookies.get('aethenos') 
export const IMG_HOST = `https://aethenos.com:2053/aethenos-assert/`
const BACKEND_LINK = "https://aethenos.com:2053/aethenos-api"

// export const IMG_HOST = `https://aethenosinstructor.exon.lk:2053/aethenos-assert/`
// const BACKEND_LINK = "https://aethenosinstructor.exon.lk:2053/aethenos-api"
const CURRENT_USER = Cookies.get('aethenos') 

// https://aethenosinstructor.exon.lk:2053/


// Unauthorized
const Unauthorized = (result,rediect_url) =>{

  if(result == 401){

    if(ENV_STATUS == "dev"){
      Cookies.remove('aethenos', { path: '' })
    }else{
      Cookies.remove('aethenos', { domain: '.aethenos.com' })
    }

    window.location.href = `/login?rediect-url=${rediect_url}`
  }
}


// Fetch user country and update cookies
export const getUserCountry = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    // Determine domain for cookie handling
    // const cookieOptions = ENV_STATUS === 'dev'
    //   ? {}
    //   : { domain: '.aethenos.com' };

    // Remove existing cookie and set the new one
    // Cookies.remove('aethenos_user_origin', cookieOptions);
    // Cookies.set('aethenos_user_origin', JSON.stringify(data), { expires: 7, ...cookieOptions });
    Cookies.set('aethenos_user_origin', JSON.stringify(data), { expires: 7 });
    return data
  } catch (error) {
    console.error('Error fetching user country:', error);
  }
};

export const getCurrency = async (countryName) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await response.json();

    // console.log(data); // Log the full response for debugging

    if (data && data[0] && data[0].currencies) {
      const currencies = data[0].currencies;

      // Extract the dynamic key
      const currencyCode = Object.keys(currencies)[0]; // Gets the first key, e.g., "GBP"
      const currencyDetails = currencies[currencyCode]; // Access the details using the key

      return currencyCode
    } else {
      console.error('No currencies data found for the country:', countryName);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user country:', error);
    return null;
  }
};


// Fetch currency exchange rate and update cookies
export const getCurrencyExchangeRate = async (code) => {
  try {
    const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`);
    const data = await response.json();

    const exchangeRate = data.usd[code];
    // const cookieOptions = ENV_STATUS === 'dev'
    //   ? {}
    //   : { domain: '.aethenos.com' };

    // // Remove existing cookie and set the new one
    // Cookies.remove('aethenos_currency', cookieOptions);
    // Cookies.set('aethenos_currency', `${exchangeRate}`, cookieOptions);
    console.log(exchangeRate)

    // Remove existing cookie and set the new one
    Cookies.remove('aethenos_currency');
    Cookies.set('aethenos_currency', `${exchangeRate}`);

    return exchangeRate;
  } catch (error) {
    console.error('Error fetching currency exchange rate:', error);
    return null;
  }
};

export const GetStudentProfile = async(setfirst_Name,
  setlast_name,
  setemail,
  setheadline,
  setbiography,
  setwebsite,
  settwitter,
  setfacebook,
  setlinkedin,
  setyoutube,
  setprofile_img) =>{

  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);


var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${BACKEND_LINK}/instructor/getInstructorProfileDetails`, requestOptions)
  .then(response => response.json())
  .then(result => {

    if(result.status == 401){
      // if(ENV_STATUS == "dev"){
      //   Cookies.remove('aethenos')
      // }else{
      //   Cookies.remove('aethenos', { domain: '.aethenos.com' });
    
      // }
    }

    setfirst_Name(result.first_name == null ? "" : result.first_name)
    setlast_name(result.last_name == null ? "" : result.last_name)
    setemail(result.email == null ? "" : result.email)
    setheadline(result.headline == null ? "" : result.headline)
    setbiography(result.biography == null ? "" : result.biography)
    setwebsite(result.website == null ? "" : result.website)
    settwitter(result.twitter == null ? "" : result.twitter)
    setfacebook(result.facebook == null ? "" : result.facebook)
    setlinkedin(result.linkedin == null ? "" : result.linkedin)
    setyoutube(result.youtube == null ? "" : result.youtube)
    setprofile_img(result.profile_img == null ? "" : result.profile_img)
  })
  .catch(error => console.log('error', error));

 }


export const StudentSignUp = async(fname, lname, email , conpassword,setloading,setisShownEmailVerificarion, router) =>{

  const COUNTRY = Cookies.get('aethenos_user_origin')
  let countryToFind = "";

    if (COUNTRY) {
      try {
        const parsedCountry = JSON.parse(COUNTRY);
        countryToFind = parsedCountry.country_name;

        var formdata = new FormData();
          formdata.append("email", `${email}`);
          formdata.append("firstName", `${fname}`);
          formdata.append("lastName", `${lname}`);
          formdata.append("password", `${conpassword}`);
          formdata.append("gup_type", "1");
          formdata.append("countryName", `${countryToFind}`);
       

      } catch (error) {
          console.error("Error parsing COUNTRY:", error);
      }
  }
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BACKEND_LINK}/register/add`, requestOptions)
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
              setisShownEmailVerificarion(true)

              if(ENV_STATUS == "dev"){
                Cookies.remove('aethenos_user_country');
                Cookies.set('aethenos', `${result.token}`, { expires: 7 })
                Cookies.set('aethenos_topic_filled', false)
                Cookies.set('aethenos_user_country', `${countryToFind}`)
                Cookies.set('aethenos_loggedIn_user', `${countryToFind}`)
              }else{
                Cookies.remove('aethenos_user_country', { domain: '.aethenos.com' });
                Cookies.set('aethenos', `${result.token}`, { expires: 7, domain: '.aethenos.com' });
                Cookies.set('aethenos_topic_filled', false, { domain: '.aethenos.com' });
                Cookies.set('aethenos_user_country', `${countryToFind}`, { domain: '.aethenos.com' });
                Cookies.set('aethenos_loggedIn_user', `${countryToFind}`, { domain: '.aethenos.com' });
              }

              

           
              // window.location.href = `/student-interests?token=${result.token}`
              
           
        }else{

            Swal.fire({
                title: 'Login error!',
                text: `${result.message}`,
                icon: 'error',
              })

              setloading(false)
        }

    })
      .catch(error => console.log('error', error));

}

export const VerifyEmail = async(email, VerficationCode,userToken, setloading) =>{

  setloading(true)

  const formdata = new FormData();
  formdata.append("email", `${email}`);
  formdata.append("verificationCode", `${VerficationCode}`);
  
  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };
  
  fetch(`${BACKEND_LINK}/register/checkUserEmailVerificationCode`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)

      if(result.message == "Email verified successfully"){

        setloading(false)

        window.location.href = `/student-interests?token=${userToken}`

      }else{
        setloading(false)
        ErrorAlert("Error",result.message)
      }

    })
    .catch((error) => console.error(error));

}

export const ResendCode = async(email) =>{

  const requestOptions = {
    method: "POST",
    redirect: "follow"
  };
  
  fetch(`${BACKEND_LINK}/register/resendUserEmailVerificationCode/${email}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
    })
    .catch((error) => console.error(error));

}

export const StudentSignIn = async(email, password,setloading,router,rediect_url = "none") =>{

  setloading(true)


    var formdata = new FormData();
    formdata.append("email", `${email}`);
    formdata.append("password", `${password}`);

    var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    fetch(`${BACKEND_LINK}/authentication/student`, requestOptions)
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
                title:"Logged in!",
                text: "Successfully loggedIn",
                showConfirmButton: false,
                timer: 1500
              });

              setloading(false)

              if(ENV_STATUS =="dev"){
                Cookies.remove('aethenos_user_country');
                Cookies.set('aethenos', `${result.token}`, { expires: 7 })
                Cookies.set('aethenos_user_country', `${result.country}`)
                Cookies.set('aethenos_loggedIn_user', `${result.country}`)
                
              }else{
                Cookies.remove('aethenos_user_country', { domain: '.aethenos.com' });
                Cookies.set('aethenos', `${result.token}`, { expires: 7, domain: '.aethenos.com' });
                Cookies.set('aethenos_user_country', `${result.country}`, { domain: '.aethenos.com' });
                Cookies.set('aethenos_loggedIn_user', `${result.country}`, { domain: '.aethenos.com' });

              }

              if(rediect_url == "none"){
                window.location.href = "/?login=success"
              }else{
                // router.push(`/checkout`)
                window.location.href = "/checkout"
              }



        }
    })
    .catch(error => console.log('error', error));

}

export const InstructorSignUp = async(firstname, lastname, email, conpassword, router) => {
  const COUNTRY = Cookies.get('aethenos_user_origin');
  let countryToFind = "";

  if (COUNTRY) {
    try {
      const parsedCountry = JSON.parse(COUNTRY);
      countryToFind = parsedCountry.country_name;

      var formdata = new FormData();
      formdata.append("email", `${email}`);
      formdata.append("firstName", `${firstname}`);
      formdata.append("lastName", `${lastname}`);
      formdata.append("password", `${conpassword}`);
      formdata.append("gup_type", "2");
      formdata.append("countryName", `${countryToFind}`);

    } catch (error) {
      console.error("Error parsing COUNTRY:", error);
    }
  }

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch(`${BACKEND_LINK}/register/add`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if (result.variable == "200") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registered!",
          text: `${result.message}`,
          showConfirmButton: false,
          timer: 1500
        });

        if (ENV_STATUS == "dev") {
          Cookies.remove('aethenos_user_country');

          Cookies.set('aethenos', `${result.token}`, { expires: 7 });
          Cookies.set('aethenos_user_country', `${countryToFind}`);
          Cookies.set('aethenos_loggedIn_user', `${countryToFind}`);
          
        } else {
          Cookies.remove('aethenos_user_country', { domain: '.aethenos.com' });
          Cookies.set('aethenos', `${result.token}`, { expires: 7, domain: '.aethenos.com' });
          Cookies.set('aethenos_user_country', `${countryToFind}`, { domain: '.aethenos.com' });
          Cookies.set('aethenos_loggedIn_user', `${countryToFind}`, { domain: '.aethenos.com' });
        }

        window.location.href = "https://instructor.aethenos.com/courses"
        router.push(`/?login=success`);

      } else {
        Swal.fire({
          title: 'Login error!',
          text: `${result.message}`,
          icon: 'error',
        });
      }

    })
    .catch(error => console.log('error', error));
}


export const SignUpUserViaCart = async(firstname, lastname, email, conpassword, setbtnLoading) => {

  setbtnLoading(true)

  const COUNTRY = Cookies.get('aethenos_user_origin');
  let countryToFind = "";

  if (COUNTRY) {
    try {
      const parsedCountry = JSON.parse(COUNTRY);
      countryToFind = parsedCountry.country_name;

      var formdata = new FormData();
      formdata.append("email", `${email}`);
      formdata.append("firstName", `${firstname}`);
      formdata.append("lastName", `${lastname}`);
      formdata.append("password", `${conpassword}`);
      formdata.append("gup_type", "1");
      formdata.append("countryName", `${countryToFind}`);

    } catch (error) {
      console.error("Error parsing COUNTRY:", error);
    }
  }

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch(`${BACKEND_LINK}/register/add`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if (result.variable == "200") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registered!",
          text: `${result.message}`,
          showConfirmButton: false,
          timer: 1500
        });

        if (ENV_STATUS == "dev") {
          Cookies.remove('aethenos_user_country');

          Cookies.set('aethenos', `${result.token}`, { expires: 7 });
          Cookies.set('aethenos_user_country', `${countryToFind}`);
          Cookies.set('aethenos_loggedIn_user', `${countryToFind}`);
        } else {
          Cookies.remove('aethenos_user_country', { domain: '.aethenos.com' });
          Cookies.set('aethenos', `${result.token}`, { expires: 7, domain: '.aethenos.com' });
          Cookies.set('aethenos_user_country', `${countryToFind}`, { domain: '.aethenos.com' });
          Cookies.set('aethenos_loggedIn_user', `${countryToFind}`, { domain: '.aethenos.com' });
        }

        setbtnLoading(false)

        window.location.reload()
        // router.push(`/?login=success`);

      } else {
        Swal.fire({
          title: 'Login error!',
          text: `${result.message}`,
          icon: 'error',
        });

        setbtnLoading(false)

      }

    })
    .catch(error => console.log('error', error));
}


export const GetCategoriesMenu = async(setnavbar_list) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getAllCategorySubCategoryTopics`, requestOptions)
    .then(response => response.json())
    .then(result => {
      setnavbar_list(result)
      // console.log(result)
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
  
  fetch(`${BACKEND_LINK}/studentProfile/getTopics`, requestOptions)
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

fetch(`${BACKEND_LINK}/studentProfile/setTopics`, requestOptions)
  .then(response => response.json())
  .then(result => {
    Unauthorized(result.status,`/student-interests?token=${CURRENT_USER}`)

    

    if(result.variable =="200"){
      SuccessAlert("Added",result.message)
      setloading(false)

      if(ENV_STATUS == "dev"){
        Cookies.set('aethenos_topic_filled', true)
      }else{
        Cookies.set('aethenos_topic_filled', true, { domain: '.aethenos.com' });
      }

      // router.push(`/?login=success`)
      window.location.href = "/?login=success"
    }

  })
  .catch(error => console.log('error', error));




}

export const Logout = async(setCURRENTUSER) =>{

  if(ENV_STATUS == "dev"){
    Cookies.remove('aethenos')
    Cookies.remove('aethenos_user_country')
    Cookies.remove('aethenos_loggedIn_user')
  }else{
    Cookies.remove('aethenos', { domain: '.aethenos.com' });
    Cookies.remove('aethenos_user_country', { domain: '.aethenos.com' });
    Cookies.remove('aethenos_loggedIn_user', { domain: '.aethenos.com' });

  }

  setCURRENTUSER(Cookies.get('aethenos'))

}

export const GetCourseCategory = async(setcategories) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getCourseCategory`, requestOptions)
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
  
  fetch(`${BACKEND_LINK}/course/getCategorynameBylinkName/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      setCategoryName(result)
      // console.log(result)

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
  
  fetch(`${BACKEND_LINK}/course/getCategoryAndSubCategorynameBylinkName/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      setCategoryName(result.categoryName)
      setSubCategoryName(result.subCategoryName)
      setloading_top_title(false)

    })
    .catch(error => console.log('error', error));

}

export const GetSubCategoriesByCategoryLinkName = async(id,setsub_categories,setloading_sub_categories) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getSubCategoryByCourseLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      setsub_categories(result)
      setloading_sub_categories(false)
    })
    .catch(error => console.log('error', error));

}

export const GetCoursesByCategoryNew = async(setnew_courses,setloading_new_courses,id) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getNewCourses/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.variable == "404"){
        setnew_courses([])
        setloading_new_courses(false)
        return
      }
        setnew_courses(result)
        setloading_new_courses(false)
      
    })
    .catch(error => console.log('error', error));

}

export const GetCoursesByCategoryTrending = async(settrending_courses,setloading_trending_courses,id) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getTrendingByCourseLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.variable == "404"){
        settrending_courses([])
        setloading_trending_courses(false)
        return
      }
        settrending_courses(result)
        setloading_trending_courses(false)
      
    })
    .catch(error => console.log('error', error));

}

export const GetCoursesByCategoryMostPopular = async(setmost_popular_courses,setloading_most_popular_courses,id) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getMostPopularCourses/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.variable == "404"){
        setmost_popular_courses([])
        setloading_most_popular_courses(false)
        return
      }
        setmost_popular_courses(result)
        setloading_most_popular_courses(false)
      
    })
    .catch(error => {
      setloading_most_popular_courses(false)
      setmost_popular_courses([])
      console.log('error', error)});

}

export const GetCoursesByCategoryInstructor = async(id,setinstructors,setloading_instructors_list) =>{
  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getPopularInstructors/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      // console.log(result)

      const itemsPerPage = 6;
      const resultArray = [];

      for (let i = 0; i < result.length; i += itemsPerPage) {
          const singleArray = result.slice(i, i + itemsPerPage).map(item => ({
              title: item.name == null ? "" : item.name,
              description: item.about == null ? "" : item.about,
              rating: item.rating == null ? 0 : item.rating,
              students: item.studentsCount == null ? 0 : item.studentsCount,
              courses: item.coursesCount == null ? 0 : item.coursesCount,
              image: item.profile_img == null ? "/images/course/instructor_profile_img.png" : `${IMG_HOST}/${item.profile_img}`,
              userCode:item.userCode
          }));

          resultArray.push({ single: singleArray });
      }

    // console.log(resultArray);
    setinstructors(resultArray);
    setloading_instructors_list(false)


    })
    .catch(error => console.log('error', error));

}

export const GetCoursesByCategoryTopics = async(id,setpopular_topics,setloading_topics_list) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getPopularTopicByLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      const itemsPerPage = 8;
      const resultArray = [];

      for (let i = 0; i < result.length; i += itemsPerPage) {
          const topicSubset = result.slice(i, i + itemsPerPage);
          resultArray.push({ topics: topicSubset });
      }

      setpopular_topics(resultArray);
      setloading_topics_list(false)

    })
    .catch(error => console.log('error', error));

}

export const GetAllCoursesByCategory = async(id,setallcourses,setloading_all_courses_list) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/managecourse/getCoursesUsingLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      if(result.variable == "404"){
        setallcourses([])
      setloading_all_courses_list(false)
      return
      }

      console.log(result)
      setallcourses(result)
      setloading_all_courses_list(false)
    })
    .catch(error => console.log('error', error));

}

export const GetAllCoursesBySubCategory = async(code,setallcourses,setloading_all_courses_list) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/managecourse/getCoursesUsingSubLinkName/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      setallcourses(result)
      setloading_all_courses_list(false)
    })
    .catch(error => console.log('error', error));

}

export const GetMostPopularCoursesByTopicName = async(id,setmost_popular_courses,setloading_most_popular_courses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getMostPopularCoursesByTopic/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      if(result.variable == "404"){
        setmost_popular_courses([])
        setloading_most_popular_courses(false)
        return
      }

      console.log(result)
      setmost_popular_courses(result)
      setloading_most_popular_courses(false)
    })
    .catch(error => console.log('error', error));

}

export const GetBeginnerCoursesByTopicName = async(id,setbeginners_favs,setloading_beginner_favs) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/displayCourse/getBeginnerFavoritesCoursesByTopicLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.variable == "404"){
        setbeginners_favs([])
        setloading_beginner_favs(false)
        return
      }
      setbeginners_favs(result)
      setloading_beginner_favs(false)

    })
    .catch(error => console.log('error', error));


}

export const GetNewCoursesByTopicName = async(id,setnew_courses,setloading_new_courses) =>{

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${BACKEND_LINK}/course/getNewCoursesByTopic/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if(result.variable == "404"){
          setnew_courses([])
          setloading_new_courses(false)
          return
        }

        setnew_courses(result)
        setloading_new_courses(false)
      })
      .catch(error => console.log('error', error));

}


export const GetTopCoursesByTopicName = async(id,settop_course_courses,settop_course_sub_cat_Name,settop_course_sub_cat_link,setloading_top_courses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/displayCourse/getTopSubCategoryCoursesByTopicLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.variable == "404"){
        settop_course_courses([])
        setloading_top_courses(false)
      }

      settop_course_courses(result.courses)
      settop_course_sub_cat_Name(result.subCategory)
      settop_course_sub_cat_link(result.subCategoryLinkName)
      setloading_top_courses(false)
    })
    .catch(error => console.log('error', error));

}

export const GetAllCoursesByTopicName = async(id,setloading_all_courses_list,setallcourses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/managecourse/getCoursesUsingTopicLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.variable == "404"){
        setallcourses([])
        setloading_all_courses_list(false)
        return
      }
        setallcourses(result)
        setloading_all_courses_list(false)
      
    })
    .catch(error => console.log('error', error));

}

export const GetTopicsByTopicName = async(id,setpopular_topics,setloading_topics_list) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/displayCourse/getRelatedTopicsByTopicLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      const itemsPerPage = 8;
      const resultArray = [];

      for (let i = 0; i < result.length; i += itemsPerPage) {
          const topicSubset = result.slice(i, i + itemsPerPage);
          resultArray.push({ topics: topicSubset });
      }

      setpopular_topics(resultArray);
      setloading_topics_list(false)

    })
    .catch(error => console.log('error', error));

}

export const GetCoursesBySubCategoryNew = async(code,setloading_new_courses,setnew_courses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getNewCoursesBySubCategory/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.variable == "404"){
        setnew_courses([])
        setloading_new_courses(false)
        return
      }
        setnew_courses(result)
        setloading_new_courses(false)
      
    })
    .catch(error => console.log('error', error));

}

export const GetCoursesBySubCategoryTrending = async(code,setloading_trending_courses,settrending_courses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getTrendingBySubCategory/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.variable == "404"){
        settrending_courses([])
        setloading_trending_courses(false)
        return
      }
        settrending_courses(result)
        setloading_trending_courses(false)
      
    })
    .catch(error => console.log('error', error));

}

export const GetCoursesBySubCategoryMostPopular = async(code,setloading_most_popular_courses,setmost_popular_courses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getMostPopularCoursesBySubCategory/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.variable == "404"){
        setmost_popular_courses([])
        setloading_most_popular_courses(false)
        return
      }
        setmost_popular_courses(result)
        setloading_most_popular_courses(false)
      
    })
    .catch(error => console.log('error', error));

}

export const GetCoursesBySubCategoryInstructor = async(code,setinstructors,setloading_instructors_list) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getPopularInstructorsBySubCategory/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      // console.log(result)

      const itemsPerPage = 6;
      const resultArray = [];

      for (let i = 0; i < result.length; i += itemsPerPage) {
          const singleArray = result.slice(i, i + itemsPerPage).map(item => ({
              title: item.name == null ? "" : item.name,
              description: item.about == null ? "" : item.about,
              rating: item.rating == null ? 0 : item.rating,
              students: item.studentsCount == null ? 0 : item.studentsCount,
              courses: item.coursesCount == null ? 0 : item.coursesCount,
              image: item.profile_img == null ? "/images/course/instructor_profile_img.png" : `${IMG_HOST}/${item.profile_img}`,
              userCode:item.userCode
          }));

          resultArray.push({ single: singleArray });
      }

    // console.log(resultArray);
    setinstructors(resultArray);
    setloading_instructors_list(false)


    })
    .catch(error => console.log('error', error));

}

export const GetCoursesBySubCategoryTopics = async(code,setloading_topics_list,setpopular_topics) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getPopularTopicBySubLinkName/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      const itemsPerPage = 8;
      const resultArray = [];

      for (let i = 0; i < result.length; i += itemsPerPage) {
          const topicSubset = result.slice(i, i + itemsPerPage);
          resultArray.push({ topics: topicSubset });
      }

      setpopular_topics(resultArray);
      setloading_topics_list(false)

    })
    .catch(error => console.log('error', error));

}

export const GetInstructorDetails = async(id,setinstructor_details,setloading) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getInstructorDetails/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      setinstructor_details(result)
      setloading(false)
    })
    .catch(error => console.log('error', error));

}


export const GetInstructorDetailsSEO = async(id) =>{
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
  
      const response = await fetch(`${BACKEND_LINK}/course/getInstructorDetails/${id}`, requestOptions);
  
      if (!response.ok) {
        throw new Error(`Error fetching instructor details: ${response.status}`);
      }
  
      const result = await response.json();
      return result; // Ensure we return the fetched data
  
    } catch (error) {
      console.error('Error fetching instructor details:', error);
      return null; // Return null or a default value in case of error
    }

}

export const GetCourseDetails = async(id,setcourse) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/course/getCourseByStudent/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      setcourse(result)
    })
    .catch(error => console.log('error', error));

}


export const GetCourseDetailsSEO = async (id) => {
  try {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const response = await fetch(`${BACKEND_LINK}/course/getCourseByStudent/${id}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Error fetching course details: ${response.status}`);
    }

    const result = await response.json();
    return result; // Ensure we return the fetched data

  } catch (error) {
    console.error('Error fetching course details:', error);
    return null; // Return null or a default value in case of error
  }
};



export const searchCourses = async (keyword, setCourses) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_LINK}/displayCourse/searchCourses/${keyword}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (result.variable == "404") {
      return [];
    }
    setCourses(result);
    
  } catch (error) {
    console.error("Error fetching data:", error);
    setCourses([]);
  }
};

export const getNewCourses = async (searchKey) => {

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_LINK}/displayCourse/searchCourses/${searchKey}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    // console.log("API Response:", result);

    if (result.variable == "404") {
      console.log("Error");
      return [];
    }

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const GetTopicNameByLinkName = async(id,setTopicName,setCategoryName,setCategoryLinkName,setSubCategoryName,setSubCategoryLinkName,setloading_top_title) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/displayCourse/getTopicCategorySubCategoryByTopic/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      setTopicName(result.topic)
      setCategoryName(result.category)
      setCategoryLinkName(result.category_linkName)
      setSubCategoryName(result.subCategory)
      setSubCategoryLinkName(result.subCategory_linkName)
      setloading_top_title(false)
    })
    .catch(error => console.log('error', error));

}

export const GetCourseHomeBusiness = async(setbusiness_courses,setloading_business_courses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/displayCourse/getLimitedCountCoursesForHomeByLinkName/business`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if(result.variable == "404"){
        setbusiness_courses([])
        setloading_business_courses(false)
        return
      }

      setbusiness_courses(result)
      setloading_business_courses(false)
    })
    .catch(error => console.log('error', error));

}

export const GetCourseHomeDesign = async(setdeisgn_courses,setloading_design_courses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/displayCourse/getLimitedCountCoursesForHomeByLinkName/design`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if(result.variable == "404"){
        setdeisgn_courses([])
        setloading_design_courses(false)
        return
      }

      setdeisgn_courses(result)
      setloading_design_courses(false)
    })
    .catch(error => console.log('error', error));

}

export const GetCourseHomePhotography = async(setloading_photography_courses,setphotography_courses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/displayCourse/getLimitedCountCoursesForHomeByLinkName/photography-video`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if(result.variable == "404"){
        setphotography_courses([])
        setloading_photography_courses(false)
        return
      }

      setphotography_courses(result)
      setloading_photography_courses(false)
    })
    .catch(error => console.log('error', error));

}

export const GetCourseHomeDevelopment = async(setdevelopment_courses,setloading_development_courses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/displayCourse/getLimitedCountCoursesForHomeByLinkName/development`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if(result.variable == "404"){
        setdevelopment_courses([])
        setloading_development_courses(false)
        return
      }

      setdevelopment_courses(result)
      setloading_development_courses(false)
    })
    .catch(error => console.log('error', error));

}

export const GetCourseHomeMarketing = async(setmarketing_courses,setloading_marketing_courses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/displayCourse/getLimitedCountCoursesForHomeByLinkName/marketing`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if(result.variable == "404"){
        setmarketing_courses([])
        setloading_marketing_courses(false)
        return
      }

      setmarketing_courses(result)
      setloading_marketing_courses(false)
    })
    .catch(error => console.log('error', error));

}

export const GetCourseHomeITSoftware = async(setit_software_courses,setloading_it_software_courses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/displayCourse/getLimitedCountCoursesForHomeByLinkName/it-software`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.variable == "404"){
        setit_software_courses([])
        setloading_it_software_courses(false)
        return
      }

      setit_software_courses(result)
      setloading_it_software_courses(false)
    })
    .catch(error => console.log('error', error));

}

export const GetCourseHomePersonalDevelopment = async(setpersonal_development_courses,setloading_personal_development_courses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/displayCourse/getLimitedCountCoursesForHomeByLinkName/personal-development`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.variable == "404"){
        setpersonal_development_courses([])
        setloading_personal_development_courses(false)
        return
      }

      setpersonal_development_courses(result)
      setloading_personal_development_courses(false)
    })
    .catch(error => console.log('error', error));

}

export const ValidateCouponOnCart = async(coupon,setcouponError,setCouponErrorText,setTags,cartCourses,setbtnLoading,setcoupon,tags) =>{
  setbtnLoading(true)
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/payment/getCouponValidationByCode/${coupon}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.variable == "404"){
        setCouponErrorText(result.message)
        setcouponError(true)
        setbtnLoading(false)
        return
      }

      if(result.validation == "This coupon has expired"){
            setCouponErrorText(result.validation)
            setcouponError(true)
            setbtnLoading(false)
            setcoupon("")
            return
      }

      
      
      if(result.validation == "This coupon is valid"){

        // Check if the Course Exist in the Cart
        const found = cartCourses.some(item => item.id == result.course_Id);
        if(found){
          console.log("One Found")
          console.log(result)

          // Check Coupon Type
          if(result.couponTypeId == 1){
            console.log("Free Coupon")
          }else{
            console.log("Discounted Coupon")
          }

          setCouponErrorText("")

       
          if(tags.some(tag => tag.id == result.course_Id)){
            setCouponErrorText("Course Already has A Coupon")
            setcouponError(true)
            setbtnLoading(false)
            setcoupon("")
            return
          }

          setTags(prevTags => [
              ...prevTags,
              {
                  id: result.course_Id,
                  text: coupon,
                  couponType:result.couponTypeId,
                  course_prices:result.course_prices,
                  course_Code:result.course_code,
                  global_discount:result.global_discount,
                  global_discount_percentage:result.global_discount_percentage,
                  global_discount_price:result.global_discount_price
              }
          ])

          // Local Storage
          window.localStorage.setItem("coupons", JSON.stringify([...tags,{
            id: result.course_Id,
            text: coupon,
            couponType:result.couponTypeId,
            course_prices:result.course_prices,
            course_Code:result.course_code,
            global_discount:result.global_discount,
            global_discount_percentage:result.global_discount_percentage,
            global_discount_price:result.global_discount_price
        }]))

          setbtnLoading(false)
          setcoupon("")



        }else{
          console.log("Not Found")
          setCouponErrorText("Course Coupon Not Found")
          setcouponError(true)
          setbtnLoading(false)
        }
      }
      
    })
    .catch(error => console.log('error', error));

}


export const ValidateCouponOnCartFromCourseDetails = async (couponCode, router, code) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  try {
    const response = await fetch(`${BACKEND_LINK}/payment/getCouponValidationByCode/${couponCode}`, requestOptions);
    const result = await response.json();
    console.log(result);

    // Redirect if the coupon is not found or expired
    if (result.variable === "404") {
      
      toast.error(`Coupon Not Applied.`, {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: true
      })

      router.push(`/course-details/${code}`);
      return;
    }


    if (result.validation === "This coupon has expired") {

      toast.error(`Coupon has expired.`, {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: true
      })

      router.push(`/course-details/${code}`);
      return;
    }

    // Handle valid coupon
    if (result.validation === "This coupon is valid") {
      const coupons = JSON.parse(window.localStorage.getItem("coupons")) || [];

      // Check if the coupon is already added
      const couponExists = coupons.some((coupon) => coupon.text === couponCode);
      if (!couponExists) {
        coupons.push({
          id: result.course_Id,
          text: couponCode,
          couponType: result.couponTypeId,
          course_prices: result.course_prices,
          course_Code: result.course_code,
          global_discount: result.global_discount,
          global_discount_percentage: result.global_discount_percentage,
          global_discount_price: result.global_discount_price
        });
        window.localStorage.setItem("coupons", JSON.stringify(coupons));

        toast.success(`Coupon Applied`, {
          position: 'top-left',
          autoClose: 3000,
          hideProgressBar: true
      })

      router.push(`/course-details/${code}`);


      } else {
        console.log("Coupon already added.");

        toast.info(`Coupon already added.`, {
          position: 'top-left',
          autoClose: 3000,
          hideProgressBar: true
        })

        router.push(`/course-details/${code}`);


      }
    } else {

      toast.error(`Coupon Not Applied.`, {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: true
      })

      router.push(`/course-details/${code}`);
    }

  } catch (error) {
    console.log('Error:', error);
  }
};



export const AccountVefication = async(setshowLogin) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/authentication/getAccountValidation`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)


      if(result.variable == "404"){
        setshowLogin(true)
        return
      }
      setshowLogin(false)

    })
    .catch(error => console.log('error', error));

}

export const getCourseData = async (setCourses) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/course/getCoursesData`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {     

      if (result.variable == "404") {
        setCourses([]);
        return;
      }

      setCourses(result);
    })
    .catch((error) => console.log("error", error));
};

export const BuyCourseByStudent = async(rawData,router,buyCourseOrder) =>{

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var raw = rawData;

var requestOptions = {
  method: 'POST',
  body: raw,
  headers: myHeaders,
  redirect: 'follow'
};

let timerInterval;
Swal.fire({
  title: "Processing ...",
  timerProgressBar: true,
  allowOutsideClick: false,
  didOpen: () => {
    Swal.showLoading();

    fetch(`${BACKEND_LINK}/payment/addToStudentsPurchasedCourses`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)

    Unauthorized(result.status,"checkout")

    if(result.variable == "404"){
      ErrorAlert("Error",result.message)
      return
    }
    
    if(result.variable == "200"){
      SuccessAlert("Success",result.message)      
      window.localStorage.removeItem('cart_items');
      window.localStorage.removeItem('coupons');

      if(buyCourseOrder.courseType == 4){
        window.localStorage.removeItem('aethenos_referral_codes');
      }


      setTimeout(() => {
          window.location.href = "/my-courses"
          // router.push("/my-courses")
      }, 1500);

      return
    }


  })
  .catch(error => console.log('error', error));

    
  }
})

//  -------------------------



}

export const fetchStripeProcessingFee = async (sessionId) => {
  try {
      const response = await fetch(`/api/stripe_processing_fee?session_id=${sessionId}`);
      if (!response.ok) {
          throw new Error('Failed to fetch payment data');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching payment data:', error);
      return { amount: 0 }; // Default to 0 if there's an error
  }
};


export const VerfiyCheckoutUser = async() =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/authentication/getAccountValidation`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)


      if(result.variable == "404"){
        // setshowLogin(true)
        window.location.href = "/cart"
        return
      }
      // setshowLogin(false)

    })
    .catch(error => console.log('error', error));

}

export const GetMyCourses = async(setCourses,setloading) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/payment/getCoursesPurchasedByTheStudent`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      Unauthorized(result.status,"my-courses")

       // Sort courses by purchaseDate in descending order (latest first)
       const sortedCourses = result && result.length > 0 
       ? result.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)).reverse()
       : [];

      setCourses(sortedCourses);
      setloading(false)

    })
    .catch(error => console.log('error', error));

}

export const GetCoursesOfSignedInUser = async(setcurrentUserCourses, setisLoading) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`${BACKEND_LINK}/payment/getCoursesPurchasedByTheStudent`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      // Unauthorized(result.status,"cart")

      // if(result.status == 401){

      //   if(ENV_STATUS == "dev"){
      //     Cookies.remove('aethenos', { path: '' })
      //   }else{
      //     Cookies.remove('aethenos', { domain: '.aethenos.com' })
      //   }
    
      //   window.location.href = `/cart`
      // }

       // Sort courses by purchaseDate in descending order (latest first)
       const sortedCourses = result && result.length > 0 
       ? result.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)).reverse()
       : [];

       setcurrentUserCourses(sortedCourses);
  
       setisLoading(false)

    })
    .catch(error => console.log('error', error));

}


export const GetMyCoursesDetails = async(id, setcourse) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(`${BACKEND_LINK}/payment/getPurchasedCourseDetailsByItemCode/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `my-courses/${id}`);

      // Sort each section's curriculum items by arrangeNo
      result.course_content.forEach(section => {
        section.section_curriculum_item.sort((a, b) => {
          if (a.arrangeNo === null || a.arrangeNo === undefined) return 1;
          if (b.arrangeNo === null || b.arrangeNo === undefined) return -1;
          return parseInt(a.arrangeNo, 10) - parseInt(b.arrangeNo, 10);
        });
      });

      setcourse(result);
    })
    .catch((error) => console.error(error));
};

export const GetMyCoursesDetailsWithPlugin = async(id, setcourse) => {
  try {
    const token = Cookies.get('aethenos');  // Get the token from cookies
    
    if (!token) {
      throw new Error('Authorization token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${BACKEND_LINK}/payment/getPurchasedCourseDetailsByItemCode/${id}`, requestOptions);
    
    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized access - please check your token.");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    // Sort each section's curriculum items by arrangeNo
    result.course_content.forEach(section => {
      section.section_curriculum_item.sort((a, b) => {
        if (a.arrangeNo === null || a.arrangeNo === undefined) return 1;
        if (b.arrangeNo === null || b.arrangeNo === undefined) return -1;
        return parseInt(a.arrangeNo, 10) - parseInt(b.arrangeNo, 10);
      });
    });

    setcourse(result);

  } catch (error) {
    console.error('Error fetching course details:', error);
  }
};


export const SubmitCourseReview = async (id, msg, rating,setRating, setMsg, setcourse,  setBtnLoading, onSuccess, onError) => {
  setBtnLoading(true);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formData = new FormData();
  formData.append("item_code", `${id}`);
  formData.append("comment", `${msg}`);
  formData.append("rating", `${rating}`);

  const requestOptions = {
      method: "POST",
      body: formData,
      headers: myHeaders,
      redirect: "follow"
  };

  try {
      const response = await fetch(`${BACKEND_LINK}/payment/submitReview`, requestOptions);
      const result = await response.json();
      console.log(result);

      if (result.status === 401) { // Unauthorized
          Unauthorized(result.status, `my-courses/${id}`);
      } else if (result.variable === "200") {
          onSuccess(result.message); // Notify success

          setRating(rating)
          setMsg(msg)

          GetMyCoursesDetails(id, setcourse)

      } else {
          onError("An error occurred, please try again."); // Notify error
      }
  } catch (error) {
      console.error(error);
      onError("An unexpected error occurred.");
  } finally {
      setBtnLoading(false);
  }
};


export const GetAllAnnoucement = async(courseCode,setannoucements) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(`${BACKEND_LINK}/communication/getAnnouncementsByCourseCode/${courseCode}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result)
      Unauthorized(result.status,`my-courses`)
      setannoucements(result)

      if(result.variable == "404"){
        setannoucements([])
      }

    })
    .catch((error) => console.error(error));
 }


export const GetReviews = async(id,setfeatured_reviews) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch(`${BACKEND_LINK}/payment/getReviewsByItemCode/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result)
      Unauthorized(result.status,`my-courses/${id}`)
      setfeatured_reviews(result.sort((a, b) => new Date(b.date) - new Date(a.date)))
    })
    .catch((error) => console.error(error));


}


export const GetCourseDetailsByInstructerCode = async(id,setcourse) =>{

  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", Bearer ${CURRENT_USER});

  const requestOptions = {
    method: "GET",    
    redirect: "follow"
  };
  
  fetch (`${BACKEND_LINK}/course/getAllCoursesByInstructorCode/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      // Unauthorized(result.status,my-courses/${id})
      setcourse(result)
    })
    .catch((error) => console.error(error));


}

export const AddQuestion = async(itemCode,question,setShowNewQuestion,setquestion, setquestions) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
formdata.append("itemCode", `${itemCode}`);
formdata.append("question", `${question}`);

const requestOptions = {
  method: "POST",
  body: formdata,
  headers: myHeaders,
  redirect: "follow"
};

fetch(`${BACKEND_LINK}/communication/addQuestion`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    Unauthorized(result.status,`my-courses`)

    if(result.variable == "200"){
      SuccessAlert("Success",result.message)
      setShowNewQuestion(false)
      setquestion("")

      GetAllQuestion(itemCode, setquestions);

      // setTimeout(() => {
      //   window.location.reload()
      // }, 1500);

      return
    }

  })
  .catch((error) => console.error(error));

}

export const GetAllQuestion = async(itemCode,setquestions) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);



const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`${BACKEND_LINK}/communication/getAllQuestionsByItemCode/${itemCode}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    Unauthorized(result.status,`my-courses`)
    setquestions(result)
  })
  .catch((error) => console.error(error));

}

export const AddReplyToReview = async(comment,reviewCode,setbtnLoading,setcomment) =>{

  setbtnLoading(true)
  

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("reviewCode", `${reviewCode}`);
  formdata.append("comment", `${comment}`);

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(`${BACKEND_LINK}/payment/addRespondToReview`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      Unauthorized(result.status,`performance/reviews`)

      if(result.variable == "200"){
        SuccessAlert("Success",result.message)
        setbtnLoading(false)
        setcomment("")
        return
      }

    })
    .catch((error) => console.error(error));

 }

 
 export const GetStudentProfileDetails = async(setfirst_Name,
  setlast_name,
  setheadline,
  setbiography,
  setwebsite,
  settwitter,
  setfacebook,
  setlinkedin,
  setyoutube,
  setprofile_img) =>{

  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);


var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${BACKEND_LINK}/instructor/getInstructorProfileDetails`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    Unauthorized(result.status,`profile`)
    setfirst_Name(result.first_name == null ? "" : result.first_name)
    setlast_name(result.last_name == null ? "" : result.last_name)
    setheadline(result.headline == null ? "" : result.headline)
    setbiography(result.biography == null ? "" : result.biography)
    setwebsite(result.website == null ? "" : result.website)
    settwitter(result.twitter == null ? "" : result.twitter)
    setfacebook(result.facebook == null ? "" : result.facebook)
    setlinkedin(result.linkedin == null ? "" : result.linkedin)
    setyoutube(result.youtube == null ? "" : result.youtube)
    setprofile_img(result.profile_img == null ? "" : result.profile_img)
  })
  .catch(error => console.log('error', error));

 }

 export const UpdateProfileDetails = async(
  uploadImage,
  first_Name,
  last_name,
  headline,
  biography,
  website,
  twitter,
  facebook,
  linkedin,
  youtube,
  setbtn_loading) =>{

    setbtn_loading(true)

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
formdata.append("headline", `${headline}`);
formdata.append("website", `${website}`);
formdata.append("biography", `${biography}`);
formdata.append("twitter", `${twitter}`);
formdata.append("facebook", `${facebook}`);
formdata.append("linkedin", `${linkedin}`);
formdata.append("youtube", `${youtube}`);
formdata.append("firstName", `${first_Name}`);
formdata.append("lastName", `${last_name}`);
typeof uploadImage == "object" && formdata.append("profileImage", uploadImage);


var requestOptions = {
  method: 'POST',
  body: formdata,
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${BACKEND_LINK}/studentProfile/updateStudentProfile`, requestOptions)
  .then(response => response.json())
  .then(result => {
    Unauthorized(result.status,"profile") 
    console.log(result)
    if(result.variable == "200"){
      SuccessAlert("Success","Instructor profile update successfully")
      setbtn_loading(false)
    }else{
      ErrorAlert("Error",result.message)
    }
  })
  .catch(error => console.log('error', error));

 }


 export const GetAllInstructorsofThePurchaseMsg = async(setinstructors) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch(`${BACKEND_LINK}/chat/getInstructorsToPurchasedCourses`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status,"messages") 
      console.log(result)
      setinstructors(result)
    })
    .catch((error) => console.error(error));

 }


 export const AddSendMessage = async (selectedInstructorCode, messageTextAdd, selectedCourse, setmessageTextAdd, GetAllChatRooms, setchatRooms, setshowAddMessage) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("message", messageTextAdd);
  formdata.append("courseCode", selectedCourse);
  formdata.append("toUserCode", selectedInstructorCode);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow"
  };

  try {
    const response = await fetch(`${BACKEND_LINK}/chat/sendChat`, requestOptions);
    const result = await response.json();

    Unauthorized(result.status, "messages");

    if (result.variable === "200") {
      setmessageTextAdd("");
      await GetAllChatRooms(setchatRooms);  // Ensure GetAllChatRooms is awaited
      setshowAddMessage(false);
    }
  } catch (error) {
    console.error(error);
  }
};



export const GetAllChatRooms = async (setchatRooms) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch(`${BACKEND_LINK}/chat/getChatRoomDetailsByStudent`, requestOptions);
    const result = await response.json();

    Unauthorized(result.status, "messages");
    setchatRooms(result.chatRoomDetails);
  } catch (error) {
    console.error(error);
  }
};


 export const GetAllChatRoomMessages = async(chatCode,setroomMessages) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch(`${BACKEND_LINK}/chat/getChatRoomDetailsByStudentUsingChatRoomCode/${chatCode}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status,"messages") 
      console.log(result)
      setroomMessages(result)
    })
    .catch((error) => console.error(error));
  
 }


 export const UpdateCourseProgress = async(SectionName,itemCode) =>{
  const formdata = new FormData();
formdata.append("itemCode", `${itemCode}`);
formdata.append("sectionName", `${SectionName}`);

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

const requestOptions = {
  method: "PUT",
  body: formdata,
  headers: myHeaders,
  redirect: "follow"
};

fetch(`${BACKEND_LINK}/payment/updateOrderHasCourseProgress`, requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
 }

 export const UpdateCourseCurriculumProgress = async(itemCode,curriculumItemId,setcourse,setIsUpdating) =>{

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

const formdata = new FormData();
formdata.append("itemCode", `${itemCode}`);
formdata.append("curriculumItemId", `${curriculumItemId}`);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

fetch(`${BACKEND_LINK}/payment/addReadCurriculumItem`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)

    if (result.variable === "200") {
      GetMyCoursesDetails(itemCode,setcourse)
      setIsUpdating(false);
    }
  })
  .catch((error) => console.error(error));

 }

 export const PurchaseHistory = async(setpHistory) =>{

  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  fetch(`${BACKEND_LINK}/payment/getPurchaseHistory`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        Unauthorized(result.status,"purchase-history") 


      console.log(result)
      setpHistory(result)
    })
    .catch((error) => console.error(error));
  
 }

 export const TransactionDetails = async(id,setdetails) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch(`${BACKEND_LINK}/payment/getTransactionDetailsByTransActionCode/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {

      Unauthorized(result.status,`card-receipt/${id}`) 

      console.log(result)
      setdetails(result)
    })
    .catch((error) => console.error(error));


 }

 export const GetRefunds = async() =>{

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`${BACKEND_LINK}/payment/getAllRefunds`, requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

 }


 
export const updateNotifications = async(notificationCode) =>{
  
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch(`${BACKEND_LINK}/notification/readNotification/${notificationCode}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {

      console.log(notificationCode)
      console.log(result)
      if(result.variable == "200"){
        console.log(result)
      }else{
        ErrorAlert("Error",result.message)      
        return
      }

    })
    .catch((error) => console.error(error));

}

 export const GetNotifications = async(setnotifications) =>{

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch(`${BACKEND_LINK}/notification/getOwnNotifications`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // Unauthorized(result.status,`notifications`) 
      console.log(result)
      const sortedNotifications = result.sort((a, b) => new Date(b.notificationTime) - new Date(a.notificationTime));
      setnotifications(sortedNotifications);
    })
    .catch((error) => console.error(error));

 }


 export const EnrollByStudent = async(rawData) =>{

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const raw = JSON.stringify(rawData);

var requestOptions = {
  method: 'POST',
  body: raw,
  headers: myHeaders,
  redirect: 'follow'
};

let timerInterval;
Swal.fire({
  title: "Processing ...",
  timerProgressBar: true,
  allowOutsideClick: false,
  didOpen: () => {
    Swal.showLoading();


    fetch(`${BACKEND_LINK}/payment/addToStudentsPurchasedCourses`, requestOptions)
.then(response => response.json())
.then(result => {
  console.log(result)

  Unauthorized(result.status,``) 

  if(result.variable == "404"){
    ErrorAlert("Error",result.message)
    return
  }
  
  if(result.variable == "200"){
    SuccessAlert("Success",result.message)      
    console.log(result)

    setTimeout(() => {
      window.location.href = "/my-courses"
      // router.push("/my-courses")
  }, 1500);

    // return
  }


})
.catch(error => console.log('error', error));


 

    
  }
})

//  -------------------------




}


export const GetReviewsByCode = async(course_code,setfeatured_reviews) =>{


  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch( `${BACKEND_LINK}/payment/getReviewsByCourseCode/${course_code}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
          // console.log(result)
          // Unauthorized(result.status,`my-courses/${id}`)
          setfeatured_reviews(result.sort((a, b) => new Date(b.date) - new Date(a.date)))
        })
    .catch((error) => console.error(error));

}


export const GetMyRefunds = async(setrefunds) =>{

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`${BACKEND_LINK}/payment/getOwnAllRefunds`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    Unauthorized(result.status,`purchase-history`) 
    setrefunds(result)
  })
  .catch((error) => console.error(error));

}

export const SendRefundReq = async(selectedTransactionCode,selectedItemCode,selectedAmount,refundText,setrefundText,setShow,setisReqSubmitted,setisReqLoading) =>{

  setisReqLoading(true)


  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

const formdata = new FormData();
formdata.append("reason", `${refundText}`);
formdata.append("itemCode", `${selectedItemCode}`);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

fetch(`${BACKEND_LINK}/payment/addRefund`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    if(result.variable == "200"){
      // SuccessAlert("Success",result.message)
      setrefundText("")
      setisReqSubmitted(true)
      setisReqLoading(false)

      // setShow(false)
      return
    }else{
      ErrorAlert("Error",result.message)
      setrefundText("")
      setisReqSubmitted(false)
      setisReqLoading(false)

      return
    }


  })
  .catch((error) => console.error(error));

}


// SearchItemsByKeyword.js
let searchCache = {};  // Cache object to store search results

export const SearchItemsByKeyword = async (word, setsearchResults) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // Check if the search term is already cached
  if (searchCache[word]) {
    console.log("Fetching from cache:", word);
    setsearchResults(searchCache[word]);
    return;
  }

  try {
    const response = await fetch(
      `${BACKEND_LINK}/common/searchCourseAndInstructorDetails/${encodeURIComponent(word)}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Fetched from API:", result);

    // Ensure result is in expected format (array) or fallback to empty array
    if (Array.isArray(result)) {
      // Cache the result for the search term
      searchCache[word] = result;
      setsearchResults(result);
    } else {
      console.error("Unexpected API response format:", result);
      setsearchResults([]);
    }
  } catch (error) {
    console.error("Search API error:", error);
    setsearchResults([]);
  }
};

// Optionally, clear the cache periodically or after certain events
export const clearSearchCache = () => {
  searchCache = {};
  console.log("Search cache cleared");
};


export const SendEmailVerficationCode = async(email,setbtnLoading,setshowVerificationInputs) =>{

  setbtnLoading(true)

  const requestOptions = {
    method: "PUT",
    redirect: "follow"
  };
  
  fetch(`${BACKEND_LINK}/studentProfile/forgotPasswords/${email}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {

      console.log(result)
      if(result.variable == "200"){
        console.log(result)
        setshowVerificationInputs(true)
        setbtnLoading(false)

      }else{
        ErrorAlert("Error",result.message)
        setbtnLoading(false)
        return
      }

    })
    .catch((error) => console.error(error));

}

export const VerifyCode = async(VerficationCode,email,setcodeSuccess,setbtnLoading) =>{

  setbtnLoading(true)

  const formdata = new FormData();
formdata.append("verificationCode", `${VerficationCode}`);
formdata.append("email", `${email}`);

const requestOptions = {
  method: "POST",
  body: formdata,
  redirect: "follow"
};

fetch(`${BACKEND_LINK}/studentProfile/verifyVerificationCode`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)

    if(result){
      setcodeSuccess(true)
      setbtnLoading(false)

      return
    }else{
      ErrorAlert("Error","invalid code")
      setbtnLoading(false)
      setcodeSuccess(false)
      return
    }

  })
  .catch((error) => console.error(error));

}

export const ChangeToNewPassword = async(VerficationCode,email,conPassword,setBtnLoading) =>{

  setBtnLoading(true)

  const formdata = new FormData();
  formdata.append("verificationCode", `${VerficationCode}`);
formdata.append("email", `${email}`);
formdata.append("newPassword", `${conPassword}`);
  
  const requestOptions = {
    method: "PUT",
    body: formdata,
    redirect: "follow"
  };
  
  fetch(`${BACKEND_LINK}/studentProfile/updatePassword`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      if(result.variable == "200"){
          SuccessAlert("Success",result.message)

          setTimeout(() => {
            setBtnLoading(false)
              window.location.href = "/login"
          },2500)

          return
      }else{
        ErrorAlert("Error",result.message)
        setBtnLoading(false)
        return
      }
    })
    .catch((error) => console.error(error));

}

export const StoreLastMarkedCurriculum = async(itemCode,curriculumID) =>{

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

const formdata = new FormData();
formdata.append("itemCode", `${itemCode}`);
formdata.append("sectionCurriculumItemId", `${curriculumID}`);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

fetch(`${BACKEND_LINK}/payment/addPreviousView`, requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

}

export const GetLastMarkedCurriculum = async(id,setseletedCurriculumItem, setselectedCurriculumItemDataLastPosition) =>{

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`${BACKEND_LINK}/payment/getPreviousView/${id}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    setseletedCurriculumItem(result.previousSectionCurriculumItemId)
    setselectedCurriculumItemDataLastPosition(result)
  })
  .catch((error) => console.error(error));

}

export const CheckAndSaveRefCode = async (ref, router) => {
  // const myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(`${BACKEND_LINK}/course/checkReferralCodeValidation/${ref}`, requestOptions);
    const result = await response.json();

    if (result.validation) {
      const refData = {
        refCode: ref,
        courseCode: result.courseCode,
      };

      // Retrieve the existing array from local storage, or initialize a new one if it doesn't exist
      let existingData = JSON.parse(localStorage.getItem('aethenos_referral_codes')) || [];

      // Check if courseCode already exists
      const index = existingData.findIndex(item => item.courseCode === result.courseCode);

      if (index !== -1) {
        // Update existing entry
        existingData[index].refCode = ref;
        console.log('Referral code updated:', refData);
      } else {
        // Add new entry
        existingData.push(refData);
        console.log('Referral code saved:', refData);
      }

      // Save the updated array back to local storage
      localStorage.setItem('aethenos_referral_codes', JSON.stringify(existingData));

      router.push(`/course-details/${result.courseCode}`);

      

      // router.push('/');

    } else {
      console.log('Invalid referral code:', result.message);
      // Redirect to home if validation is false
      router.push('/');
    }
  } catch (error) {
    console.error('Error checking referral code:', error);
    // Redirect to home if there's an error
    router.push('/');
  }
};

export const LoginWithToken = async (token, router,rediect_url = "none") => {

  const requestOptions = {
    method: "POST",
    redirect: "follow"
  };
  
  fetch(`${BACKEND_LINK}/authentication/studentLoginWithloginToken/${token}`, requestOptions)
    .then((response) => response.json())
    .then(result => {
      console.log(result)

      if(result.variable == "404"){
        Swal.fire({
          title: `Error`,
          text: `${result.message}`,
          icon: 'error',
        })

        return
      }else{

        Swal.fire({
          position: "top-end",
          icon: "success",
          title:"Logged in!",
          text: "Successfully loggedIn",
          showConfirmButton: false,
          timer: 1500
        });



        if(ENV_STATUS =="dev"){
          Cookies.set('aethenos', `${result.token}`, { expires: 7 })
        }else{
          Cookies.set('aethenos', `${result.token}`, { expires: 7, domain: '.aethenos.com' });

        }

        if(rediect_url == "none"){
          window.location.href = "/?login=success"
        }else{
          router.push(`/checkout`)
        }


      }

   
  })
    .catch((error) => console.error(error));

}

export const VideoStreaming = async (filePath) => {
  // Properly encode the file path and return the complete URL
  let encodedFilePath = encodeURIComponent(filePath);
  return `${BACKEND_LINK}/videoStreming/video?url=${encodedFilePath}`;
};


export const PasswordReset = async (confirmPassword, currentPassword) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("newPassword", `${confirmPassword}`);
  formdata.append("oldPassword", `${currentPassword}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/studentProfile/resetPassword`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, "profile");

      if (result.variable == "200") {
        SuccessAlert("Success", result.message);

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);

        return;
      }

      if (result.variable == "404") {
        ErrorAlert("Error", result.message);
        return;
      }
    })
    .catch((error) => console.error(error));
};


export const DownloadCertificate = async (itemCode) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    // Fetch certificate URL from the backend
    const response = await fetch(`${BACKEND_LINK}/payment/getCertificate/${itemCode}`, requestOptions);
    const result = await response.text();

    // Assuming the result is the path to the PDF
    const filePath = `${IMG_HOST}${result}`;
    const filename = filePath.split("/").pop(); // Extracting filename

    // Fetch the actual file using proxy-based download logic
    const handleDownload = async (filePath, filename) => {
      try {
        const response = await fetch(`/api/proxy?url=${encodeURIComponent(filePath)}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const blob = await response.blob(); // Convert the response to a Blob object
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", filename); // Set the filename for download
        document.body.appendChild(link); // Append link to the DOM
        link.click(); // Trigger download
        document.body.removeChild(link); // Clean up
        window.URL.revokeObjectURL(link.href); // Release object URL
      } catch (error) {
        console.error("Error downloading the file:", error);
      }
    };

    // Call handleDownload to trigger the download
    await handleDownload(filePath, filename);

  } catch (error) {
    console.error("Error downloading the certificate:", error);
  }
};


export const LoginWithTokenForItemCode = async (token) => {
  const requestOptions = {
    method: "POST",
    redirect: "follow"
  };

  try {
    const response = await fetch(`${BACKEND_LINK}/authentication/studentLoginWithloginToken/${token}`, requestOptions);
    const result = await response.json();
    console.log(result);

    if (result.variable == "404") {
      Swal.fire({
        title: `Error`,
        text: `${result.message}`,
        icon: 'error',
      });
      return false;  // Authentication failed
    } else {
      if (ENV_STATUS == "dev") {
        Cookies.set('aethenos', `${result.token}`, { expires: 7 });
   
      } else {
        Cookies.set('aethenos', `${result.token}`, { expires: 7, domain: '.aethenos.com' });
      

      }

      return true;  // Authentication succeeded
    }
  } catch (error) {
    console.error(error);
    return false;  // Authentication failed
  }
};
