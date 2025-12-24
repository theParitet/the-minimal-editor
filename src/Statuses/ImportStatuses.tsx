import { useEffect, useRef } from 'react';
import { ImportStatusType } from '../types';
import ImportStatus from './ImportStatus';

export default function ImportStatuses({
    statuses,
    importFiles,
    clearAllStatuses,
}: {
    importFiles: React.ChangeEventHandler<HTMLInputElement>;
    clearAllStatuses: () => void;
    statuses: ImportStatusType[];
}) {
    const fileReaderRef = useRef<HTMLInputElement>(null);
    const StatusesJSX = statuses.map(status => {
        return <ImportStatus fileData={status.files} key={status.id} />;
    });
    const placeholderJSX = <p className="placeholder">No imports yet...</p>;

    useEffect(() => {
        fileReaderRef.current?.focus();
    }, []);

    return (
        <div id="import-panel" className="statuses-container">
            <div className="statuses-container__controls">
                <label htmlFor="file-reader" className="btn btn--default">
                    Import
                </label>
                <input
                    id="file-reader"
                    ref={fileReaderRef}
                    aria-label="Import a text file"
                    onChange={importFiles}
                    multiple={true}
                    type="file"
                    accept="text/*"
                />

                <button
                    className="btn btn--default"
                    aria-label="Clear the upload status messages"
                    onClick={clearAllStatuses}
                >
                    Clear
                </button>
            </div>
            <ul className="statuses-container__imports">
                {statuses.length ? StatusesJSX : placeholderJSX}
            </ul>
        </div>
    );
}
