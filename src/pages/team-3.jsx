import SEO from '../components/seo';
import { Wrapper } from '../layout';
import TeamThreeMain from '../components/teams/team-3';

const TeamThree = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Team Three'} />
            <TeamThreeMain />
        </Wrapper>
    )
}

export default TeamThree;