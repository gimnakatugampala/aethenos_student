import React from 'react';
import GetCurrencyByCountry from './GetCurrencyByCountry';
import { EnrollByStudent, USERTOKEN } from '../../api';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import HandleCountry from './HandleCountry';


const HandleFreeCourses = (course) => {



  // check if the user is logged in
  if (USERTOKEN) {
    var rawData = {
      paymentMethod: '3',
      discount: 0,
      totalPrice: 0,
      currency: GetCurrencyByCountry(course),
      country: HandleCountry(),
      courseType: 2,
      courses: [
        {
          courseCode: `${course.course_code}`,
          itemPrice: 0,
          currency: GetCurrencyByCountry(course),
        },
      ],
    };

    console.log(GetCurrencyByCountry(course));
    console.log(course);
    console.log(rawData);

    EnrollByStudent(rawData);
  } else {
    // show alert if not logged in
    Swal.fire({
      title: 'You need to log in!',
      text: 'Please log in to enroll in this course.',
      icon: 'warning',
      confirmButtonText: 'Log In',
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to /login when "OK" is clicked
        window.location.href ='/login'
      }
    });
  }
};

export default HandleFreeCourses;
