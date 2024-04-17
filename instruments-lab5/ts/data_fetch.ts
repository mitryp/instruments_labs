import {User} from "./users/data/user.js";
import {mockUserData} from "./mocks/mock_data.js";

const mockApiLink = 'https://randomuser.me/api?results=';
const dbUrl = 'http://localhost:3000/teachers';
export const initialRandomUsers = 50;
export const additionalFetchUsers = 10;

async function fetchUsers(url: string): Promise<User[]> {
    return fetchOr(
        url,
        res => res.json().then(json => json.map(u => new User(u))),
        () => Promise.resolve([])
    );
}

async function fetchMockUsers(userCount: number): Promise<User[]> {
    return fetchOr(
        mockApiLink + userCount,
        res => responseToUsers(res).then(mockUserData),
        () => Promise.resolve([])
    );
}

async function fetchOr<T>(url: string, resToT: (res: Response) => T, or: () => T): Promise<T> {
    const response = await fetchUsersLogErrors(url);
    if (!response) return Promise.resolve(or());

    return resToT(response);
}

function fetchUsersLogErrors(url: string): Promise<Response | null> {
    return fetch(url).catch(() => {
        console.log(`Couldn't fetch ${url}`);
        return null;
    });
}

async function postUser(url: string, user: User): Promise<void> {
    const fetchParams = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: user.toJSON(),
    };

    await fetch(url, fetchParams);
}

async function responseToUsers(response: Response): Promise<User[]> {
    return mockJsonToUsers(await toJSON(response));
}

async function toJSON(res?: Response): Promise<any> {
    return res?.json();
}

function mockJsonToUsers(json: any): User[] {
    return json?.results.map(User.fromMockJSON) ?? [];
}

function filterValid(users: User[]): User[] {
    return users.filter(u => u.isValid);
}

export class DataFetch {
    constructor(private dbUrl: string) {
    }

    public static get default(): DataFetch {
        return new DataFetch(dbUrl);
    }

    public mockUsers(count: number): Promise<User[]> {
        return fetchMockUsers(count);
    }

    public fetchUsers(): Promise<User[]> {
        return fetchUsers(this.dbUrl);
    }

    public postUser(user: User): Promise<void> {
        return postUser(this.dbUrl, user);
    }
}