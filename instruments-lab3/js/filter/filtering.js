export function filteredUsers(users, ...filters) {
    const usersCopy = [...users];
    const compiledFilters = compileFiltersToPredicate(filters);

    return usersCopy.filter(compiledFilters);
}

export const Filters = {
    byCountry: (country) => (user) => user.country.toLowerCase() === country.toLowerCase(),
    byAge: ageFilter,
    byGender: (gender) => (user) => user.gender.toLowerCase() === gender.toLowerCase(),
    favorite: (user) => user.favorite === true
}

export function greaterThan(value) {
    return (x) => x > value;
}

export function lessThan(value) {
    return (x) => x < value;
}

export function between(val1, val2) {
    return (x) => x >= val1 && x <= val2;
}

export function is(value) {
    return (x) => x === value;
}

function ageFilter(agePredicate) {
    if (typeof agePredicate === 'number')
        return (user) => user.age === agePredicate;

    return (user) => agePredicate(user.age);
}

/**
 * @param filters {Function<Object, boolean>[]}
 * @return {function(user): boolean}
 */
function compileFiltersToPredicate(filters) {
    return (user) => filters.every(filter => filter(user));
}
