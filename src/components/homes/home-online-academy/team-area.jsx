import React from 'react';
import { instructors_data } from '../../../data';
import TeamTwo from "../../team-member/team-two";

const instructors = instructors_data.slice(0, 3);

const TeamArea = ({ about_p }) => {
    return (
        <div className={`edu-team-area ${about_p ? 'team-area-5 section-gap-large' : 'team-area-2 edu-section-gap'}`}>
            <div className="container">
                <div className="section-title section-center" data-sal-delay="150"
                data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Instructors</span>
                    <h2 className="title">Course Instructors</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>
                <div className="row g-5">
                    {instructors.slice(0,3).map((instructor) => {
                        return (
                            <div key={instructor.id} className="col-lg-4 col-md-6" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800">
                                <TeamTwo instructor={instructor} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TeamArea;