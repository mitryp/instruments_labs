import {randomUserMock, additionalUsers} from "./FE4U-Lab3-mock.js";
import {normalizeUserData, mergeUserArrays} from "./../normalize/normalize_data.js";

export function mockUserData() {
    const data = mergeUserArrays(normalizeUserData(randomUserMock), additionalUsers);

    for (const user of data) {
        for (const key in randomMocks) {
            user[key] ??= randomMocks[key]();
        }
    }

    return data;
}

const randomMocks = {
    id: () => randomIntegers(0, 10, 10).join(''),
    bg_color: () => '#' + randomIntegers(0, 256, 3).map((n) => (+n).toString(16)).join(''),
    favorite: randomBool,
    course: () => randomChoose(['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology',
        'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics']),
    note: () => "A 42 is the answer to the question"
}

function randomInt(origin, bound) {
    return Math.floor(Math.random() * (bound - origin) + origin);
}

function randomBool() {
    return !!randomInt(0, 2);
}

function randomChoose(array) {
    return array[randomInt(0, array.length)];
}

function randomIntegers(origin, bound, count) {
    const res = [];

    for (let i = 0; i < count; ++i) {
        res.push(randomInt(origin, bound));
    }

    return res;
}
