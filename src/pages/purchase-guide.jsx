import SEO from '../components/seo';
import { Wrapper } from '../layout';
import PurchaseGuideMain from '../components/purchase-guide';

export default function PurchaseGuide() {
    return (
        <Wrapper>
            <SEO pageTitle={'Purchase Guide'} />
            <PurchaseGuideMain />
        </Wrapper>
    )
}