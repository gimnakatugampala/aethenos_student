import { instructors_data } from "../../../data";
import TeamOne from "../../team-member/team-one";

const TeamArea = () => {
    return (
        <div className="edu-team-area team-area-1 gap-tb-text">
            <div className="container">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Instructors</span>
                    <h2 className="title">Course Instructors</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>
                <div className="row g-5">
                    {instructors_data.slice(0,4).map((instructor) => (
                        <div key={instructor.id} className="col-lg-3 col-sm-6 col-12" data-sal-delay={instructor.delay} data-sal="slide-up" data-sal-duration="800">
                            <TeamOne instructor={instructor} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TeamArea;