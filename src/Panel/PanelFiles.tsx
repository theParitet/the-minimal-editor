import { Preferences, FileType as FileType } from '../types';
import File from './File';

export default function PanelFiles({
    saves,
    id,
    switchFile,
    deleteFile,
    preferences,
}: {
    saves: FileType[];
    id: number | null;
    switchFile: (id: number) => void;
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
                            switchFile={() => switchFile(file.id)}
                            deleteFile={() => deleteFile(file.id)}
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
