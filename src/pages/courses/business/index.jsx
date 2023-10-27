import SEO from "../../../components/seo";
import { Wrapper } from "../../../layout";
import BusinessMain from "../../../components/courses-sub/business";

const Business = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Business"} />
      <BusinessMain />
    </Wrapper>
  );
};

export default Business;
