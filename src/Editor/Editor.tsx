import { useEffect, useRef } from 'react';
import { File } from '../types';
import { placeholderPhrases } from '../constants';

export function Editor({
    isPanelCollapsed,
    handleContentChange,
    handleTitleChange,
    titleRef,
    contentRef,
    file,
}: {
    isPanelCollapsed: boolean;
    handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    titleRef: React.RefObject<HTMLInputElement | null>;
    contentRef: React.RefObject<HTMLTextAreaElement | null>;
    file: File | undefined;
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
                className={noFileIsSelected ? 'editor disabled' : 'editor'}
                placeholder="Your title..."
                spellCheck={true}
                onChange={handleTitleChange}
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
                className={noFileIsSelected ? 'editor disabled' : 'editor'}
                onChange={handleContentChange}
                spellCheck={true}
                placeholder={placeholder.current}
                disabled={noFileIsSelected || isDisabled}
                value={noFileIsSelected ? ' ' : file?.content || ''}
                ref={contentRef}
            ></textarea>
        </div>
    );
}
