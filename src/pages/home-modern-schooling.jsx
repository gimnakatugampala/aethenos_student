import SEO from '../components/seo';
import { Wrapper } from '../layout';
import ModernSchooling from '../components/homes/home-modern-schooling';

const HomeModernSchooling = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Modern Schooling'} />
            <ModernSchooling />
        </Wrapper>
    )
}

export default HomeModernSchooling;