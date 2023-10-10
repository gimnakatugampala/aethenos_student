import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';
import Counter from '../../common/counter';

const counter_data = [
    {
        color: 'primary-color',
        count: 29.3,
        icon: '48',
        text: 'K',
        title: 'Student Enrolled',
        decimal: 1
    },
    {
        color: 'secondary-color',
        count: 32.4,
        icon: '47',
        text: 'K',
        title: 'Class Completed',
        decimal: 1
    },
    {
        color: 'extra08-color',
        count: 100,
        icon: '49',
        text: '%',
        title: 'Satisfaction Rate'
    },
    {
        color: 'extra05-color',
        count: 354,
        icon: '50',
        text: '%',
        title: 'Top Instructors'
    }
]

const CounterArea = ({about_p_3}) => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="counterup-area-9">
            <div className="container edublink-animated-shape">
                <div className="row g-5">
                    {counter_data.map((c, i) => {
                        const { color, count, text, title,icon } = c;
                        return (
                            <div key={i} className="col-lg-3 col-sm-6" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <div className="edu-counterup counterup-style-4">
                                    <div className={`icon ${color}`}>
                                        <i className={`icon-${icon}`}></i>
                                    </div>
                                    <h2 className="counter-item count-number">
                                        <span className="odometer">
                                            <Counter number={parseFloat(count)} text={text} decimal={c.decimal} />
                                        </span>
                                    </h2>
                                    <h6 className="title">{title}</h6>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <ul className="shape-group">
                    <motion.li className="shape-1 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                        animate={ {
                            x: mouseDirection(40).x,
                            y: mouseDirection(40).y
                        } }
                    >
                        <img src="/assets/images/others/shape-27.png" alt="Shape" />
                    </motion.li>
                </ul>
            </div>
        </div>
    )
}

export default CounterArea;