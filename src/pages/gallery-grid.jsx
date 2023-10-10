import SEO from '../components/seo';
import { Wrapper } from '../layout';
import GalleryGridMain from '../components/gallery-grid';

export default function GalleryGrid() {
    return (
        <Wrapper>
            <SEO pageTitle={'Gallery Grid'} />
            <GalleryGridMain />
        </Wrapper>
    )
}
