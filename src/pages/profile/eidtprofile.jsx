import EditProfileView from '../components/profile/profile-pages/editprofile';
import SEO from '../components/seo';
import { Wrapper } from '../layout';

export default function EditProfile() {
    return (
        <Wrapper>
            <SEO pageTitle={'Profile'} />
            <EditProfileView />
        </Wrapper>
    )
}