import cross from '../assets/pictures/cross.svg';
import { NotificationType } from '../types';

export default function Notifications({
    notifications,
    removeNotificationByKey,
    inert,
}: {
    notifications: NotificationType[];
    removeNotificationByKey: (key: string) => void;
    inert: boolean;
}) {
    const repeat: ({ count: number } & NotificationType)[] = [];
    const keys: string[] = [];

    notifications.forEach(ntf => {
        if (!keys.includes(ntf.key)) {
            keys.push(ntf.key);
            repeat.push({
                ...ntf,
                count: 1,
            });
        } else {
            repeat.some(record => {
                if (record.key === ntf.key) {
                    record.count++;
                    return true;
                }
                return false;
            });
        }
    });

    const notificationsJSX = repeat.map(record => {
        return (
            <li
                className={'notification ' + record.type}
                key={record.key}
                role={record.type === 'danger' ? 'alert' : 'status'}
            >
                <div>
                    <h1 className="notification__title">
                        {record.title}{' '}
                        {record.count !== 1 && (
                            <span className="notification__count">
                                {record.count}x
                            </span>
                        )}
                    </h1>
                    {typeof record.description === 'string' ? (
                        <p className="notification__description">
                            {record.description}
                        </p>
                    ) : (
                        record.description
                    )}
                </div>
                <button
                    className="btn-img btn-img--default notification__btn"
                    onClick={() => removeNotificationByKey(record.key)}
                    aria-label="Close the notification"
                >
                    <img src={cross} alt="Cross icon" />
                </button>
            </li>
        );
    });

    return (
        <ul
            inert={inert}
            className="notification-container"
            role="status"
            aria-live="polite"
            aria-atomic="true"
        >
            {notifications.length !== 0 && notificationsJSX}
        </ul>
    );
}
