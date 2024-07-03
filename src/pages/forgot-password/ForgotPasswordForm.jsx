import React from 'react'
import { useState } from 'react'

const ForgotPasswordForm = () => {

    const [email, setemail] = useState("")

  return (
    <div>
         <form>
            <div className="form-group">
                <label htmlFor="current-log-email">Email *</label>
                <input 
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    type="email" 
                    placeholder="Enter Email" 
                />
            </div>
            
            <div className="form-group">
                <button type="submit" className="edu-btn btn-medium">Next</button>
            </div>


           
        </form>
    </div>
  )
}

export default ForgotPasswordForm