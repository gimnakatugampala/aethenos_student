import Link from 'next/link';
import React from 'react';

const TeamOne = ({ instructor, image_location_path='01' }) => {
    return (
        <div className="edu-team-grid team-style-1">
            <div className="inner">
                <div className="thumbnail-wrap">
                    <div className="thumbnail">
                        <Link href={`/team-details/${instructor.id}`}>
                            <a>
                                <img src={`/assets/images/team/team-${image_location_path}/${instructor.img}`} alt="team images" />
                            </a>
                        </Link>
                    </div>
                    <ul className="team-share-info">
                        <li><a href="#"><i className="icon-share-alt"></i></a></li>
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
                        <Link href={`/team-details/${instructor.id}`}>
                            <a>{instructor.name}</a>
                        </Link>
                    </h5>
                    <span className="designation">{instructor.title}</span>
                </div>
            </div>
        </div>
    )
}

export default TeamOne;