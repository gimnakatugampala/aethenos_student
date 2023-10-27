import ProfileView from '../../components/profile/profile-pages/viewprofile';
import SEO from '../../components/seo';
import { Wrapper } from '../../layout';

export default function EditProfile() {
    return (
        <Wrapper>
            <SEO pageTitle={'Profile'} />
            <ProfileView />
        </Wrapper>
    )
}