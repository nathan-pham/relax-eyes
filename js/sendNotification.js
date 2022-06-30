await Notification.requestPermission();

const sendNotification = (body) => {
    new Notification("Relax Eyes", {
        body,
        icon: "/assets/apple-touch-icon.png",
    });
};

export default sendNotification;
