import Link from "next/link";
import { HybridDistancePrograms, NonDegreeProgram, OffCanvasPrograms, OnlineDegree } from "../../../svg";

const contents = {
    category_data: [
        {
            icon: <OnlineDegree />,
            title: 'Online Degree Programs',
            text: 'Lorem ipsum dolor consec tur elit adicing sed umod tempor.',
            courses: 7,
            color: 'color-primary-style',
            delay: '100'
        },
        {
            icon: <NonDegreeProgram />,
            title: 'Non-Degree Programs',
            text: 'Lorem ipsum dolor consec tur elit adicing sed umod tempor.',
            courses: 4,
            color: 'color-secondary-style',
            delay: '200'
        },
        {
            icon: <OffCanvasPrograms />,
            title: 'Off-Campus Programs',
            text: 'Lorem ipsum dolor consec tur elit adicing sed umod tempor.',
            courses: 8,
            color: 'color-extra08-style',
            delay: '300'
        },
        {
            icon: <HybridDistancePrograms />,
            title: 'Hybrid Distance Programs',
            text: 'Lorem ipsum dolor consec tur elit adicing sed umod tempor.',
            courses: 5,
            color: 'color-extra05-style',
            delay: '400'
        }
    ]
}

const CategoryArea = () => {
    return (
        <div className="edu-categorie-area categorie-area-1 edu-section-gap">
            <div className="container">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title pre-textsecondary">Categories</span>
                    <h2 className="title">Online <span className="color-primary">Classes</span> For Remote Learning.</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                    <p>Consectetur adipiscing elit sed do eiusmod tempor.</p>
                </div>

                <div className="row g-5">
                    {contents.category_data.map((category, i) => (
                        <div key={i} className="col-lg-3 col-sm-6" data-sal-delay={category.delay} data-sal="slide-up" data-sal-duration="800">
                            <div className={`categorie-grid categorie-style-1 ${category.color} edublink-svg-animate`}>
                                <div className="icon">
                                    {category.icon}
                                </div>
                                <div className="content">
                                    <Link href="/course-style-1">
                                        <a>
                                            <h5 className="title">{category.title}</h5>
                                        </a>
                                    </Link>
                                    <p>{category.text}</p>
                                    <div className="course-remain">{category.courses} Courses</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryArea;