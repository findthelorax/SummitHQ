export function humanizeEnum(value: string) {
    return value
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/(^|\s)\S/g, (l) => l.toUpperCase());
}