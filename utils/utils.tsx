export const getFirstLetterCapitalized = (str: string | null | undefined): string | null | undefined => {
    if (!str) return str;
    return str.charAt(0).toUpperCase();
}

export const capitalizeFirstLetter = (str: string | null | undefined): string | null | undefined => {
    if (!str) return str;
    return getFirstLetterCapitalized(str) + str.slice(1);
};

export const formatFileSize = (bytes: number | null): string | null => {
    if (bytes === null) return null;

    const k = 1024;
    const sizes = ['B', 'Kb', 'Mb', 'Gb', 'Tb'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
