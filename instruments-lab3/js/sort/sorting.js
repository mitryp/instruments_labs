export function sortedUsers(users, sortComparator, sortOrder = SortOrder.ascending) {
    let usersCopy = [...users];

    usersCopy = usersCopy.sort(
        sortOrder === SortOrder.ascending ? sortComparator : (u1, u2) => sortComparator(u2, u1)
    );

    return usersCopy;
}

export const Sort = {
    byName: (u1, u2) => u2.full_name.localeCompare(u1.full_name),
    byAge: (u1, u2) => u1.age - u2.age,
    byBirthday: (u1, u2) => u2.b_day.localeCompare(u1.b_day),
    byCountry: (u1, u2) => u2.country.localeCompare(u2.country)
}

export const SortOrder = {
    ascending: 0,
    descending: 1,
}

export class SortQueryBuilder {
    constructor() {

    }
}