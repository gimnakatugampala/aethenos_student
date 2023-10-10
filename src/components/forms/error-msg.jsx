import React from 'react';

const ErrorMsg = ({error}) => {
    return (
        <>
            <p style={{color:'red'}}>{error}</p> 
        </>
    )
}

export default ErrorMsg;