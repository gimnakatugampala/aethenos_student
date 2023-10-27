import SEO from "../../../../components/seo";
import { Wrapper } from "../../../../layout";
import DataScienceMain from "../../../../components/data_science";

const WebDevelopment = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Data Science"} />
      <DataScienceMain />
    </Wrapper>
  );
};

export default WebDevelopment;
