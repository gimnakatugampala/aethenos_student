import { useRouter } from 'next/router';
import React from 'react';
import SEO from '../../components/seo';
import { instructors_data } from '../../data';
import { Wrapper } from '../../layout';
import TeamDetailMain from '../../components/teams/team-details';

const DynamicTeamDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const team = instructors_data.find(item => Number(item.id) === Number(id))
    return (
        <Wrapper>
            <SEO pageTitle={'Team Details'} />
            <TeamDetailMain team={team} />
        </Wrapper>
    )
}

export default DynamicTeamDetails;

export async function getStaticPaths() {
    const paths = instructors_data.map((instructor) => {
        return {
            params:{
                id:`${instructor.id}`
            }
        }
    })
    return {
      paths,
      fallback: false,
    }
  }

export async function getStaticProps(context) {
    return {
        props: {}
    }
}