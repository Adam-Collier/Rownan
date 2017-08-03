function notify(notification, onclick) {
  const myNotification = new window.Notification(notification.title, notification)
  myNotification.onclick = onclick;
}

module.exports = {
  notify
}
