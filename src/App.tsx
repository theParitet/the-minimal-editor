import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

import expand from './assets/pictures/expand.svg';
import zenIcon from './assets/pictures/zen.svg';
import githubIcon from './assets/pictures/github-mark-white.svg';

import './App.css';
import Notifications from './Notifications/Notifications';
import EditorControls from './Editor/EditorControls';
import Editor from './Editor/Editor';
import PanelControls from './Panel/PanelControls';
import PanelFiles from './Panel/PanelFiles';
import SettingsModal from './Modal/SettingsModal';

import {
    FileType,
    FileImportData,
    ImportStatusType,
    LocalStorageKey,
    LocalStorageContainer,
    NotificationType,
    Preferences,
    SetDataOptions,
} from './types';
import { PREDEFINED_NOTIFICATIONS, Readme } from './constants';
import { getItem, setItem } from './utils';

let importedId: number = 0;

let data: FileType[];
const savedData = getItem(LocalStorageContainer.FILES_STORAGE);
if (!savedData) {
    data = [Readme];
} else {
    data = JSON.parse(savedData);
}

let pref: Preferences;
const savedPref = getItem(LocalStorageContainer.USER_PREFERENCES);
if (!savedPref) {
    pref = {
        inset: false,
        space: 0.25,
        smoothness: 0.5,
    };
} else {
    pref = JSON.parse(savedPref);
}

let id: number;
const lastItem = getItem(LocalStorageContainer.LAST_FILE_OPENED);

if (lastItem) {
    id = parseInt(lastItem);
}

