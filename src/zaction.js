/**
 * @name ZAction
 * @description A lightweight library to manage JavaScript events and handlers
 * @author Zoeb Chhatriwala <zoeb@chhatriwala.com>
 */


(() => {
    // Main Class
    class ZAction {
        // Constructor
        // Takes in root element (App root)
        constructor(root = window.document) {
            this.document = root;
            this.hooks = {};
        }

        eventHandler(event) {
            // hookedEvent
            let hookedEvent = this.hooks[event.type];

            // Verify
            if (typeof hookedEvent != "undefined") {
                // Find event
                let eventTarget = event.target;

                // if eventTarget doesn't has z-event attribute
                if (eventTarget.hasAttribute("z-event")) {
                    // Verify event mentioned in z-event
                    let eventName = eventTarget.getAttribute("z-event");
                    // Check
                    if (eventName.indexOf(event.type) == -1) {
                        // Mark eventTarget to be null
                        eventTarget = null;
                    }
                    // End
                } else {
                    // Find closest root if present
                    eventTarget = eventTarget.closest(`[z-event*="${event.type}"]`);
                }

                // Get action
                if (eventTarget && eventTarget.hasAttribute("z-action")) {
                    let actionName = eventTarget.getAttribute("z-action");
                    // verify handler
                    if (typeof hookedEvent[actionName] != "undefined") {
                        // set event
                        event["z_target"] = eventTarget;

                        // Call handler
                        hookedEvent[actionName].call(this, event);
                    } else {
                        throw `Exception: Action '${actionName}' is not defined for event type '${event.type}'.`;
                    }
                }
            }
        }

        // adds action for certain element
        setActionHook(eventName, actionName, handler) {
            // If event undefined
            if (typeof this.hooks[eventName] == "undefined") {
                this.setEvent(eventName, actionName);
            }

            // Set handler
            this.hooks[eventName][actionName] = handler;
        }

        // Sets and event
        setEvent(eventName) {
            this.document.addEventListener(eventName, this.eventHandler.bind(this));
            this.hooks[eventName] = {};
        }

        version() {
            return "1.0.0";
        }
    }
    // End

    // Export
    window.ZAction = ZAction;
})();