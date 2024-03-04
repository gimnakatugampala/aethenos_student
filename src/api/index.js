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
    window.location.href = `/login?rediect-url=${rediect_url}`
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


export const getCurrencyExchangeRate = async (code) => {
  try {
    const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${code}.json`);
    const data = await response.json();

    // Access the dynamic key
    const dynamicKey = Object.keys(data)[1]; // Assuming there's only one dynamic key

    const exchangeRate = data[dynamicKey];
    // console.log(exchangeRate);

    Cookies.set('aethenos_currency', `${exchangeRate}`)

  } catch (error) {
    console.log("Error fetching currency exchange rate:", error);
    return null;
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

              if(rediect_url == "none"){
                router.push(`/?login=success`)
              }else{
                router.push(`/checkout`)

              }



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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getPopularInstructors/${id}`, requestOptions)
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getPopularTopicByLinkName/${id}`, requestOptions)
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getCoursesUsingLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      if(result.message == "Error"){
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getCoursesUsingSubLinkName/${code}`, requestOptions)
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getMostPopularCoursesByTopic/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      if(result.message == "Error"){
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/displayCourse/getBeginnerFavoritesCoursesByTopicLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.message == "Error"){
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
    
    fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getNewCoursesByTopic/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
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


export const GetTopCoursesByTopicName = async(id,settop_course_courses,settop_course_sub_cat_Name,settop_course_sub_cat_link,setloading_top_courses) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/displayCourse/getTopSubCategoryCoursesByTopicLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.message == "Error"){
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getCoursesUsingTopicLinkName/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if(result.message == "Error"){
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/displayCourse/getRelatedTopicsByTopicLinkName/${id}`, requestOptions)
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getPopularTopicBySubLinkName/${code}`, requestOptions)
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getInstructorDetails/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
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
      // console.log(result)
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

    if (result.message === "Error") {
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
    // console.log("API Response:", result);

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

export const GetTopicNameByLinkName = async(id,setTopicName,setCategoryName,setCategoryLinkName,setSubCategoryName,setSubCategoryLinkName,setloading_top_title) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/displayCourse/getTopicCategorySubCategoryByTopic/${id}`, requestOptions)
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
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/displayCourse/getLimitedCountCoursesForHomeByLinkName/business", requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if(result.message == "Error"){
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
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/displayCourse/getLimitedCountCoursesForHomeByLinkName/design", requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if(result.message == "Error"){
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
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/displayCourse/getLimitedCountCoursesForHomeByLinkName/photography-video", requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if(result.message == "Error"){
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
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/displayCourse/getLimitedCountCoursesForHomeByLinkName/development", requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if(result.message == "Error"){
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
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/displayCourse/getLimitedCountCoursesForHomeByLinkName/marketing", requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if(result.message == "Error"){
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
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/displayCourse/getLimitedCountCoursesForHomeByLinkName/it-software", requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if(result.message == "Error"){
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
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/displayCourse/getLimitedCountCoursesForHomeByLinkName/personal-development", requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)

      if(result.message == "Error"){
        setpersonal_development_courses([])
        setloading_personal_development_courses(false)
        return
      }

      setpersonal_development_courses(result)
      setloading_personal_development_courses(false)
    })
    .catch(error => console.log('error', error));

}

export const ValidateCouponOnCart = async(coupon,setcouponError,setCouponErrorText,setTags,setbtnLoading) =>{
  setbtnLoading(true)
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/payment/getCouponValidationByCode/${coupon}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.message == "Error"){
        setCouponErrorText(result.variable)
        setcouponError(true)
        setbtnLoading(false)
        return
      }

      if(result.validation == "This Coupon is Valid"){
        setTags(prevTags => [
          ...prevTags,
          {
              id: result.course_Id,
              text: coupon
          }
      ])
      setbtnLoading(false)
      }
      
    })
    .catch(error => console.log('error', error));

}

export const AccountVefication = async(setshowLogin) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/authentication/getAccountValidation", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)


      if(result.message == "Error"){
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
    "https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getCoursesData",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {     

      if (result.message == "Error") {
        setCourses([]);
        return;
      }

      setCourses(result);
    })
    .catch((error) => console.log("error", error));
};

export const BuyCourseByStudent = async(rawData) =>{

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

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/payment/addToStudentsPurchasedCourses", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)

    if(result.message == "Error"){
      ErrorAlert("Error",result.variable)
      return
    }
    
    if(result.variable == "200"){
      SuccessAlert("Success",result.message)
      
      
      window.localStorage.removeItem('cart_items');


      setTimeout(() => {
          window.location.href = "/my-courses"
      }, 1500);

      return
    }


  })
  .catch(error => console.log('error', error));

}

export const VerfiyCheckoutUser = async() =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/authentication/getAccountValidation", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)


      if(result.message == "Error"){
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
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/payment/getCoursesPurchasedByTheStudent", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      Unauthorized(result.status,"my-courses")

      setCourses(result)
      setloading(false)

    })
    .catch(error => console.log('error', error));

}


export const GetMyCoursesDetails = async(id,setcourse) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/payment/getPurchasedCourseDetailsByItemCode/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      Unauthorized(result.status,`my-courses/${id}`)
      setcourse(result)
    })
    .catch((error) => console.error(error));


}

export const SubmitCourseReview = async(id,msg,rating) =>{


  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
formdata.append("item_code", `${id}`);
formdata.append("comment", `${msg}`);
formdata.append("rating", `${rating}`);

const requestOptions = {
  method: "POST",
  body: formdata,
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/payment/submitReview", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)

    Unauthorized(result.status,`my-courses/${id}`)


    if(result.variable == "200"){
      SuccessAlert("Added",result.message)

      setTimeout(() => {
        window.location.reload()
      }, 1500);

      return
    }

  })
  .catch((error) => console.error(error));


}

export const GetAllAnnoucement = async(courseCode,setannoucements) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/communication/getAnnouncementsByCourseCode/${courseCode}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      Unauthorized(result.status,`my-courses`)
      setannoucements(result)

      if(result.message == "Error"){
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
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/payment/getReviewsByItemCode/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
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
  
  fetch (`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getAllCoursesByInstructorCode/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      // Unauthorized(result.status,my-courses/${id})
      setcourse(result)
    })
    .catch((error) => console.error(error));


}

