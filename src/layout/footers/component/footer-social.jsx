const social_share = [
    { link: 'http://facebook.com', target: '_blank', icon: 'icon-facebook', color: 'color-fb' },
    { link: 'http://twitter.com', target: '_blank', icon: 'icon-twitter', color: 'color-twitter' },
    { link: 'https://www.linkedin.com/', target: '_blank', icon: 'icon-linkedin2', color: 'color-linkd' },
    { link: 'https://www.youtube.com/', target: '_blank', icon: 'icon-youtube', color: 'color-yt' },
    { link: 'https://www.instagram.com/', target: '_blank', icon: 'icon-instagram', color: 'color-ig' },
]

import React from 'react';

const FooterSocial = () => {
    return (
        <>
            {social_share.map((social, i) => (
                <li key={i}><a href={social.link} target={social.target ? social.target : ''} className={`${social.color}`}>
                <i className={social.icon}></i>
                </a></li>
            ))}
        </>
    )
}

export default FooterSocial;