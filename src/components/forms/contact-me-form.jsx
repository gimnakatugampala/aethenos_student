import React , { useState } from 'react';
import emailjs from 'emailjs-com';

const Result = () => {
    return (
        <p className="success-message" style={{color: '#1ab69d', marginTop: '20px', marginBottom: '0', textAlign: 'center'}}>Thanks for your query. We will contact with you soon.</p>
    )
}

const ContactMeForm = () => {
    const [result, setResult] = useState( false );

    const sendEmail = ( e ) => {
        e.preventDefault();
        emailjs
        .sendForm(
            'service_bxh6md3', 
            'template_1g7v07n', 
            e.target, 
            'user_8Lx0gfI1ktOoeEN8DTV10'
        )
        .then( ( result ) => {
            console.log( result.text );
            }, 
            ( error ) => {
                console.log( error.text );
            }
        );
        e.target.reset();
        setResult( true );
    };

    setTimeout(() => {
        setResult( false );
    }, 5000);

    return (
        <form className="rnt-contact-form rwt-dynamic-form" onSubmit={ sendEmail }>
            <div className="row row--10">
                <div className="form-group col-lg-6">
                    <input type="text" name="fullname" placeholder="Your Name*" required />
                </div>
                <div className="form-group col-lg-6">
                    <input type="email" name="email" placeholder="Your Email*" required />
                </div>
                <div className="form-group col-12">
                    <input type="tel" name="phone" placeholder="Phone number" />
                </div>
                <div className="form-group col-12">
                    <textarea name="message" cols="30" rows="6" placeholder="Type your message"></textarea>
                </div>
                <div className="form-group col-12 text-center">
                    <button className="rn-btn edu-btn submit-btn" name="submit" type="submit">
                        Submit Now <i className="icon-4"></i>
                    </button>
                </div>
                { result ? <div className="form-group"><Result /></div>  : null }
            </div>
        </form>
    )
}

export default ContactMeForm;