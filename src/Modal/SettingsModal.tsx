import { useEffect, useState } from 'react';
import SettingsContent from './SettingsMenu';
import cross from '../assets/pictures/cross.svg';
import {
    Preferences,
    SetDataFunction,
    SettingsMenuType,
    SettingsMenuTypes,
} from '../types';

export default function SettingsModal({
    closeModal,
    preferences,
    setPreferences,
    setData,
}: {
    closeModal: () => void;
    preferences: Preferences;
    setPreferences: React.Dispatch<React.SetStateAction<Preferences>>;
    setData: SetDataFunction;
}) {
    const [current, setCurrent] = useState<SettingsMenuType>('About');

    useEffect(() => {
        const settingsButton = document.activeElement as HTMLElement;

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        setTimeout(() => {
            const d = document.getElementById(
                'settings_menu_close_btn'
            ) as HTMLElement;
            d.focus();
        }, 10);

        return () => {
            setTimeout(() => {
                settingsButton.focus();
            }, 10);
        };
    }, []);

    return (
        <main id="modal-container" aria-modal="true" role="dialog">
            <div>
                <div className="modal__top-bar">
                    <button
                        id="settings_menu_close_btn"
                        className="btn-img btn-img--default"
                        onClick={closeModal}
                        aria-label="Close the settings modal"
                    >
                        <img src={cross} alt="Cross icon" />
                    </button>
                    <p className="modal__hint">
                        Press <kbd>Escape</kbd> to close
                    </p>
                </div>

                <div className="modal">
                    <nav className="modal__options">
                        {SettingsMenuTypes.map(option => {
                            return (
                                <button
                                    className={
                                        'modal__options__option' +
                                        (current === option ? ' active' : '')
                                    }
                                    onClick={() => setCurrent(option)}
                                    key={option}
                                    aria-label={`Switch to ${option} menu`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </nav>
                    <div className="modal__content">
                        <h1 className="modal__content__title">{current}</h1>
                        <SettingsContent
                            current={current}
                            preferences={preferences}
                            setPreferences={setPreferences}
                            setData={setData}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
