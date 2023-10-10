import SEO from '../../components/seo';
import { Wrapper } from '../../layout';
import TeamDetailMain from '../../components/teams/team-details';
import { instructors_data } from '../../data';

const team = instructors_data[0]

const TeamDetail = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Team Details'} />
            <TeamDetailMain team={team} />
        </Wrapper>
    )
}

export default TeamDetail;