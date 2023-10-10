import SEO from '../components/seo';
import { Wrapper } from '../layout';
import GalleryMasonryMain from '../components/gallery-masonry';

export default function GalleryMasonry() {
    return (
        <Wrapper>
            <SEO pageTitle={'Gallery Masonry'} />
            <GalleryMasonryMain />
        </Wrapper>
    )
}
