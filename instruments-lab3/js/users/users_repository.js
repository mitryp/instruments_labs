import {filteredUsers} from "../filter/filtering.js";
import {sortedUsers, SortOrder} from "../sort/sorting.js";

export class UserRepository {
    users;

    constructor(normalizedUserData) {
        this.users = normalizedUserData;
    }

    /**
     * Returns a shallow copy of the users stored in the repository
     */
    copy() {
        return [...this.users];
    }

    /**
     * Returns a copy of the users stored in the repository filtered by the given filter functions
     * (see {@link Filters}).
     */
    filtered(...filters) {
        return filteredUsers(this.copy(), ...filters);
    }

    /**
     * Returns a copy of the users stored in the repository sorted by the given {@link Sort sort function} and optional
     * {@link SortOrder sort order}.
     * Sorts in ascending order by default.
     */
    sorted(sortFunction, sortOrder = SortOrder.descending) {
        return sortedUsers(this.copy(), sortFunction, sortOrder);
    }

    /**
     * Sorts the users in the repository by the specified {@link Sort sort function} and optional
     * {@link SortOrder sort order}.
     * Sorts in ascending order by default.
     */
    sort(sortFunction, sortOrder = SortOrder.descending) {
        this.users = this.sorted(sortFunction, sortOrder);
    }

    search(query) {
        const normalizedQuery = typeof query === 'number' ? Math.floor(query) : query.trim().toLowerCase();

        return this.filtered((u) => u.full_name.toLowerCase().includes(normalizedQuery)
            || u.age == query
            || u.note.toLowerCase().includes(normalizedQuery));
    }

    percentageSatisfyingQuery(query) {
        return Math.floor(this.search(query).length / this.count * 100);
    }

    get count() {
        return this.users.length;
    }
}