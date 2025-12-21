import cross from '../assets/pictures/cross.svg';
import { Notification } from '../types';

export function Notifications({
    notifications,
    handleDeleteNotification,
    inert,
}: {
    notifications: Notification[];
    handleDeleteNotification: (key: string) => void;
    inert: boolean;
}) {
    const repeat: ({ count: number } & Notification)[] = [];
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
            <div className={'notification ' + record.type} key={record.key}>
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
                    onClick={() => handleDeleteNotification(record.key)}
                >
                    <img src={cross} alt="" />
                </button>
            </div>
        );
    });

    return (
        <div inert={inert} className="notification-container">
            {notificationsJSX}
        </div>
    );
}
