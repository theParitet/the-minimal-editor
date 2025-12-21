import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

import expand from './assets/pictures/expand.svg';
import zenIcon from './assets/pictures/zen.svg';
import githubIcon from './assets/pictures/github-mark-white.svg';

import './App.css';
import { Notifications } from './Notifications/Notifications';
import { EditorControls } from './Editor/EditorControls';
import { Editor } from './Editor/Editor';
import { PanelControls } from './Panel/PanelControls';
import { PanelFiles } from './Panel/PanelFiles';
import { SettingsModal } from './Modal/SettingsModal';

import {
    File,
    FileImportData,
    ImportStatus,
    Notification,
    Preferences,
} from './types';
import { PREDEFINED_NOTIFICATIONS, Readme } from './constants';

let importedId: number = 0;

let data: File[];
const savedData = localStorage.getItem('saves');
if (!savedData) {
    data = [Readme];
} else {
    data = JSON.parse(savedData);
}

let pref: Preferences;
const savedPref = localStorage.getItem('pref');
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
const lastItem = localStorage.getItem('last');

if (lastItem) {
    id = parseInt(lastItem);
}

export default function App() {
    const [fileId, setFileId] = useState<number | null>(id);
    const [saves, setSaves] = useState<File[]>(data);
    const [statuses, setStatuses] = useState<ImportStatus[]>([]);
    const [isPanelCollapsed, setIsPanelCollapsed] = useState<boolean>(true);

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const [preferences, setPreferences] = useState<Preferences>(pref);
    const [inert, setInert] = useState(false);
    const [zen, setZen] = useState(false);

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const currentFile: File | undefined = saves.find(
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

    const handleNewFile = () => {
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

        setData('saves', copy);
        setData('last', nextId);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            setData('saves', modifiedSaves);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            setData('saves', modifiedSaves);
        }
    };

    const handleAddReadme = () => {
        if (!saves.some(save => save.id === -1)) {
            const copy = saves.slice();
            copy.push(Readme);
            setSaves(copy);
            setData('saves', copy);
        }
        setFileId(-1);
        setData('last', -1);
    };

    function changeFile(id: number) {
        setFileId(id);
        setData('last', id);
        setIsPanelCollapsed(true);
    }

    function deleteFile(id: number) {
        if (id === fileId) {
            setFileId(null);
            setData('last', null);
        }

        const modifiedSaves = saves.filter(save => save.id !== id);
        setSaves(modifiedSaves);
        setData('saves', modifiedSaves);
    }

    const handleStatusesDelete = () => {
        setStatuses([]);
    };

    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

                setData('saves', tempSaves, {
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
                setData('last', nextId, { throwError: true });
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
        setData('saves', tempSaves);
    };

    const handleExport = () => {
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

    function addNotification(notification: Notification) {
        setNotifications(prev => [notification, ...prev]);
    }

    const handleDeleteNotification = (key: string) => {
        const copy = notifications.slice();
        setNotifications(copy.filter(notification => notification.key !== key));
    };

    function setData(
        key: 'saves' | 'last' | 'pref',
        data: object | string | number | null,
        options?: {
            notification?: Notification;
            throwError?: boolean;
        }
    ): boolean {
        const {
            notification = PREDEFINED_NOTIFICATIONS.STORAGE_EXCEEDED,
            throwError = false,
        } = options || {};
        try {
            localStorage.setItem(key, JSON.stringify(data));
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
                <button className="header__btn" onClick={handleAddReadme}>
                    Learn more
                </button>
                <a
                    className="btn-img btn-img--default"
                    href="https://github.com/theParitet/the-minimal-editor"
                    target="_blank"
                    style={{
                        position: 'absolute',
                        right: '.3rem',
                    }}
                >
                    <img width={24} src={githubIcon} />
                </a>
            </header>

            {inert &&
                createPortal(
                    <SettingsModal
                        handleInert={() => setInert(!inert)}
                        preferences={preferences}
                        setPreferences={setPreferences}
                        setData={setData}
                    />,
                    document.body
                )}

            {notifications.length !== 0 && (
                <Notifications
                    notifications={notifications}
                    handleDeleteNotification={handleDeleteNotification}
                    inert={inert}
                />
            )}

            <main
                id="manager"
                className={
                    (!zen ? '' : ' zen') + (preferences.inset ? ' inset' : '')
                }
                inert={inert}
            >
                {zen && (
                    <button className="btn-zen" onClick={() => setZen(!zen)}>
                        <img src={zenIcon} alt="" />
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
                        handleNewFile={handleNewFile}
                        handleImport={handleImport}
                        handleStatusesDelete={handleStatusesDelete}
                        handleZen={() => {
                            setZen(!zen);
                            setIsPanelCollapsed(true);
                        }}
                        handleSettings={() => {
                            setInert(!inert);
                            setIsPanelCollapsed(true);
                        }}
                    />
                    <PanelFiles
                        id={fileId}
                        saves={saves}
                        changeFile={changeFile}
                        deleteFile={deleteFile}
                        preferences={preferences}
                    />
                    <button
                        className="manager__panel__expand-btn"
                        onClick={() => {
                            setIsPanelCollapsed(!isPanelCollapsed);
                        }}
                    >
                        <img
                            src={expand}
                            alt=""
                            style={
                                !isPanelCollapsed ? { rotate: '180deg' } : {}
                            }
                        />
                    </button>
                </article>

                <article id="editor" className="manager__editor">
                    <EditorControls
                        hasChosenFile={currentFile ? true : false}
                        handleExport={handleExport}
                    />
                    <Editor
                        isPanelCollapsed={isPanelCollapsed}
                        file={currentFile}
                        titleRef={titleRef}
                        contentRef={contentRef}
                        handleTitleChange={handleTitleChange}
                        handleContentChange={handleContentChange}
                    />
                </article>
            </main>
        </>
    );
}
