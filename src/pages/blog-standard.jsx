import SEO from '../components/seo';
import { Wrapper } from '../layout';
import BlogMain from '../components/blog';

const BlogStandard = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Blog Standard'} />
            <BlogMain />
        </Wrapper>
    )
}

export default BlogStandard;