import { sendNotification, createInterval, $ } from "./utils.js";

// register pwa
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("serviceWorker.js");
}

// State
let delay = parseInt(localStorage.getItem("delay")) || 60;
let interval = createInterval(delay);

$("input").value = delay;

// Add event listeners
$("button").addEventListener("click", () => {
    sendNotification("Hello World!");
});

$("input").addEventListener("input", (e) => {
    if (!e.target.value) return;

    // update delay
    delay = parseInt(e.target.value);
    localStorage.setItem("delay", delay);

    // update interval
    clearInterval(interval);
    interval = createInterval(delay);
});
