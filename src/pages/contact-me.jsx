import SEO from '../components/seo';
import { Wrapper } from '../layout';
import ContactMeMain from '../components/contact-me';

const ContactMe = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Contact Me'} />
            <ContactMeMain/>
        </Wrapper>
    )
}

export default ContactMe;