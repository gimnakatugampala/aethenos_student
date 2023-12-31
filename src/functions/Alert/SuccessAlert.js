import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const SuccessAlert = (title,msg) => {
    Swal.fire({
        title: `${title}`,
        text: `${msg}`,
        icon: "success"
      });
}

export default SuccessAlert