# ZAction
## About The Project
A lightweight library to manage JavaScript events and handlers.

### Usage

1. Initiate 'ZAction' objects
```JS
// With document as action root
const zAction = new ZAction();

// OR

// With any element as action root
const zAction = new ZAction(document.querySelector("#AppRoot"));
```
2. Define action hooks
```JS
// 'click' event for action 'submit_form'
zAction.setActionHook("click", "submit_form", (event) => {
  console.log(event, event.z_target);
});

// 'click' event for action 'data_input'
zAction.setActionHook("click", "data_input", (event) => {
  console.log(event, event.z_target);
});

// 'change' event for action 'data_input'
zAction.setActionHook("change", "data_input", (event) => {
  console.log(event, event.z_target);
});
```
3. Define HTML elements
```HTML
<!-- Single event -->
<button type="button" z-event="click" z-action="submit_form">Submit</button>

<!-- Multiple events -->
<input type="text" z-event="click change" z-action="data_input" name="fname" placeholder="Enter your first name..."/>
```
