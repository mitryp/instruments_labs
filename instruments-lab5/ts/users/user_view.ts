import {compileFiltersToPredicate, Filter, filteredUsers, Filters} from "./filter/filtering.js";
import {Sort, sortedUsers, SortOrder, SortOrderType} from "./sort/sorting.js";
import {User} from "./data/user.js";
import {Comparator} from "../typedefs/typedefs.js";

export class UserView {
    constructor(public users: User[]) {
    }

    /**
     * Returns a shallow copy of the users stored in the repository.
     */
    public copy(): User[] {
        return [...this.users];
    }

    public get query(): QueryBuilder {
        return new QueryBuilder(this.users);
    }

    /**
     * Returns a copy of the users filtered by the given filter functions
     * (see {@link Filters}).
     */
    public filtered(...filters: Filter[]): User[] {
        // return filteredUsers(this.users, ...filters);
        const queryBuilder = this.query;
        filters.forEach(f => queryBuilder.filter(f));

        return queryBuilder.get();
    }

    /**
     * Returns a copy of the users stored in the repository sorted by the given {@link Sort sort function} and optional
     * {@link SortOrderType sort order}.
     * Sorts in ascending order by default.
     */
    public sorted(comparator: Comparator<User>, sortOrder: SortOrderType = SortOrder.descending): User[] {
        return this.query.sort(comparator).sortOrder(sortOrder).get();
    }


    public search(query: string): User[] {
        const normalizedQuery = query.trim().toLowerCase();

        return this.query.filter((u) => u.full_name.toLowerCase().includes(normalizedQuery)
            || u.note.toLowerCase().includes(normalizedQuery)
            || u.age == parseInt(query)).get();
    }

    // public percentageSatisfyingQuery(query: string): number {
    //     return Math.floor(this.search(query).length / this.count * 100);
    // }

    public get count(): number {
        return this.users.length;
    }

    // public limit(count: number): User[] {
    //     return this.users.slice(0, Math.min(count, this.count));
    // }

    /**
     * Page enumeration starts from 0.
     */
    public pageBy(page: number, entriesPerPage: number): User[] {
        return this.query.pageBy(page, entriesPerPage);
    }

    public countPages(entriesPerPage: number): number {
        return this.query.countPages(entriesPerPage);
    }

    public byIds(...ids: string[]): User[] {
        return this.filtered((u) => ids.includes(u.id));
    }

    public byId(id: string): User {
        return this.byIds(id)[0];
    }

    public get favorites(): User[] {
        return this.filtered(Filters.favorite);
    }

    public setFavoriteStatus(user: User | string, status: boolean = true): void {
        if (!user) return;

        if (typeof user === 'object') {
            return this.setFavoriteStatus(user.id, status);
        }

        this.byId(user).favorite = status;
    }
}

export class QueryBuilder {
    private filters: Filter[] = [];
    private comparator: Comparator<User> = Sort.byName;
    private order: SortOrderType = SortOrder.ascending;

    constructor(private users: User[]) {
    }

    public append(users: User[]): void {
        this.users.push(...users);
    }

    public get(): User[] {
        const comparator = this.order === SortOrder.ascending
            ? this.comparator
            : (u1, u2) => this.comparator(u2, u1);
        const predicate = compileFiltersToPredicate(this.filters);

        return this.users.filter(predicate).sort(comparator)
    }

    public pageBy(page: number, entriesPerPage: number): User[] {
        const indexes = safePageIndexes(page, entriesPerPage, this.users.length);
        return this.get().slice(indexes[0], indexes[1]);
    }

    public countPages(entriesPerPage: number): number {
        return Math.floor(this.users.length / entriesPerPage) - 1;
    }

    public filter(filter: Filter): QueryBuilder {
        this.removeFilterType(filter);
        this.filters.push(filter);

        return this;
    }

    public removeFilterType(filter: Filter): QueryBuilder {
        const index = this.filters.findIndex(f => f.name === filter.name);
        if (index !== -1)
            this.filters.splice(index, 1);

        return this;
    }

    public toggleFilter(filter: Filter): void {
        const index = this.filters.findIndex(f => f.name === filter.name);
        if (index !== -1) this.filters.splice(index, 1);
        else this.filters.push(filter);
    }

    public sort(comparator: Comparator<User>): QueryBuilder {
        this.comparator = comparator;

        return this;
    }

    public sortOrder(order: SortOrderType): QueryBuilder {
        this.order = order;

        return this;
    }

    public toggleSortOrder(): QueryBuilder {
        this.order = this.order === SortOrder.ascending ? SortOrder.descending : SortOrder.ascending;

        return this;
    }

    public get currentOrder(): SortOrderType {
        return this.order;
    }
}

function safeIndex(index: number, maxIndex: number): number {
    return Math.min(Math.max(0, index), maxIndex);
}

function safePageIndexes(page: number, entriesPerPage: number, length: number): [number, number] {
    const start = page * entriesPerPage;
    return [safeIndex(start, length), safeIndex(start + entriesPerPage, length)];
}