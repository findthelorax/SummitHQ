import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function normalizePhoneNumber(phoneNumber: string): string {
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, 'US');
    if (!phoneNumberObj || !phoneNumberObj.isValid()) {
        throw new Error('Invalid phone number');
    }
    return phoneNumberObj.format('E.164');
}
