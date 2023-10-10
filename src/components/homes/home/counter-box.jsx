import React from 'react';
import Counter from '../../common/counter';

const counter_data = [
    {color:'primary-color',number:45.2,text:'K',title:'Student Enrolled',decimal: 1},
    {color:'secondary-color',number:32.4,text:'K',title:'Class Completed',decimal: 1},
    {color:'extra05-color',number:354,text:'+',title:'Top Instructors'},
    {color:'extra02-color',number:100,text:'%',title:'Satisfaction Rate'},
];

const CounterBox = () => {
    return (
        <>
            <div className="counterup-box counterup-box-1">
                { counter_data.slice(0,2).map( ( c,i ) => (
                    <div key={i} className="edu-counterup counterup-style-2">
                        <h2 className={`counter-item count-number ${c.color}`}>
                        <span className="odometer">
                            <Counter number={parseFloat(c.number)} text={c.text} decimal={c.decimal} />
                        </span>
                        </h2>
                        <h6 className="title">{c.title}</h6>
                    </div>
                ) ) }
            </div>
            <div className="counterup-box counterup-box-2">
                { counter_data.slice(2,4).map( ( c,i ) => (
                    <div key={i} className="edu-counterup counterup-style-2">
                        <h2 className={`counter-item count-number ${c.color}`}>
                        <span className="odometer">
                            <Counter number={parseFloat(c.number)} text={c.text} decimal={c.decimal} />
                        </span>
                        </h2>
                        <h6 className="title">{c.title}</h6>
                    </div>
                ) ) }
            </div>
        </>
    )
}

export default CounterBox;