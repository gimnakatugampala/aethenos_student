import HomeMain from '../components/homes/home';
import SEO from '../components/seo';
import { Wrapper } from '../layout';

export default function Home() {
    return (
        <Wrapper>
            <SEO pageTitle={'Home Main'} />
            <HomeMain />
        </Wrapper>
    )
}