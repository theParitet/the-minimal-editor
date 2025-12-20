import { Preferences, File as FileType } from '../types';
import { File } from './File';

export function PanelFiles({
    saves,
    id,
    changeFile,
    deleteFile,
    preferences,
}: {
    saves: FileType[];
    id: number | null;
    changeFile: (id: number) => void;
    deleteFile: (id: number) => void;
    preferences: Preferences;
}) {
    return (
        <section className="panel__files">
            {saves.length ? (
                saves.map(file => {
                    const isSelected = file.id === id;
                    return (
                        <File
                            key={file.id}
                            isSelected={isSelected}
                            title={file.title}
                            preferences={preferences}
                            handleFileChange={() => changeFile(file.id)}
                            handleFileDelete={() => deleteFile(file.id)}
                        />
                    );
                })
            ) : (
                <p
                    style={{
                        textAlign: 'center',
                        color: '#aaa',
                    }}
                >
                    Nothing here yet...
                </p>
            )}
        </section>
    );
}
