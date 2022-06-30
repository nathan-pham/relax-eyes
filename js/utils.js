// Generate a random statement
const randomStatement = () => {
    const reminders = [
        "Take a look outside the window!",
        "Remember to relax your eyes!",
        "Close your eyes for a moment.",
        "Why not take a small eye break?",
    ];

    return reminders[Math.floor(Math.random() * reminders.length)];
};

// Sending notifications
await Notification.requestPermission();
export const sendNotification = (body) => {
    new Notification("Relax Eyes", {
        body,
        icon: "/assets/apple-touch-icon.png",
    });
};

// Querying elements
export const $ = (query) => document.querySelector(query);

// Create new interval
export const createInterval = (delay) => {
    return setInterval(() => {
        sendNotification(randomStatement());
    }, delay * 1000);
};
