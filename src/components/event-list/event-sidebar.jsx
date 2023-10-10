import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add_category } from '../../redux/features/event-slice';

const all_categories = ['Art & Design', 'Development', 'Business', 'Marketing']

const EventSidebar = () => {
    const { categories } = useSelector(state => state.event);
    const dispatch = useDispatch();
    // handleCategory
    const handleCategory = (cate) => {
        const index = categories.findIndex(item => item === cate);
        if (index >= 0) {
            dispatch(add_category({changeType: 'remove',item: cate}))
        } else {
            dispatch(add_category({changeType: 'added',item: cate}))
        }
    }
  
    return (
        <div className="course-sidebar-2">
            <div className="edu-course-widget widget-category">
                <div className="inner">
                    <h5 className="widget-title">Categories</h5>
                    <div className="content">
                        {all_categories.map((c, i) => (
                        <div key={i} className="edu-form-check" >
                            <input onClick={() => handleCategory(c)} type="checkbox" id={`cat-check${i + 1}`} />
                            <label htmlFor={`cat-check${i + 1}`}>{c} </label>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="edu-course-widget widget-date-filter">
                <div className="inner">
                    <h5 className="widget-title">Date</h5>
                    <div className="content">
                        <div className="edu-form-check">
                            <input type="checkbox" id="date-check1" />
                            <label htmlFor="date-check1">Any Day</label>
                        </div>
                        <div className="edu-form-check">
                            <input type="checkbox" id="date-check2" />
                            <label htmlFor="date-check2">Today</label>
                        </div>
                        <div className="edu-form-check">
                            <input type="checkbox" id="date-check3" />
                            <label htmlFor="date-check3">Tomorrow</label>
                        </div>
                        <div className="edu-form-check">
                            <input type="checkbox" id="date-check4" />
                            <label htmlFor="date-check4">This Week</label>
                        </div>
                        <div className="edu-form-check">
                            <input type="checkbox" id="date-check5" />
                            <label htmlFor="date-check5">This Month</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="edu-course-widget widget-cities">
                <div className="inner">
                    <h5 className="widget-title">Cities</h5>
                    <div className="content">
                        <div className="edu-form-check">
                            <input type="checkbox" id="city-check1" />
                            <label htmlFor="city-check1">All Cities</label>
                        </div>
                        <div className="edu-form-check">
                            <input type="checkbox" id="city-check2" />
                            <label htmlFor="city-check2">Japan</label>
                        </div>
                        <div className="edu-form-check">
                            <input type="checkbox" id="city-check3" />
                            <label htmlFor="city-check3">New York</label>
                        </div>
                        <div className="edu-form-check">
                            <input type="checkbox" id="city-check4" />
                            <label htmlFor="city-check4">England</label>
                        </div>
                        <div className="edu-form-check">
                            <input type="checkbox" id="city-check5" />
                            <label htmlFor="city-check5">Mascow</label>
                        </div>
                        <div className="edu-form-check">
                            <input type="checkbox" id="city-check6" />
                            <label htmlFor="city-check6">Paris</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventSidebar;