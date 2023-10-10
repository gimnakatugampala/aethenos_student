import SEO from '../components/seo';
import { Wrapper } from '../layout';
import EventListMain from '../components/event-list';

const EventList = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Event List'} />
            <EventListMain />
        </Wrapper>
    )
}

export default EventList;