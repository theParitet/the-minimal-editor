import download from '../assets/pictures/download.svg';
import downloadInactive from '../assets/pictures/download_inactive.svg';

export default function EditorControls({
    hasSelectedAFile,
    exportCurrentFile,
}: {
    hasSelectedAFile: boolean;
    exportCurrentFile: () => void;
}) {
    let className = 'btn-img';
    let img;
    if (!hasSelectedAFile) {
        className += ' inactive';
        img = downloadInactive;
    } else {
        className += ' btn-img--default';
        img = download;
    }
    return (
        <section className="editor__controls">
            <button
                className={className}
                onClick={exportCurrentFile}
                aria-label="Export the current file"
            >
                <img src={img} alt="Download icon" />
            </button>
        </section>
    );
}
