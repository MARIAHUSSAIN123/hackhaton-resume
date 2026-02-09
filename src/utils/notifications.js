import Swal from 'sweetalert2';

export const notifySuccess = (msg) => {
  Swal.fire({
    title: msg,
    icon: 'success',
    background: '#0a0a0a',
    color: '#00f3ff',
    confirmButtonColor: '#ff6b00',
    timer: 2000,
    showConfirmButton: false,
    iconColor: '#39ff14' // Neon Green icon
  });
};

export const notifyError = (msg) => {
  Swal.fire({
    title: 'Error!',
    text: msg,
    icon: 'error',
    background: '#0a0a0a',
    color: '#ff4d4d',
    confirmButtonColor: '#ff6b00'
  });
};