import {EventSink, StateEvent} from "./event_sink.js";

export const stateUpdateSink = new EventSink();

export function updateState(): void {
    stateUpdateSink.notify(events.updateEvent);
}

const updateEventName = 'update';

export const events = {
    get updateEvent(): StateEvent {
        return new StateEvent(updateEventName);
    }
}
