import SEO from '../components/seo';
import { Wrapper } from '../layout';
import WishlistMain from '../components/wishlist';

const Wishlist = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Wishlist'} />
            <WishlistMain/>
        </Wrapper>
    )
}

export default Wishlist;