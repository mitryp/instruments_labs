export class Email {
    static regex = /[\w.]+@\w+\.[\w.]*\w/;
    static validate(email?: string): boolean {
        return email && this.regex.test(email!);
    }

    email: string;

    constructor(email: string) {
        this.email = email;
    }

    get isValid(): boolean {
        return Email.validate(this.email);
    }
}