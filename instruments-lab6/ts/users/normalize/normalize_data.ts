import {User, UserInterface} from "../data/user.js";

export function normalizeUserData(jsonData: any): User[] {
    return jsonData.map(User.fromMockJSON);
}

/**
 * Merges the users from arr2 into arr1.
 * If a user exists in arr1, it fills the fields with the existing values of that user from arr2.
 */
export function mergeUserArrays(arr1: UserInterface[], arr2: UserInterface[]): User[] {
    arr1 ??= [];
    arr2 ??= [];

    for (const addUser of arr2) {
        const existing =
            arr1.find(u => u.full_name === addUser.full_name || u.email === addUser.email);

        if (!existing) {
            arr1.push(new User(addUser));
            continue;
        }

        for (const key in addUser) {
            existing[key] = addUser[key];
        }
    }

    return arr1.map(u => new User(u));
}
