import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';
import { blog_data } from '../../../data';
import BlogPostOne from '../../blog-post/blog-post-one';

const BlogArea = ({ style_2 }) => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    const blogItems = blog_data.filter(b => b.home_1);
    return (
        <div className={`edu-blog-area ${style_2 ? style_2 : "blog-area-1 edu-section-gap" }`}>
            <div className="container">
                <div className="section-title section-center" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Latest Articles</span>
                    <h2 className="title">Get News with EduBlink</h2>
                    <span className="shape-line">
                        <i className="icon-19"></i>
                    </span>
                </div>
                <div className="row g-5"> 
                    {blogItems.map((blogItem, i) => ( 
                        <div key={i} className="col-lg-4 col-md-6 col-12" data-sal-delay={blogItem.delay} data-sal="slide-up" data-sal-duration="800">
                            <BlogPostOne param={blogItem} />
                        </div> 
                    ))} 
                </div>
            </div>
            <ul className="shape-group">
                <motion.li className="shape-1 scene"
                    animate={ {
                        x: mouseDirection(30).x,
                        y: mouseDirection(30).y
                    } }
                >
                    <img src="/assets/images/about/shape-02.png" alt="Shape" />
                </motion.li>
                <motion.li className="shape-2 scene"
                    animate={ {
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y
                    } }
                >
                    <span></span>
                </motion.li>
                <motion.li className="shape-3 scene"
                    animate={ {
                        x: mouseDirection(30).x,
                        y: mouseDirection(30).y
                    } }
                >
                    <img src="/assets/images/counterup/shape-05.png" alt="Shape" />
                </motion.li>
            </ul>
        </div>
    )
}

export default BlogArea;