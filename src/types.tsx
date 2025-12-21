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

export const LocalStorageContainer = {
    FILES_STORAGE: 'saves',
    LAST_FILE_OPENED: 'last',
    USER_PREFERENCES: 'pref',
} as const;
export type LocalStorageKey = keyof typeof LocalStorageContainer;
export type LocalStorageValue = (typeof LocalStorageContainer)[LocalStorageKey];

export type SetDataOptions = {
    notification?: Notification;
    throwError?: boolean;
};

export type SetDataFunction = (
    key: LocalStorageKey,
    data: object | string | number | null,
    options?: SetDataOptions
) => boolean;

export const SettingsMenuTypes = ['Appearance', 'Storage', 'About'] as const;
export type SettingsMenuType = (typeof SettingsMenuTypes)[number];
