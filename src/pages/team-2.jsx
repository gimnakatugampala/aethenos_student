import SEO from '../components/seo';
import { Wrapper } from '../layout';
import TeamTwoMain from '../components/teams/team-2';

const TeamTwo = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Team Two'} />
            <TeamTwoMain />
        </Wrapper>
    )
}

export default TeamTwo;