export default function App() {
    const [fileId, setFileId] = useState<number | null>(id);
    const [saves, setSaves] = useState<FileType[]>(data);
    const [statuses, setStatuses] = useState<ImportStatusType[]>([]);
    const [isPanelCollapsed, setIsPanelCollapsed] = useState<boolean>(true);

    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    const [preferences, setPreferences] = useState<Preferences>(pref);
    const [inert, setInert] = useState(false);
    const [zen, setZen] = useState(false);

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const currentFile: FileType | undefined = saves.find(
        save => save.id === fileId
    );

    function getNextId(givenSaves = saves) {
        let lastId = 0;

        const ids = givenSaves.map(save => save.id);
        ids.forEach(id => {
            if (id > lastId) {
                lastId = id + 1;
            } else if (id === lastId) {
                lastId++;
            }
        });
        return lastId;
    }

    const createNewFile = () => {
        const copy = saves.slice();
        const nextId = getNextId();
        copy.push({
            id: nextId,
            title: '',
            content: '',
        });

        setSaves(copy);
        setFileId(nextId);
        setTimeout(() => {
            titleRef.current?.focus();
        }, 1);

        setData('FILES_STORAGE', copy);
        setData('LAST_FILE_OPENED', nextId);
    };

    const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (fileId || fileId === 0) {
            const modifiedSaves = saves.map(save => {
                if (save.id !== fileId) {
                    return save;
                } else {
                    const text = e.target.value + '';
                    return {
                        ...save,
                        content: text,
                    };
                }
            });
            setSaves(modifiedSaves);
            setData('FILES_STORAGE', modifiedSaves);
        }
    };

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (fileId || fileId === 0) {
            let title = e.target.value;

            const modifiedSaves = saves.map(save => {
                if (save.id !== fileId) {
                    return save;
                } else {
                    return {
                        ...save,
                        title: title,
                    };
                }
            });

            setSaves(modifiedSaves);
            setData('FILES_STORAGE', modifiedSaves);
        }
    };

    const addReadmeFile = () => {
        if (!saves.some(save => save.id === -1)) {
            const copy = saves.slice();
            copy.push(Readme);
            setSaves(copy);
            setData('FILES_STORAGE', copy);
        }
        if (fileId === -1) {
            addNotification({
                key: 'ALREADY_HAVE_README_OPENED',
                type: 'info',
                title: '',
                description: "You're already on the learn more note.",
            });
        }
        setFileId(-1);
        setData('LAST_FILE_OPENED', -1);
    };

    function switchToFile(id: number) {
        setFileId(id);
        setData('LAST_FILE_OPENED', id);
        setIsPanelCollapsed(true);
    }

    function deleteFile(id: number) {
        if (id === fileId) {
            setFileId(null);
            setData('LAST_FILE_OPENED', null);
        }

        const modifiedSaves = saves.filter(save => save.id !== id);
        setSaves(modifiedSaves);
        setData('FILES_STORAGE', modifiedSaves);
    }

    const clearAllStatuses = () => {
        setStatuses([]);
    };

    const importFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const initFiles = e.target.files;
        if (initFiles === null) return;
        const fileData: FileImportData[] = []; //title + error (if any)

        const tempSaves = saves.slice();
        for (const file of initFiles) {
            let title = file.name;

            try {
                const content = await file.text();

                const nextId = getNextId(tempSaves);
                const fileObj = {
                    id: nextId,
                    title: title,
                    content: content,
                };

                tempSaves.push(fileObj);

                setData('FILES_STORAGE', tempSaves, {
                    notification: {
                        key: `FILELOAD::FAIL::${title}`,
                        type: 'danger',
                        title: 'Unable to Load File',
                        description: (
                            <p className="notification__description">
                                The{' '}
                                <strong>
                                    <code>{title}</code>
                                </strong>{' '}
                                file could not be loaded due to the insufficient
                                space in the browser memory (taking up more than
                                5MB).
                            </p>
                        ),
                    },
                    throwError: true,
                });
                setData('LAST_FILE_OPENED', nextId, { throwError: true });
                setFileId(nextId);

                fileData.push({
                    title: title,
                    error: '',
                });
            } catch (err) {
                if (err instanceof Error) {
                    tempSaves.pop();

                    console.error(err);
                    fileData.push({
                        title: title,
                        error: err.message,
                    });
                }
            }
        }

        const copy = statuses.slice();
        copy.push({
            id: importedId++,
            files: fileData,
        });
        setStatuses(copy);

        setSaves(tempSaves);
        setData('FILES_STORAGE', tempSaves);
    };

    const exportCurrentFile = () => {
        if (currentFile === undefined) return;
        const blob = new Blob([currentFile.content], { type: 'text/*' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);

        const fileName = currentFile.title;

        const fileExtensionRegex = /(\.[a-zA-Z]{1,5})$/g;
        const isLegitFileExtension = fileExtensionRegex.test(fileName);
        const extension = isLegitFileExtension ? '' : '.txt';
        const exportedFileName = fileName
            ? fileName + extension
            : 'New File' + currentFile.id + extension;

        link.download = exportedFileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(link.href);
    };

    function addNotification(notification: NotificationType) {
        setNotifications(prev => [notification, ...prev]);
    }

    const removeNotificationByKey = (key: string) => {
        const copy = notifications.slice();
        setNotifications(copy.filter(notification => notification.key !== key));
    };

    function setData(
        key: LocalStorageKey,
        data: object | string | number | null,
        options?: SetDataOptions
    ): boolean {
        const {
            notification = PREDEFINED_NOTIFICATIONS.STORAGE_EXCEEDED,
            throwError = false,
        } = options || {};
        try {
            setItem(LocalStorageContainer[key], JSON.stringify(data));
            return true;
        } catch (e) {
            if (e instanceof Error) {
                addNotification(notification);
                if (throwError) {
                    throw new Error(e.name);
                }
            }
            return false;
        }
    }

    return (
        <>
            <header className="header" inert={inert}>
                <h1 className="header__hero">
                    The <span className="header__hero--highlight">Minimal</span>{' '}
                    Editor
                </h1>
                <button className="header__btn" onClick={addReadmeFile}>
                    Learn more
                </button>
                <a
                    className="btn-img btn-img--default"
                    href="https://github.com/theParitet/the-minimal-editor"
                    target="_blank"
                    aria-label="Visit GitHub repository"
                    style={{
                        position: 'absolute',
                        right: '.3rem',
                    }}
                >
                    <img width={24} src={githubIcon} alt="GitHub icon" />
                </a>
            </header>

            {inert &&
                createPortal(
                    <SettingsModal
                        closeModal={() => setInert(!inert)}
                        preferences={preferences}
                        setPreferences={setPreferences}
                        setData={setData}
                    />,
                    document.body
                )}

            <Notifications
                notifications={notifications}
                removeNotificationByKey={removeNotificationByKey}
                inert={inert}
            />

            <main
                id="manager"
                className={
                    (!zen ? '' : ' zen') + (preferences.inset ? ' inset' : '')
                }
                inert={inert}
            >
                {zen && (
                    <button
                        className="btn-zen"
                        onClick={() => setZen(!zen)}
                        aria-label="Exit Zen mode"
                    >
                        <img src={zenIcon} alt="Zen mode icon" />
                    </button>
                )}

                <article
                    id="panel"
                    className={
                        !isPanelCollapsed
                            ? 'manager__panel'
                            : 'manager__panel collapsed'
                    }
                >
                    <PanelControls
                        statuses={statuses}
                        createNewFile={createNewFile}
                        importFiles={importFiles}
                        clearAllStatuses={clearAllStatuses}
                        toggleZenMode={() => {
                            setZen(!zen);
                            setIsPanelCollapsed(true);
                        }}
                        openSettingsModal={() => {
                            setInert(!inert);
                            setIsPanelCollapsed(true);
                        }}
                    />
                    <PanelFiles
                        id={fileId}
                        saves={saves}
                        switchFile={(id: number) => {
                            switchToFile(id);
                            setTimeout(() => {
                                titleRef.current?.focus();
                            }, 1);
                        }}
                        deleteFile={deleteFile}
                        preferences={preferences}
                    />
                    <button
                        className="manager__panel__expand-btn"
                        onClick={() => {
                            setIsPanelCollapsed(!isPanelCollapsed);
                        }}
                        aria-label={
                            isPanelCollapsed
                                ? 'Expand file panel'
                                : 'Collapse file panel'
                        }
                    >
                        <img
                            src={expand}
                            alt="Expand/Collapse icon"
                            style={
                                !isPanelCollapsed ? { rotate: '180deg' } : {}
                            }
                        />
                    </button>
                </article>

                <article id="editor" className="manager__editor">
                    <EditorControls
                        hasSelectedAFile={currentFile ? true : false}
                        exportCurrentFile={exportCurrentFile}
                    />
                    <Editor
                        isPanelCollapsed={isPanelCollapsed}
                        file={currentFile}
                        titleRef={titleRef}
                        contentRef={contentRef}
                        onTitleChange={onTitleChange}
                        onContentChange={onContentChange}
                    />
                </article>
            </main>
        </>
    );
}
