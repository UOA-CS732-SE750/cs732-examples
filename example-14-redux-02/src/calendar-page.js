import React from 'react';
import { ColumnLayout, Column } from './layout-components/column-layout';
import Card from './layout-components/card';
import moment from 'moment';
import { connect } from 'react-redux';

/**
 * This page can now be a functional component - doesn't need to maintain its own state now.
 * 
 * This page is a two-column layout. The first column contains a calendar,
 * while the second column contains a summary of current and upcoming events.
 */
function CalendarPage({ events }) {

    return (
        <ColumnLayout columns="1fr 400px">

            <Column>
                <CalendarCard events={events} />
            </Column>

            <Column>
                <EventsCard events={events} />
            </Column>
        </ColumnLayout>
    );
}

// This code connects CalendarPage to the Redux store.
// -------------------------------------------------------------
/**
 * This function will configure the CalendarPage to have the calendar events from the Redux store
 * accessible via a prop called "events".
 * 
 * @param state The entire Redux state tree
 */
function mapStateToProps(state) {
    return {
        events: state.events
    };
}

// Applies the config using the "connect" higher-order component provided by Redux
export default connect(mapStateToProps)(CalendarPage);
// -------------------------------------------------------------

/**
 * Renders a Card containing a Calendar.
 * 
 * TODO Add the actual calendar :)
 */
function CalendarCard() {
    return (
        <Card title="My Calendar">
            <p>Calendar goes here</p>
        </Card>
    );
}

/**
 * Renders a Card containing a summary of the given events.
 * 
 * Displays the first currently-occuring event, if any, along with the next upcoming event.
 * Also displays a count of events taking place later in the day, week, and month.
 * 
 * @param events The events to summarize
 */
function EventsCard({ events }) {
    const now = moment();
    const currentEvent = events.find(event => now.isAfter(event.start) && now.isBefore(event.end));
    const futureEvents = events.filter(event => now.isBefore(event.start)).sort();
    const nextEvent = futureEvents && futureEvents[0];
    const numEventsToday = futureEvents.filter(event => now.isSame(event.start, "day")).length;
    const numEventsThisWeek = futureEvents.filter(event => now.isSame(event.start, "week")).length;
    const numEventsThisMonth = futureEvents.filter(event => now.isSame(event.start, "month")).length;

    return (
        <Card title="My Events">
            <h3>Current:</h3>
            <UpcomingEvent event={currentEvent} messageIfNoEvent="Nothing on right now" />

            <h3>Next:</h3>
            <UpcomingEvent event={nextEvent} />

            {numEventsThisMonth && <div>
                <h3>Coming up later...</h3>
                <p><strong>Later today:</strong> {numEventsToday}<br />
                    <strong>Later this week:</strong> {numEventsThisWeek}<br />
                    <strong>Later this month:</strong> {numEventsThisMonth}</p>
            </div>}
        </Card>
    );
}

/**
 * Displays the name, description, and start date of the given event. If the event is currently running,
 * then an appropriate message will be displayed. If there is no event, the given fallback message will
 * be displayed instead.
 * 
 * @param event The event to display, if any
 * @param messageIfNoEvent The message to display if there's no event
 */
function UpcomingEvent({ event, messageIfNoEvent }) {

    if (event) {

        let timeText = moment(event.start).calendar();
        const now = moment();
        if (now.isAfter(event.start) && now.isBefore(event.end)) {
            timeText = "happening now";
        }

        return (
            <div>
                <p><strong>{event.name}</strong> <span className="text-secondary text-it">({timeText})</span><br />
                    {event.description}</p>
            </div>
        );
    }
    else {
        return <p>{messageIfNoEvent ? messageIfNoEvent : "No upcoming events"}</p>
    }
}