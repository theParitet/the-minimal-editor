import { useState } from 'react';
import arrowDown from '../assets/pictures/arrow_down.svg';
import check from '../assets/pictures/check.svg';
import cross from '../assets/pictures/cross.svg';
import { FileImportData } from '../types';

export default function ImportStatus({
    fileData,
}: {
    fileData: FileImportData[];
}) {
    // each object in filedata array has 'title' and 'error'
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleImportStatusCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    let errors = 0;
    fileData.forEach(file => {
        if (file.error) {
            errors++;
        }
    });
    let totalFiles = fileData.length;

    const filesJSX = fileData.map((file, index) => {
        let classNameFile = 'status__files__file';
        let classNameCheck = 'status__check';
        if (file.error) {
            classNameFile += ' failure';
            classNameCheck += ' error';
        }
        return (
            <div className="status__files__file__container" key={index}>
                <div className={classNameFile}>{file.title}</div>
                <img
                    className={classNameCheck}
                    src={file.error ? cross : check}
                    alt={file.error ? 'A cross icon' : 'A check icon'}
                />
            </div>
        );
    });

    let message = 'Imported!';
    let classNameStatus = 'status';

    if (errors === totalFiles) {
        classNameStatus += ' failure';
        message = 'Import failed';
    } else if (errors) {
        classNameStatus += ' warning';
        message = 'Imported partially';
    }
    const placeholderJSX = <div className="placeholder">No files</div>;
    return (
        <div className={classNameStatus}>
            <button
                className="status__message"
                onClick={toggleImportStatusCollapse}
                aria-label={
                    isCollapsed
                        ? 'Expand the import status'
                        : 'Collapse the import status'
                }
            >
                <span>{message}</span>
                <div
                    className={
                        isCollapsed
                            ? 'btn-img arrow collapsed'
                            : 'btn-img arrow'
                    }
                >
                    <img
                        className="img--arrow"
                        src={arrowDown}
                        alt="Expand/Collapse arrow icon"
                    />
                </div>
            </button>

            <div
                className={
                    isCollapsed ? 'status__files collapsed' : 'status__files'
                }
            >
                <div className="status-wrapper">
                    {!totalFiles ? placeholderJSX : filesJSX}
                </div>
            </div>
        </div>
    );
}
