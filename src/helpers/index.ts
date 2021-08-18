export const throwError = (error: string | object) => {
    if (typeof error === 'string') {
        throw new TypeError(error);
    } else {
        console.error(error);
    }
};

export * from './fs';
