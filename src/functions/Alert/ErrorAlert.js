import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const ErrorAlert = (title,msg) => {
    Swal.fire({
        title: `${title}`,
        text: `${msg}`,
        icon: "error"
      });
}

export default ErrorAlert