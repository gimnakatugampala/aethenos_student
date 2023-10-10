import React from 'react';

const TeamFour = ({ instructor }) => {
    return (
        <div className="edu-team-grid team-style-4">
            <div className="inner">
                <div className="thumbnail-wrap">
                    <div className="thumbnail">
                        <a>
                            <img src={`/assets/images/team/yoga-instructor/${instructor.img}`} alt="team images" />
                        </a>
                    </div>
                    <ul className="team-share-info">
                        {instructor.social_links.map((social, i) => (
                            <li key={i}>
                                <a href={social.link} target={social.target ? social.target : ''}>
                                    <i className={social.icon}></i>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="content">
                    <h5 className="title">
                        <a>{instructor.name}</a>
                    </h5>
                    <span className="designation">{instructor.title}</span>
                </div>
            </div>
        </div>
    )
}

export default TeamFour;