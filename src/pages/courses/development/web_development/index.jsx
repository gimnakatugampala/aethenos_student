import SEO from "../../../../components/seo";
import { Wrapper } from "../../../../layout";
import WebDevelopmentMain from "../../../../components/web_development";

const WebDevelopment = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Web Development"} />
      <WebDevelopmentMain />
    </Wrapper>
  );
};

export default WebDevelopment;
