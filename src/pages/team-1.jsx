import SEO from '../components/seo';
import { Wrapper } from '../layout';
import TeamOneMain from '../components/teams/team-1';

const TeamOne = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Team One'} />
            <TeamOneMain />
        </Wrapper>
    )
}

export default TeamOne;