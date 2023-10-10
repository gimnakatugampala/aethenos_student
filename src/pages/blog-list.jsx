import SEO from '../components/seo';
import { Wrapper } from '../layout';
import BlogListMain from '../components/blog-list';

const BlogList = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Blog'} />
            <BlogListMain />
        </Wrapper>
    )
}

export default BlogList;