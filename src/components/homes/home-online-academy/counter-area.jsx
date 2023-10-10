import React from 'react';
import Counter from '../../common/counter';

const counter_data = [
    {
        color: 'primary-color',
        count: 29.3,
        text: 'K',
        title: 'Student Enrolled',
        decimal: 1
    },
    {
        color: 'secondary-color',
        count: 32.4,
        text: 'K',
        title: 'Class Completed',
        decimal: 1
    },
    {
        color: 'extra02-color',
        count: 100,
        text: '%',
        title: 'Satisfaction Rate'
    },
    {
        color: 'extra05-color',
        count: 354,
        text: '%',
        title: 'Top Instructors',
        border_none:'border-none'
    }
]

const CounterArea = () => {
    return (
        <div className="counterup-area-3 gap-bottom-equal">
            <div className="container">
                <div className="row g-5">
                    {counter_data.map((c, i) => (
                        <div key={i} className="col-lg-3 col-sm-6">
                            <div className={`edu-counterup counterup-style-3 ${c.border_none ? c.border_none : '' }`}>
                                <h2 className={`counter-item count-number ${c.color}`}>
                                    <span className="odometer"><Counter number={parseFloat(c.count)} text={c.text} decimal={c.decimal} /></span>
                                </h2>
                                <h6 className="title">{c.title}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CounterArea;