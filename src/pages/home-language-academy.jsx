import SEO from '../components/seo';
import { Wrapper } from '../layout';
import LanguageAcademy from '../components/homes/home-language-academy';

const HomeLanguageAcademy = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Language Academy'} />
            <LanguageAcademy />
        </Wrapper>
    )
}

export default HomeLanguageAcademy;