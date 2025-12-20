export type File = {
    id: number;
    title: string;
    content: string;
};

export type FileImportData = {
    title: string;
    error: string;
};
export type ImportStatus = {
    id: number;
    files: FileImportData[];
};

export type Notification = {
    key: string;
    type: 'danger' | 'warning' | 'info';
    title: string;
    description: React.ReactNode;
};

export type Preferences = {
    inset: boolean;
    space: number;
    smoothness: number;
};
