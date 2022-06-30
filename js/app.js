import { sendNotification, createInterval, $ } from "./utils.js";

// State
let delay = parseInt(localStorage.getItem("delay")) || 60;
let interval = createInterval(delay);

// Add event listeners
$("button").addEventListener("click", () => {
    sendNotification("Hello World!");
});

$("input").addEventListener("input", (e) => {
    // update delay
    delay = e.target.value;
    localStorage.setItem("delay", delay);

    // update interval
    clearInterval(interval);
    interval = createInterval(delay);
});
