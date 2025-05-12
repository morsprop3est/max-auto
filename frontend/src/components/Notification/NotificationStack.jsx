import Notification from "./Notification";
import styles from "./NotificationStack.module.scss";

export default function NotificationStack({ notifications, removeNotification }) {
  return (
    <div className={styles.notificationStack}>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}