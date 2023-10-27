import SEO from "../../../components/seo";
import { Wrapper } from "../../../layout";
import Development from "../../../components/courses-sub/development";

const development = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Development"} />
      <Development />
    </Wrapper>
  );
};

export default development;
