import SEO from '../components/seo';
import { Wrapper } from '../layout';
import PrivacyPolicyMain from '../components/privacy-policy';

export default function PrivacyPolicy() {
    return (
        <Wrapper>
            <SEO pageTitle={'Privacy Policy'} />
            <PrivacyPolicyMain />
        </Wrapper>
    )
}