import {User} from "../data/user.js";
import {Email} from "../data/email.js";

/**
 * An object containing the validation functions.
 */
export const validation = {
    full_name: validateTextValue,
    gender: isString,
    note: validateOptionalTextValue,
    state: validateOptionalTextValue,
    city: validateTextValue,
    country: validateTextValue,
    age: isNumber,
    email: (email: Email) => email.isValid
}

const countryPhoneFormats = {
    'germany': /0\d{3}-\d{7}/,
    'united states': /\(\d{3}\)-\d{3}-\d{4}/,
    'australia': /02-\d{4}-\d{4}/
}


export function validateUser(user: User) {
    for (const key in validation) {
        if (!validation[key](user[key]))
            return false;
    }

    return validatePhone(user.phone, user.country);
}

/**
 * Validates the phone number according to the given country.
 * Supports Germany, United States and Australia only.
 * For other countries returns true independently of the format.
 * @param phone {String}
 * @param country {String?}
 */
export function validatePhone(phone?: string, country?: string): boolean {
    if (!(isString(phone) && isString(country)))
        return true;

    let format: RegExp = countryPhoneFormats[country.toLowerCase()];

    return format?.test(phone) ?? true;
}

// function validateEmail(email?: string) {
//     return isString(email) && (/[\w.]+@\w+\.[\w.]*\w/).test(email);
// }

/**
 * Checks if the given value is a string, and starts with a capital letter.
 * @param text {any}
 * @return {boolean}
 */
function validateTextValue(text?: string): boolean {
    return isString(text) && text.charAt(0).toUpperCase() !== text.charAt(0).toLowerCase();
}

function validateOptionalTextValue(text?: string): boolean {
    return !text || text.length === 0 || validateTextValue(text);
}

function isString(value?: any): boolean {
    return typeof value === 'string' && value.length > 0;
}

function isNumber(value?: any): boolean {
    return typeof value === 'number';
}