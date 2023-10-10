import SEO from '../components/seo';
import { Wrapper } from '../layout';
import SignInMain from '../components/sign-in';

export default function SignIn() {
    return (
        <Wrapper>
            <SEO pageTitle={'Sign In'} />
            <SignInMain />
        </Wrapper>
    )
}
