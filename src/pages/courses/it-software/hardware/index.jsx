import SEO from "../../../../components/seo";
import { Wrapper } from "../../../../layout";
import HardwareMain from "../../../../components/courses-sub/hardware";

const Hardware = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Hardware"} />
      <HardwareMain />
    </Wrapper>
  );
};

export default Hardware;
