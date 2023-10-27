import SEO from "../../../../components/seo";
import { Wrapper } from "../../../../layout";
import InstrumentsMain from "../../../../components/instruments";

const Instruments = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Instruments"} />
      <InstrumentsMain />
    </Wrapper>
  );
};

export default Instruments;
