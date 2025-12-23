import file from '../assets/pictures/file.svg';
import search from '../assets/pictures/search.svg';
import trash from '../assets/pictures/trash.svg';
import { Preferences, SetDataFunction, SettingsMenuType } from '../types';
import { CSSProperties } from 'react';

export default function SettingsContent({
    current,
    preferences,
    setPreferences,
    setData,
}: {
    current: SettingsMenuType;
    preferences: Preferences;
    setPreferences: React.Dispatch<React.SetStateAction<Preferences>>;
    setData: SetDataFunction;
}) {
    switch (current) {
        case 'Appearance':
            return (
                <>
                    <p>
                        These settings are currently applied to a portion of the
                        elements.
                    </p>

                    <h2>Theme</h2>
                    <div className="settings__options">
                        <label
                            className="btn-img btn-img--default btn-inset"
                            htmlFor="btn-is-inset1"
                        >
                            <img src={search} alt="A magnifying glass icon" />
                        </label>
                        <label
                            className="btn-img btn-img--default"
                            htmlFor="btn-is-inset2"
                        >
                            <img src={search} alt="A magnifying glass icon" />
                        </label>
                    </div>

                    <div className="settings__options">
                        <input
                            id="btn-is-inset1"
                            aria-label="Inset theme"
                            type="radio"
                            name="option"
                            onChange={() => {
                                const pref = {
                                    ...preferences,
                                    inset: true,
                                };
                                setPreferences(pref);
                                setData('USER_PREFERENCES', pref);
                            }}
                            checked={preferences.inset}
                        />
                        <input
                            id="btn-is-inset2"
                            aria-label="Modern theme"
                            type="radio"
                            name="option"
                            onChange={() => {
                                const pref = {
                                    ...preferences,
                                    inset: false,
                                };
                                setPreferences(pref);
                                setData('USER_PREFERENCES', pref);
                            }}
                            checked={!preferences.inset}
                        />
                    </div>

                    <div className="settings__options grid">
                        <h2>Padding</h2>
                        <h2>Smoothness</h2>
                        <input
                            type="range"
                            aria-label="Padding"
                            min={0}
                            max={1}
                            step={0.05}
                            onChange={e => {
                                const pref: Preferences = {
                                    ...preferences,
                                    space: parseFloat(e.target.value),
                                };

                                setPreferences(pref);
                                setData('USER_PREFERENCES', pref);
                            }}
                            value={preferences.space}
                        />

                        <input
                            type="range"
                            aria-label="Smoothness"
                            min={0}
                            max={1}
                            step={0.05}
                            onChange={e => {
                                const value = e.target.value;
                                const pref: Preferences = {
                                    ...preferences,
                                    smoothness: parseFloat(value),
                                };
                                setPreferences(pref);
                                setData('USER_PREFERENCES', pref);
                            }}
                            value={preferences.smoothness}
                        />
                    </div>

                    <h2>Preview</h2>
                    <div
                        className={
                            'settings__options__preview ' +
                            (preferences.inset ? 'inset' : '')
                        }
                        style={{
                            display: 'block',
                            flexShrink: '0',
                        }}
                    >
                        <label
                            className="record"
                            style={
                                {
                                    margin: '0px auto',
                                    width: '75%',
                                    '--record-padding': `${preferences.space}rem`,
                                    '--border-radius': `${preferences.smoothness}rem`,
                                } as CSSProperties
                            }
                        >
                            <div className="record__file">
                                <img src={file} alt="File icon" />
                                <p
                                    className={'record__title'}
                                    style={{
                                        fontSize: `${0.7 + preferences.space / 1.5}rem`,
                                    }}
                                >
                                    Lorem ipsum dolor
                                </p>
                            </div>
                            <div className="btn-img btn-img--danger record__trash">
                                <img src={trash} alt="Trash icon" />
                            </div>
                        </label>
                        <label
                            className="record selected"
                            style={
                                {
                                    margin: '0px auto',
                                    width: '75%',
                                    '--record-padding': `${preferences.space}rem`,
                                    '--border-radius': `${preferences.smoothness}rem`,
                                } as CSSProperties
                            }
                        >
                            <div className="record__file">
                                <img src={file} alt="File icon" />
                                <p
                                    className={'record__title'}
                                    style={{
                                        fontSize: `${0.7 + preferences.space / 1.5}rem`,
                                    }}
                                >
                                    Lorem ipsum dolor
                                </p>
                            </div>
                            <div className="btn-img btn-img--danger record__trash">
                                <img src={trash} alt="Delete a file" />
                            </div>
                        </label>
                    </div>
                </>
            );
        case 'Storage':
            return (
                <>
                    <p className="placeholder">Coming soon...</p>
                </>
            );
        case 'About':
            return (
                <>
                    <p>
                        This is a project of a{' '}
                        <strong>client-side minimal editor</strong> for plain
                        text right in your browser.
                    </p>
                    <p>
                        You can check out the source code and contribute to the
                        project at the{' '}
                        <a
                            href="https://github.com/theParitet/the-minimal-editor"
                            target="_blank"
                        >
                            GitHub
                        </a>{' '}
                        repo.
                    </p>
                    <p>
                        If you find any bugs or want to contribute, feel free to
                        leave an issue or create a pull request.
                    </p>
                </>
            );
    }
}
