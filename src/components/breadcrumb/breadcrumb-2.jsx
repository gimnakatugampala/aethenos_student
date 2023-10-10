import Link from 'next/link';
import React from 'react';

const BreadcrumbTwo = ({ subtitle }) => {
    return (
        <div className="edu-breadcrumb-area breadcrumb-style-5">
            <div className="container">
                <div className="breadcrumb-inner">
                    <ul className="edu-breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li className="separator"><i className="icon-angle-right"></i></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="separator"><i className="icon-angle-right"></i></li>
                        <li className="breadcrumb-item active" aria-current="page">{subtitle}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BreadcrumbTwo;