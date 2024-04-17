/**
 * An object containing the validation functions.
 * @type {{note: (function(*)), country: (function(*)), full_name: (function(*)), gender: (function(*): boolean), city: (function(*)), state: (function(*)), age: (function(*): boolean), email: (function(*))}}
 */
export const validation = {
    full_name: validateTextValue,
    gender: isString,
    note: validateTextValue,
    state: validateTextValue,
    city: validateTextValue,
    country: validateTextValue,
    age: isNumber,
    email: validateEmail
}

const countryPhoneFormats = {
    'germany': /0\d{3}-\d{7}/,
    'united states': /\(\d{3}\)-\d{3}-\d{4}/,
    'australia': /02-\d{4}-\d{4}/
}


export function validateUser(user) {
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
export function validatePhone(phone, country) {
    if (!(isString(phone) && isString(country)))
        return true;

    let format = countryPhoneFormats[country.toLowerCase()];

    return format?.test(phone) ?? true;
}

function validateEmail(email) {
    return isString(email) && (/[\w.]+@\w+\.[\w.]*\w/).test(email);
}

/**
 * Checks if the given value is a string, and starts with a capital letter.
 * @param text {any}
 * @return {boolean}
 */
function validateTextValue(text) {
    return isString(text) && text.at(0).toUpperCase() !== text.at(0).toLowerCase();
}

function isString(value) {
    return typeof value === 'string';
}

function isNumber(value) {
    return typeof value === 'number';
}