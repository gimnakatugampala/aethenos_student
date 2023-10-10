import React from 'react';

const social_share = [
    { link: 'http://facebook.com', target: '_blank', icon: 'icon-facebook',},
    { link: 'http://twitter.com', target: '_blank', icon: 'icon-twitter', },
    { link: 'https://www.linkedin.com/', target: '_blank', icon: 'icon-linkedin2'},
];

export const SocialShare = () => {
    return (
        <>
            {social_share.map((social, i) => (
                <li key={i}><a href={social.link} target={social.target ? social.target : ''}>
                <i className={social.icon}></i>
                </a></li>
            ))}
        </>
    )
}
