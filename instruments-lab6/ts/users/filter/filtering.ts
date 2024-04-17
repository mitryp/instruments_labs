import {User} from "../data/user.js";
import {Predicate} from "../../typedefs/typedefs.js";

export type Filter = (u: User) => boolean;

export function filteredUsers(users: User[], ...filters: Filter[]): User[] {
    const compiledFilters = compileFiltersToPredicate(filters);

    return users.filter(compiledFilters);
}

export const Filters = {
    byAge: ageFilter,
    byRegion: (region: string)=>
        function regionFilter(user: User) {
            return user.region === region;
        },
    byGender: (gender: string) =>
        function genderFilter(user) {
            return user.gender.toLowerCase() === gender.toLowerCase();
        },
    favorite: function favoritesFilter(user: User): boolean {
        return user.favorite;
    },
    withPhotos: function withPhotos(user: User): boolean {
        return user.picture_thumbnail?.length > 0;
    },
}

export function greaterThan(value: number): Predicate<number> {
    return (x) => x > value;
}

// export function lessThan(value: number): Predicate<number> {
//     return (x) => x < value;
// }

export function between(val1: number, val2: number): Predicate<number> {
    return (x) => x >= val1 && x <= val2;
}

export function is(value: number): Predicate<number> {
    return (x) => x === value;
}

function ageFilter(agePredicate: Predicate<number> | number): Predicate<User> {
    if (typeof agePredicate === 'number')
        return ageFilter(is(agePredicate));

    return function ageFilter(user) {
        return agePredicate(user.age);
    };
}

export function compileFiltersToPredicate(filters: Filter[]): Predicate<User> {
    if (!filters) return () => true;

    return (user) => filters.every(filter => filter(user));
}
