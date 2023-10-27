import SEO from "../../../components/seo";
import { Wrapper } from "../../../layout";
import MusicMain from "../../../components/courses-sub/music";


const Music = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Music"} />
      <MusicMain />
    </Wrapper>
  );
};

export default Music;