export const AddQuestion = async(itemCode,question,setShowNewQuestion,setquestion) =>{

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

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/communication/addQuestion", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    Unauthorized(result.status,`my-courses`)

    if(result.variable == "200"){
      SuccessAlert("Success",result.message)
      setShowNewQuestion(false)
      setquestion("")
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

fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/communication/getAllQuestionsByItemCode/${itemCode}`, requestOptions)
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

  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/payment/addRespondToReview", requestOptions)
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

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/instructor/getInstructorProfileDetails", requestOptions)
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
  method: 'PUT',
  body: formdata,
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/studentProfile/updateStudentProfile", requestOptions)
  .then(response => response.json())
  .then(result => {
    Unauthorized(result.status,"profile") 
    console.log(result)
    if(result.variable == "200"){
      SuccessAlert("Success","Instructor Profile Update Successfully")
      setbtn_loading(false)
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
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/chat/getInstructorsToPurchasedCourses", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status,"messages") 
      console.log(result)
      setinstructors(result)
    })
    .catch((error) => console.error(error));

 }


 export const AddSendMessage = async(selectedInstructorCode,messageTextAdd,selectedCourse,setmessageTextAdd,GetAllChatRooms,setchatRooms) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("message", `${messageTextAdd}`);
  formdata.append("courseCode", `${selectedCourse}`);
  formdata.append("toUserCode", `${selectedInstructorCode}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow"
  };

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/chat/sendChat", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)

    Unauthorized(result.status,"messages") 

    if(result.variable == "200"){
      setmessageTextAdd("")
      GetAllChatRooms(setchatRooms)
  
    }
  })
  .catch((error) => console.error(error));

 }


 export const GetAllChatRooms = async(setchatRooms) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/chat/getChatRoomDetailsByStudent", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status,"messages") 
      setchatRooms(result.chatRoomDetails)
      console.log(result)
    })
    .catch((error) => console.error(error));

 }

 export const GetAllChatRoomMessages = async(chatCode,setroomMessages) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/chat/getChatRoomDetailsByStudentUsingChatRoomCode/${chatCode}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status,"messages") 
      console.log(result)
      setroomMessages(result)
    })
    .catch((error) => console.error(error));
  
 }