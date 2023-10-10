import SEO from '../components/seo';
import { Wrapper } from '../layout';
import PricingTableMain from '../components/pricing-table';

export default function PricingTable() {
    return (
        <Wrapper>
            <SEO pageTitle={'Pricing Table'} />
            <PricingTableMain />
        </Wrapper>
    )
}