import file from '../assets/pictures/file.svg';
import trash from '../assets/pictures/trash.svg';
import { Preferences } from '../types';
import { CSSProperties } from 'react';

export default function File({
    title,
    isSelected,
    switchFile,
    deleteFile,
    preferences,
}: {
    title: string;
    isSelected: boolean;
    switchFile: () => void;
    deleteFile: () => void;
    preferences: Preferences;
}) {
    let classNameTitle = title ? 'record__title' : 'record__title empty';
    let classNameRecord = isSelected ? 'record selected' : 'record';

    return (
        <div
            className={classNameRecord}
            style={
                {
                    '--record-padding': `${preferences.space}rem`,
                    '--border-radius': `${preferences.smoothness}rem`,
                } as CSSProperties
            }
        >
            <button
                className={'record__file'}
                onClick={switchFile}
                aria-label={`Switch to ${title} file`}
            >
                <img src={file} alt="File icon" />
                <span className={classNameTitle}>{title || 'Empty Title'}</span>
            </button>
            <button
                className="btn-img btn-img--danger record__trash"
                onClick={deleteFile}
                aria-label="Delete this file"
            >
                <img src={trash} alt="Trash icon" />
            </button>
        </div>
    );
}
