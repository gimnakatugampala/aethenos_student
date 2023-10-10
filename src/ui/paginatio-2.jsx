import React from 'react';

const PaginationTwo = () => {
    return (
        <>
            <li><a href="#" aria-label="Previous"><i className="icon-west"></i></a></li>
            <li className="active"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li className="more-next"><a href="#"></a></li>
            <li><a href="#">8</a></li>
            <li><a href="#" aria-label="Next"><i className="icon-east"></i></a></li>
            </>
    )
}

export default PaginationTwo;