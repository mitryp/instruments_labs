import {randomUserMock, additionalUsers} from "./FE4U-Lab3-mock.js";
import {normalizeUserData, mergeUserArrays} from "../users/normalize/normalize_data.js";
import {courses, User, UserInterface} from "../users/data/user.js";

export function mockUserData(): User[] {
    const data = mergeUserArrays(normalizeUserData(randomUserMock), additionalUsers as UserInterface[]);

    for (const user of data) {
        for (const key in randomMocks) {
            user[key] ??= randomMocks[key]();
        }
    }

    return data;
}

export const randomMocks = {
    id: () => randomIntegers(0, 10, 10).join(''),
    bg_color: () => '#' + randomIntegers(0, 256, 3).map((n) => n.toString(16)).join(''),
    favorite: randomBool,
    course: () => randomChoose(courses),
    note: () => "A 42 is the answer to the question"
}

function randomInt(origin: number, bound: number): number {
    return Math.floor(Math.random() * (bound - origin) + origin);
}

function randomBool(): boolean {
    return !!randomInt(0, 2);
}

function randomChoose<T>(array: T[]): T {
    return array[randomInt(0, array.length)];
}

function randomIntegers(origin: number, bound: number, count: number): number[] {
    const res: number[] = [];

    for (let i = 0; i < count; ++i) {
        res.push(randomInt(origin, bound));
    }

    return res;
}
