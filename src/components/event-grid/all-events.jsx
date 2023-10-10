import React, { useEffect, useState } from 'react';
import Pagination from '../../ui/pagination';
import EventItem from './event-item';

const AllEvents = ({ itemsPerPage, items }) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    // side effect
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, items]);
    // handlePageClick
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            {currentItems && currentItems.map((item, i) => {
                return (
                    <div key={i} className="col-lg-4 col-md-6">
                        <div className="edu-event event-style-1">
                            <EventItem item={item} />
                        </div>
                    </div>
                )
            })}
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </>
    )
}

export default AllEvents;