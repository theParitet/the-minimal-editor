import { useEffect, useRef } from 'react';
import { FileType } from '../types';
import { placeholderPhrases } from '../constants';

export default function Editor({
    isPanelCollapsed,
    onContentChange,
    onTitleChange,
    titleRef,
    contentRef,
    file,
}: {
    isPanelCollapsed: boolean;
    onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    titleRef: React.RefObject<HTMLInputElement | null>;
    contentRef: React.RefObject<HTMLTextAreaElement | null>;
    file: FileType | undefined;
}) {
    const placeholder = useRef('');
    useEffect(() => {
        placeholder.current =
            placeholderPhrases[
                Math.floor(Math.random() * placeholderPhrases.length)
            ];
    }, [file?.id]);

    const noFileIsSelected = file ? false : true;
    const isDisabled = !isPanelCollapsed;

    return (
        <div className="editor-container">
            <input
                type="text"
                id="editor__title"
                aria-label="File title"
                className={noFileIsSelected ? 'editor disabled' : 'editor'}
                placeholder="Your title..."
                spellCheck={true}
                onChange={onTitleChange}
                ref={titleRef}
                onKeyDown={e => {
                    const key = e.key.toLowerCase();
                    if (key === 'enter' || key === 'arrowdown') {
                        setTimeout(() => {
                            contentRef.current?.focus();
                        }, 1);
                    }
                }}
                disabled={noFileIsSelected || isDisabled}
                value={
                    noFileIsSelected
                        ? 'Select or Create a File'
                        : file?.title || ''
                }
            />
            <textarea
                id="editor__main"
                aria-label="File content"
                className={noFileIsSelected ? 'editor disabled' : 'editor'}
                onChange={onContentChange}
                spellCheck={true}
                placeholder={placeholder.current}
                disabled={noFileIsSelected || isDisabled}
                value={noFileIsSelected ? ' ' : file?.content || ''}
                ref={contentRef}
            ></textarea>
        </div>
    );
}
