import {User} from "../data/user.js";
import {Comparator, ObjectValues} from "../../typedefs/typedefs.js";

export const SortOrder = {
    ascending: 'ascending',
    descending: 'descending',
} as const;

export type SortOrderType = ObjectValues<typeof SortOrder>;

export function sortedUsers(users: User[], sortComparator: Comparator<User>, sortOrder: SortOrderType = SortOrder.ascending) {

    let usersCopy = [...users];

    usersCopy = usersCopy.sort(
        sortOrder === SortOrder.ascending ? sortComparator : (u1, u2) => sortComparator(u2, u1)
    );
    return usersCopy;

}

export const Sort = {
    byName: (u1: User, u2: User) => u1.full_name.localeCompare(u2.full_name),
    byAge: (u1: User, u2: User) => u1.age - u2.age,
    byBirthday: (u1: User, u2: User) => u2.b_date.localeCompare(u1.b_date),
    byCountry: (u1: User, u2: User) => u1.country.localeCompare(u2.country),
    byCourse: (u1: User, u2: User) => u1.course.localeCompare(u2.course)
}
