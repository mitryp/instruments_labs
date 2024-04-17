const fieldExtractors = {
    'gender': (j) => j.gender,
    'title': (j) => j.name.title,
    'full_name': (j) => [j.name.first ?? '', j.name.last ?? ''].join(' ').trim(),
    'city': (j) => j.location.city,
    'state': (j) => j.location.state,
    'country': (j) => j.location.country,
    'postcode': (j) => j.location.postcode,
    'coordinates': (j) => j.location.coordinates,
    'timezone': (j) => j.location.timezone,
    'email': (j) => j.email,
    'b_date': (j) => j.dob.date,
    'age': (j) => j.dob.age,
    'phone': (j) => j.phone,
    'picture_large': (j) => j.picture.large,
    'picture_thumbnail': (j) => j.picture.thumbnail
}

/**
 * @returns Object[]
 */
export function normalizeUserData(jsonData) {
    const normalized = [];

    for (const object of jsonData) {
        const nObj = {};

        for (const key in fieldExtractors) {
            nObj[key] = fieldExtractors[key](object);
        }

        normalized.push(nObj);
    }

    return normalized;
}

/**
 * Merges the users from arr2 into arr1.
 * If a user exists in arr1, it fills the fields with the existing values of that user from arr2.
 * @param arr1 Object[]
 * @param arr2 Object[]
 * @return Object[]
 */
export function mergeUserArrays(arr1, arr2) {
    for (const addUser of arr2) {
        const existing = arr1.find(
            u => u.full_name === addUser.full_name
                || u.email === addUser.email);

        if (existing === undefined) {
            arr1.push(addUser);
            continue;
        }

        for (const key in addUser) {
            existing[key] = addUser[key];
        }
    }

    return arr1
}

// function distinctByField(fieldExtractor, array) {
//     const result = [];
//     const fieldSet = new Set();
//
//     for (const object of array) {
//         const field = fieldExtractor(object);
//         if (fieldSet.has(field)) continue;
//         fieldSet.add(field);
//         result.push(object);
//     }
//
//     return result;
// }
