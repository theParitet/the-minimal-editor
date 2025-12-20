import { Notification, File } from './types';

export const PREDEFINED_NOTIFICATIONS = {
    STORAGE_EXCEEDED: {
        key: 'PREDEF::STORAGE_EXCEEDED',
        type: 'danger',
        title: 'Unable to Save Changes',
        description:
            'Browser storage exceeded (more than 5MB of memory). Unable to write more data.',
    },
    STORAGE_NOT_PERSISTENT: {
        key: `PREDEF::STORAGE_NOT_PERSISTENT`,
        type: 'warning',
        title: 'Storage is not Persistent',
        description:
            'You are limited to the browser storage that is susceptible to erasing.',
    },
    UNKNOWN_ERROR: {
        key: `PREDEF::UNKNOWN_ERROR`,
        type: 'danger',
        title: 'Unknown Error',
        description: (
            <p className="notification__description">
                Unknown error. If being continuously encountered,{' '}
                <a
                    href="https://github.com/theParitet/the-minimal-editor/issues"
                    target="_blank"
                >
                    submit an issue
                </a>{' '}
                on GitHub.
            </p>
        ),
    },
} as const satisfies Record<string, Notification>;

export const VERSION = 'v0.1.2';

const readmeTitle = `⚙️ Your Minimal Editor ${VERSION}`;
const readmeContent = `[info]
This is a web-based plain text editor right in your browser. No links, no formatting, no images, no distraction.

This is just the first implementation of a minimal editor.

[features]
- Create, edit and delete text files
- Import and export the files
- Embrace Zen mode for focused writing
- Data is preserved with the browser local storage (5-10 megabytes of memory)
- Configure the appearance to your liking in the settings
- ... More to come!

[aspirations]
The editor will be continuously improved. It will:
- become more performant and reliable by using asynchronous and persistent storage
- have better UX by offering searching and sorting, smart titles, extended file structure and better customization
- offer offline functionality

[more]
If you wish to learn more, you can find additional information on GitHub by following the link in the header or About section of the settings.`;

export const Readme: File = {
    id: -1,
    title: readmeTitle,
    content: readmeContent,
};
