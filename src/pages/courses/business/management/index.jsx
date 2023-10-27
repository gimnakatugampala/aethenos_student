import SEO from "../../../../components/seo";
import { Wrapper } from "../../../../layout";
import ManagementMain from "../../../../components/management";

const Management = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Sales"} />
      <ManagementMain />
    </Wrapper>
  );
};

export default Management;
