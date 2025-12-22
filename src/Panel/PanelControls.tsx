import { useState } from 'react';
import addFile from '../assets/pictures/add_file.svg';
import settings from '../assets/pictures/settings.svg';
import upload from '../assets/pictures/upload.svg';
import zen from '../assets/pictures/zen.svg';
import ImportStatuses from '../Statuses/ImportStatuses';
import { ImportStatusType } from '../types';

export default function PanelControls({
    createNewFile,
    importFiles,
    clearAllStatuses,
    statuses,
    toggleZenMode,
    openSettingsModal,
}: {
    createNewFile: () => void;
    importFiles: React.ChangeEventHandler<HTMLInputElement>;
    clearAllStatuses: () => void;
    statuses: ImportStatusType[];
    toggleZenMode: () => void;
    openSettingsModal: () => void;
}) {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const toggleImportPanelCollapse = () => setIsCollapsed(!isCollapsed);
    return (
        <section className="panel__controls">
            <div className="panel__controls__section">
                <button
                    className="btn-img btn-img--default"
                    onClick={createNewFile}
                    aria-label="Create a new file"
                >
                    <img src={addFile} alt="Create file icon" />
                </button>
                <button
                    className={
                        !isCollapsed
                            ? 'btn-img btn-img--default active'
                            : 'btn-img btn-img--default'
                    }
                    onClick={toggleImportPanelCollapse}
                    aria-label="Show import panel"
                >
                    <img src={upload} alt="Import icon" />
                </button>
            </div>

            {!isCollapsed ? (
                <ImportStatuses
                    statuses={statuses}
                    clearAllStatuses={clearAllStatuses}
                    importFiles={importFiles}
                />
            ) : (
                ''
            )}

            {/* SEARCH BUTTON HERE */}

            <div className="panel__controls__section">
                <button
                    className="btn-img btn-img--default"
                    onClick={toggleZenMode}
                    aria-label="Enter Zen mode"
                >
                    <img src={zen} alt="Zen mode icon" />
                </button>
                <button
                    className="btn-img btn-img--default"
                    onClick={() => {
                        openSettingsModal();
                        setIsCollapsed(true);
                    }}
                    aria-label="Open settings modal"
                >
                    <img src={settings} alt="Settings icon" />
                </button>
            </div>
        </section>
    );
}
