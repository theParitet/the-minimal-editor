import file from '../assets/pictures/file.svg';
import trash from '../assets/pictures/trash.svg';
import { Preferences } from '../types';
import { CSSProperties } from 'react';

export function File({
    title,
    isSelected,
    handleFileChange,
    handleFileDelete,
    preferences,
}: {
    title: string;
    isSelected: boolean;
    handleFileChange: () => void;
    handleFileDelete: () => void;
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
            <button className={'record__file'} onClick={handleFileChange}>
                <img src={file} alt="File icon" />
                <p className={classNameTitle}>{title || 'Empty Title'}</p>
            </button>
            <button
                className="btn-img btn-img--danger record__trash"
                onClick={handleFileDelete}
            >
                <img src={trash} alt="Delete a file" />
            </button>
        </div>
    );
}
