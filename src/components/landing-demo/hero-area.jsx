import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../contexts/mouse-move-context';

const HeroArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="hero-banner presentation-hero-style pv-hero-banner bg-image" id="intro">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="banner-content">
                            <span className="subtitle" data-sal="slide-up" data-sal-duration="1000">Online Course & Education Template</span>
                            <h1 className="title" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1000">EduBlink Education & Online Course HTML Template</h1>
                            <div className="banner-btn" data-sal-delay="400" data-sal="slide-up" data-sal-duration="1000">
                                <a href="https://1.envato.market/AoJezj" target="_blank" className="edu-btn">Download EduBlink Now <i className="icon-4"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="banner-gallery">
                <div className="thumbnail thumbnail-1" data-sal-delay="500" data-sal="slide-down" data-sal-duration="1000">
                    <img src="/assets/images/preview/banner-thumb1.jpg" alt="demo" />
                </div>
                <div className="thumbnail thumbnail-2" data-sal-delay="500" data-sal="slide-up" data-sal-duration="1000">
                    <img src="/assets/images/preview/banner-thumb2.jpg" alt="demo" />
                </div>
                <div className="thumbnail thumbnail-3" data-sal-delay="500" data-sal="slide-down" data-sal-duration="1000">
                    <img src="/assets/images/preview/banner-thumb3.jpg" alt="demo" />
                </div>
                <div className="thumbnail thumbnail-4" data-sal-delay="500" data-sal="slide-up" data-sal-duration="1000">
                    <img src="/assets/images/preview/banner-thumb4.jpg" alt="demo" />
                </div>
                <div className="thumbnail thumbnail-5" data-sal-delay="500" data-sal="slide-up" data-sal-duration="1000">
                    <img src="/assets/images/preview/banner-thumb5.jpg" alt="demo" />
                </div>
            </div>
            <ul className="shape-group">
                <motion.li className="shape-1 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y
                    } }
                >
                    <img src="/assets/images/about/shape-13.png" alt="Shape" />
                </motion.li>
                <motion.li className="shape-2 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseDirection(30).x,
                        y: mouseDirection(30).y
                    } }
                >
                    <img src="/assets/images/counterup/shape-02.png" alt="Shape" />
                </motion.li>
                <motion.li className="shape-3 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y
                    } }
                >
                    <img src="/assets/images/about/shape-25.png" alt="Shape" />
                </motion.li>
                <motion.li className="shape-4 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseDirection(28).x,
                        y: mouseDirection(28).y
                    } }
                >
                    <span className="d-block"></span>
                </motion.li>
            </ul>
        </div>
    )
}

export default HeroArea;