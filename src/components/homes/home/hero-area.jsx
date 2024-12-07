import Link from "next/link";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "../../../contexts/mouse-move-context";

const HeroArea = () => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div className="hero-banner hero-style-4">
      <div className="mx-3 mx-sm-3 mx-md-4 mx-lg-5">
        <div className="row align-items-center">
        <div className="col-md-12">
            <div className="banner-content">
              <h2 
                className="title"
                data-sal-delay="100"
                data-sal="slide-up"
                data-sal-duration="1000"
              >
                Excel Genius : Learn and Master Skills Directly Inside Excel!
              </h2>
           
              {/* <ul className="shape-group">
                                <motion.li className="shape-1 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000" 
                                    animate={ {
                                        x: mouseReverse(25).x,
                                        y: mouseReverse(25).y
                                    } }
                                >
                               
                                </motion.li>
                                <img src="/assets/images/about/shape-13.png" alt="Shape" />
                            </ul> */}
            </div>
          </div>

          <div className="col-md-6">
          <h4
                data-sal-delay="200"
                data-sal="slide-up"
                data-sal-duration="1000"
                  className="m-0 w-100 text-center"
              >
                Come and experience the best Excel training courses from top
                instructors from around the world through our Innovative Excel
                Training App. All our Excel courses will be delivered through
                our proprietary Excel Training App that delivers pre-recorded
                and live classes inside the Excel Application itself.
              </h4>
          </div>
          {/* <div className="col-md-1"></div> */}

          <div className="col-md-6">
            <div >
              <div
                className="thumbnail"
                data-sal-delay="500"
                data-sal="slide-left"
                data-sal-duration="1000"
              >
                <img
                  className="w-100 rounded"
                  src="/assets/images/instructor/aethenosCoverHero.jpg"
                  alt="Excel App of Aethenos"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="shape-7">
                <img src="/assets/images/about/h-1-shape-01.png" alt="Shape" />
            </div> */}
    </div>
  );
};

export default HeroArea;
