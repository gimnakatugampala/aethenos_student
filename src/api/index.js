import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Cookies from 'js-cookie';
import ErrorAlert from '../functions/Alert/ErrorAlert';
import SuccessAlert from '../functions/Alert/SuccessAlert';
import { useState } from 'react';

export const USERTOKEN = Cookies.get('aethenos') 
export const IMG_HOST = `https://aethenosinstructor.exon.lk:2053/aethenos-assert/`
const CURRENT_USER = Cookies.get('aethenos') 

// Unauthorized
const Unauthorized = (result,rediect_url) =>{

  if(result == 401){
    Cookies.remove('aethenos', { path: '' })
    window.location.href = `/login?sessionTimeout=true&rediect-url=${rediect_url}`
  }
}


export const getUserCountry = async() =>{

  // Remove Cookie
  // Cookies.remove('aethenos_user_origin')

  fetch('https://ipapi.co/json/')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // console.log(data)

    Cookies.set('aethenos_user_origin', JSON.stringify(data), { expires: 7 })

    // console.log(JSON.parse(Cookies.get('aethenos_user_origin')).currency)


  })
  .catch(function(error) {
    console.log("Error fetching IP geolocation:", error);
  });
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
        // console.log(result)

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
        // console.log(result)

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
      // console.log(result)

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
      console.log(result)

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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getSubCategoryByCourseLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getNewCourses/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.message == "Error"){
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getTrendingByCourseLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.message == "Error"){
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getMostPopularCourses/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.message == "Error"){
        setmost_popular_courses([])
        setloading_most_popular_courses(false)
        return
      }
        setmost_popular_courses(result)
        setloading_most_popular_courses(false)
      
    })
    .catch(error => console.log('error', error));

}

export const GetCoursesByCategoryInstructor = async(id,setinstructors,setloading_instructors_list) =>{
  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getPopularInstructors/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      console.log(result)

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

    console.log(resultArray);
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getPopularTopicByLinkName/${id}`, requestOptions)
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getNewCoursesBySubCategory/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.message == "Error"){
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getTrendingBySubCategory/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.message == "Error"){
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getMostPopularCoursesBySubCategory/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.message == "Error"){
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getPopularInstructorsBySubCategory/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      console.log(result)

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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getPopularTopicBySubLinkName/${code}`, requestOptions)
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

export const GetInstructorDetails = async(id,setinstructor_details,setloading) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getInstructorDetails/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      setinstructor_details(result)
      setloading(false)
    })
    .catch(error => console.log('error', error));

}

export const GetCourseDetails = async(id,setcourse) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getCourseByStudent/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      setcourse(result)
    })
    .catch(error => console.log('error', error));

}



export const searchCourses = async (keyword, setCourses) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://aethenosinstructor.exon.lk:2053/aethenos-api/displayCourse/searchCourses/${keyword}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    if (result.message === "Error") {
      console.log("Error");
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
      `https://aethenosinstructor.exon.lk:2053/aethenos-api/displayCourse/searchCourses/${searchKey}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Response:", result);

    if (result.message === "Error") {
      console.log("Error");
      return [];
    }

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};