type StateChangeListener = (e: StateEvent) => void;

export class EventSink {
    listeners: StateChangeListener[] = [];

    /**
     * Notifies the listeners of an event.
     */
    notify(event: StateEvent) {
        for (const listener of this.listeners) {
            if (event.isConsumed) break;
            listener(event);
        }
    }

    /**
     * Adds a listener to the EventSink.
     * When a StateEvent is received, all the listeners are notified (until the event is consumed or no more listeners
     * left).
     */
    listen(callback: StateChangeListener) {
        this.listeners.push(callback);
    }
}

export class StateEvent {
    name = 'event';
    isConsumed = false;

    constructor(name: string) {
        this.name = name;
    }
}
