import Link from "next/link";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "../../../contexts/mouse-move-context";

const HeroArea = () => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();

  const mainfs = {
    fontSize: "clamp(1rem, calc(0.5rem + 1.4vw), 1.5rem)",  
  };
  return (
    <>
<section
  className="hero-section d-flex align-items-center justify-content-center text-center py-5"
  style={{
    backgroundImage: 'url(\'/images/hero-img.jpg\')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    color: '#fff',
    minHeight: '80vh',
  }}
>
  {/* Semi-transparent overlay */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency
      zIndex: 1,
    }}
  ></div>

  <div className="container" style={{ position: 'relative', zIndex: 2 }}>
    <div className="row align-items-center">
      <div className="col-md-12">
        <h1 className="display-4 fw-bold mb-3 text-white">Learn Excel and Everything Else...</h1>
      </div>

      <div className="col-md-12">
        <p className="lead mb-4 text-white">
          Aethenos is your go-to place for learning the technical and other skills
          that are imperative for your success in this new age.
        </p>
      </div>
    </div>
  </div>
</section>


    <div className="hero-banner hero-style-4">
      <div className="mx-4 mx-sm-5 mx-md-4 mx-lg-5 mb-5 mt-5">
        <div className="row align-items-center">

       

        <div className="col-md-12">
            <div className="banner-content mb-0">
              <h2 
                className="title"
                data-sal-delay="100"
                data-sal="slide-up"
                data-sal-duration="1000"
              >
                Excel Genius : Learn and Master Skills Directly Inside Excel!
              </h2>
            </div>
          </div>

          <div className="col-md-6 mb-5">
          <h4
                data-sal-delay="200"
                data-sal="slide-up"
                data-sal-duration="1000"
                  className="m-0 w-100 text-center lh-base"
                  style={mainfs}
              >
               Come and experience the best Excel training courses developed by top instructors from around the world through our Innovative Excel Training App. 
               <br />
               <br />
               All our Excel courses can be taken on our free Excel Training App that delivers pre-recorded and live courses inside the Excel Application itself.
              </h4>
          </div>
          {/* <div className="col-md-1"></div> */}

          <div className="col-md-6 mb-5">
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
     <style jsx>{`
        @media (min-width: 768px) {
          .thumbnail img {
            height: 400px; /* Height for screens 768px and above */
            object-fit : none;
          }
        }
             @media (max-width: 768px) {
          .thumbnail img {
            height: 240px; /* Height for screens 768px and above */
           object-fit : cover;
          }
        }
      `}</style>
    </div>
    </>
  );
};

export default HeroArea;
