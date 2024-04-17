import {Email} from "./email.js";
import {validateUser} from "../validate/validate.js";
import {createTeacherCard} from "../../document/elements/teacher_card.js";
import {createTeacherTableRow} from "../../document/elements/teacher_table_row.js";
import {regions} from "../../countries/countries.js";
import {randomMocks} from "../../mocks/mock_data.js";
import * as dayjs from "dayjs";

type Gender = 'male' | 'female';

type Coordinates = {
    latitude: string,
    longitude: string
}

type Timezone = {
    offset: string,
    description: string
}

export interface UserInterface {
    id?: string;
    gender?: Gender;
    title?: string;
    full_name?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
    coordinates?: Coordinates;
    timezone?: Timezone;
    email?: Email;
    b_date?: string;
    age?: number;
    phone?: string;
    picture_large?: string;
    picture_thumbnail?: string;
    favorite?: boolean;
    bg_color?: string;
    course?: string;
    note?: string;
}

export class User implements UserInterface {
    id?: string;
    gender?: Gender;
    title?: string;
    full_name?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
    coordinates?: Coordinates;
    timezone?: Timezone;
    email?: Email;
    b_date?: string;
    age?: number;
    phone?: string;
    picture_large?: string;
    picture_thumbnail?: string;
    favorite?: boolean;
    bg_color?: string;
    course?: string;
    note?: string;

    constructor(obj: UserInterface) {
        this.id = obj.id;
        this.gender = obj.gender;
        this.title = obj.title;
        this.full_name = obj.full_name;
        this.city = obj.city;
        this.state = obj.state;
        this.country = obj.country;
        this.postcode = obj.postcode;
        this.coordinates = obj.coordinates;
        this.timezone = obj.timezone;
        this.email = typeof obj.email === 'string' ? new Email(obj.email) : obj.email;
        this.b_date = obj.b_date;
        this.age = obj.age;
        this.phone = obj.phone;
        this.picture_large = obj.picture_large;
        this.picture_thumbnail = obj.picture_thumbnail;
        this.favorite = obj.favorite;
        this.bg_color = obj.bg_color;
        this.course = obj.course;
        this.note = obj.note;
    }

    static fromMockJSON(json: Object): User {
        const userData = {};

        for (const key in fieldExtractors) {
            userData[key] = fieldExtractors[key](json);
        }

        return new User(userData);
    }

    static fromFormData(formData: FormData): User {
        const userData = {};

        for (const [key, value] of formData) {
            userData[key] = value;
        }
        userData['email'] = new Email(formData.get('email') as string);

        const user = new User(userData);
        user.id = randomMocks.id();
        const b_date = new Date(user.b_date);
        const deltaYears = new Date(new Date().getTime() - b_date.getTime()).getUTCFullYear();
        user.age = Math.abs(1970 - deltaYears);
        user.favorite = false;
        user.b_date = b_date.toISOString();

        if (!user.isValid) return null;
        return user;
    }

    toJSON(): string {
        const json = {};

        for (const key of Object.keys(this)) {
            if (key !== 'email') json[key] = this[key];
            else json[key] = this.email.email;
        }

        return JSON.stringify(json)
    }

    get isValid(): boolean {
        return validateUser(this);
    }

    get region(): string {
        for (const key in regions) {
            if (regions[key].includes(this.country))
                return key;
        }

        return undefined;
    }

    get formattedDate(): string {
        function formatNumber(number: number): string {
            const str = number.toString();
            if (str.length === 1) return '0' + str;
            return str;
        }

        const date = new Date(this.b_date);
        return `${formatNumber(date.getDate())}.${formatNumber(date.getMonth() + 1)}.${date.getFullYear()}`;
    }

    get dayjsDate(): dayjs.Dayjs {
        return dayjs.default(this.b_date);
    }

    toCard(includeCourse: boolean = true): HTMLElement {
        return createTeacherCard(this, includeCourse);
    }

    toTableRow(): HTMLElement {
        return createTeacherTableRow(this);
    }
}

export const courses = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess',
    'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];

const fieldExtractors = {
    'gender': (j: any) => j.gender,
    'title': (j: any) => j.name?.title,
    'full_name': (j: any) => [j.name?.first ?? '', j.name?.last ?? ''].join(' ').trim(),
    'city': (j: any) => j.location?.city,
    'state': (j: any) => j.location?.state,
    'country': (j: any) => j.location?.country,
    'postcode': (j: any) => j.location?.postcode,
    'coordinates': (j: any) => j.location?.coordinates,
    'timezone': (j: any) => j.location?.timezone,
    'email': (j: any) => new Email(j.email),
    'b_date': (j: any) => j.dob?.date,
    'age': (j: any) => j.dob?.age,
    'phone': (j: any) => j.phone,
    'picture_large': (j: any) => j.picture?.large,
    'picture_thumbnail': (j: any) => j.picture?.thumbnail
};
