import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const ButtonLoadingMedium = () => {
  return (
    <button type="button" className="edu-btn btn-medium p-2">
      <Spinner animation="border" variant="light" />
  </button>
  )
}

export default ButtonLoadingMedium