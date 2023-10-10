import { useSelector } from "react-redux";
import { event_data } from "../../data";
import EventListItem from "./event-list-item";
import EventSidebar from "./event-sidebar";

const event_lists = event_data.filter(event => event.event_list);

const EventListArea = () => {
    const { categories } = useSelector((state) => state.event);
    const filterData = event_lists?.filter((item1) =>
        categories?.length !== 0
        ? categories?.some((item2) => item1.category == item2)
        : item1
    );

    return (
        <div className="edu-event-area event-area-1 section-gap-equal">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-3 order-lg-2">
                        <EventSidebar />
                    </div>
                    <div className="col-lg-9 order-lg-1 col-pr--35">
                        <div className="row g-5">
                            {filterData?.length !== 0 && filterData?.map((list, i) => (
                                <div key={list.id} className="col-12">
                                    <div className="edu-event-list event-list-2">
                                        <EventListItem item={list} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <ul className="edu-pagination top-space-30 justify-content-start">
                    <li>
                        <a href="#" aria-label="Previous">
                            <i className="icon-west"></i>
                        </a>
                    </li>
                    <li className="active">
                        <a href="#">1</a>
                    </li>
                    <li>
                        <a href="#">2</a>
                    </li>
                    <li>
                        <a href="#">3</a>
                    </li>
                    <li className="more-next">
                        <a href="#"></a>
                    </li>
                    <li>
                        <a href="#">8</a>
                    </li>
                    <li>
                        <a href="#" aria-label="Next">
                            <i className="icon-east"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default EventListArea;