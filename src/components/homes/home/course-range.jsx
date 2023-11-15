
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CourseRangeList from './course-range-list';
import CardContainer from '../../../contexts/CardContainer';

const CourseRange = () => {
  

    return (
        <div className="edu-brand-area brand-area-1 p-5 bg-lighten01">
            <div className="container">
                <div className="row">

                <div className='mb-4'>
                <h3 className="title m-0">A broad selection of courses</h3>
                <p className="m-0">Choose from over 210,000 online video courses with new additions published every month</p>
                </div>

                <div className="col-md-12">

                <Tabs
                    defaultActiveKey="python"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    >

                    <Tab eventKey="python" title="Python">
                    <CardContainer>
                        <h4>Expand your career opportunities with Python</h4>
                        <p>Take one of Udemy’s range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will appeal to both beginners and advanced developers alike.</p>
                        <CourseRangeList />
                    </CardContainer>
                    </Tab>

                    <Tab eventKey="excel" title="Excel">
                    <CardContainer>
                        <h4>Analyze and visualize data with Excel</h4>
                        <p>Take a Microsoft Excel course from Udemy, and learn how to use this industry-standard software. Real-world experts will show you the basics like how to organize data into sheets, rows and columns, and advanced techniques like creating complex dynamic formulas. Both small businesses and large companies use Excel to turn their raw data into actionable insights.</p>
                        <CourseRangeList />
                    </CardContainer>
                    </Tab>

                    <Tab eventKey="wev-dev" title="Web Development">
                    <CardContainer>
                        <h4>Build websites and applications with Web Development</h4>
                        <p>The world of web development is as wide as the internet itself. Much of our social and vocational lives play out on the internet, which prompts new industries aimed at creating, managing, and debugging the websites and applications that we increasingly rely on.</p>
                        <CourseRangeList />
                    </CardContainer>
                    </Tab>

                    <Tab eventKey="js" title="Javascript">
                    <CardContainer>
                        <h4>Grow your software development skills with JavaScript</h4>
                        <p>JavaScript is a text-based computer programming language used to make dynamic web pages. A must-learn for aspiring web developers or programmers, JavaScript can be used for features like image carousels, displaying countdowns and timers, and playing media on a webpage. With JavaScript online classes, you can learn to build interactive web applications, choose the best framework, and work with other programming languages like HTML and CSS.</p>
                        <CourseRangeList />
                    </CardContainer>
                    </Tab>

                    <Tab eventKey="data-science" title="Data Science">
                    <CardContainer>
                        <h4>Lead data-driven decisions with Data Science</h4>
                        <p>Data science application is an in-demand skill in many industries worldwide — including finance, transportation, education, manufacturing, human resources, and banking. Explore data science courses with Python, statistics, machine learning, and more to grow your knowledge. Get data science training if you’re into research, statistics, and analytics.</p>
                        <CourseRangeList />
                    </CardContainer>
                    </Tab>

                    <Tab eventKey="aws" title="Amazon AWS">
                    <CardContainer>
                        <h4>Become an expert in cloud computing with AWS Certification</h4>
                        <p>Amazon Web Services (AWS) is a cloud computing platform with more than 200 featured services. Whether or not you aim for certification, an AWS course offers the theory and practical skills you need to land a job in cloud development, sales, engineering, networking, and more. The better you become at cloud computing, the more you can earn. Anyone can learn AWS skills, and with AWS online training, you can move at your own pace.</p>
                        <CourseRangeList />
                    </CardContainer>
                    </Tab>
                    
                </Tabs>

                </div>
                   
                </div>
            </div>
        </div>
    )
}

export default CourseRange;