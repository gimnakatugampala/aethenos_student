import SEO from '../components/seo';
import { Wrapper } from '../layout';
import HealthCoachContent from '../components/homes/home-health-coach';

const HomeHealthCoach = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Health Coach'} />
            <HealthCoachContent />
        </Wrapper>
    )
}

export default HomeHealthCoach;