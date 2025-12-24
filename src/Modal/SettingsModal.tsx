import { useEffect, useRef, useState } from 'react';
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
    const settingsCloseButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const settingsButton = document.activeElement as HTMLElement;

        const closeModelWithEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
        document.addEventListener('keydown', closeModelWithEscape);

        setTimeout(() => {
            settingsCloseButton.current?.focus();
        }, 10);

        return () => {
            setTimeout(() => {
                settingsButton.focus();
            }, 10);
            document.removeEventListener('keydown', closeModelWithEscape);
        };
    }, []);

    return (
        <main
            id="modal-container"
            aria-modal="true"
            role="dialog"
            aria-label="Settings"
        >
            <div>
                <div className="modal__top-bar">
                    <button
                        id="settings_menu_close_btn"
                        className="btn-img btn-img--default"
                        onClick={closeModal}
                        ref={settingsCloseButton}
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
