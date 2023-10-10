import SEO from '../components/seo';
import { Wrapper } from '../layout';
import BlogMasonryMain from '../components/blog-masonry';

const BlogMasonry = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Blog Masonry'} />
            <BlogMasonryMain />
        </Wrapper>
    )
}

export default BlogMasonry;