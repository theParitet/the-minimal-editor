import { useState } from 'react';
import { SettingsContent } from './SettingsMenu';
import cross from '../assets/pictures/cross.svg';
import {
    Preferences,
    SetDataFunction,
    SettingsMenuType,
    SettingsMenuTypes,
} from '../types';

export function SettingsModal({
    handleInert,
    preferences,
    setPreferences,
    setData,
}: {
    handleInert: () => void;
    preferences: Preferences;
    setPreferences: React.Dispatch<React.SetStateAction<Preferences>>;
    setData: SetDataFunction;
}) {
    const [current, setCurrent] = useState<SettingsMenuType>('About');

    return (
        <main id="modal-container">
            <div>
                <button
                    className="btn-img btn-img--default"
                    onClick={handleInert}
                >
                    <img src={cross} alt="" />
                </button>

                <div className="modal">
                    <div className="modal__options">
                        {SettingsMenuTypes.map(option => {
                            return (
                                <button
                                    className={
                                        'modal__options__option' +
                                        (current === option ? ' active' : '')
                                    }
                                    onClick={() => setCurrent(option)}
                                    key={option}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
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
