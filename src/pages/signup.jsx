import SEO from '../components/seo';
import SignUpMain from '../components/sign-up';
import { Wrapper } from '../layout';

export default function Signup() {
    return (
        <Wrapper>
            <SEO pageTitle={'Sign up'} />
            <SignUpMain />
        </Wrapper>
    )
}