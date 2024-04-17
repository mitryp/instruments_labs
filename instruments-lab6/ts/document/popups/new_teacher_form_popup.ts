import {closePopup, openPopup, popups} from "./popups.js";
import {courses, User} from "../../users/data/user.js";
import {createElement} from "../create_element.js";
import {countries} from "../../countries/countries.js";
import {UserView} from "../../users/user_view.js";
import {DataFetch} from "../../data_fetch.js";
import {appendUser} from "../../users/add_user.js";

function openNewTeacherFormPopup() {
    const popup = popups.newTeacherForm;

    popup.querySelectorAll<HTMLInputElement>('input:not(input[type="checkbox"], input[type="color"])').forEach(i => {
        i.value = '';
    });

    openPopup(popup);
}

let users: UserView;
let dataFetch: DataFetch;

export function initNewTeacherPopup(userView: UserView, dFetch: DataFetch) {
    users = userView;
    dataFetch = dFetch;

    document.querySelectorAll<HTMLButtonElement>('.add_teacher_button').forEach(b => {
        b.onclick = (e) => {
            e.preventDefault();
            openNewTeacherFormPopup();
        };
    });

    const popup = popups.newTeacherForm;

    createOptions(popup.querySelector('select[name="course"]'), courses);
    createOptions(popup.querySelector('select[name="country"]'), countries());

    popup.querySelector<HTMLButtonElement>('button.add_teacher_button').onclick = (e) => {
        e.preventDefault();
        processUserAddition(popup);
    }
}

function processUserAddition(popup: HTMLElement) {
    const form = popup.querySelector<HTMLFormElement>('form');
    if (!form.checkValidity()) return;

    const formData = new FormData(form);
    formData.append('gender', document.querySelector<HTMLInputElement>('input[name="gender"]:checked').id);

    const newUser = User.fromFormData(formData);
    if (newUser === null) {
        alert('User data entered is not valid!');
        return;
    }

    dataFetch.postUser(newUser).then(() => {
        appendUser(newUser, users);
        closePopup();
    });
    // closePopup();
}

type StringMutator = (s: string) => string;

function createOption(text: string, valueFunction: StringMutator): HTMLOptionElement {
    const option = createElement<HTMLOptionElement>('option');
    option.value = valueFunction(text);
    option.innerText = text;

    return option;
}

function createOptions(select: HTMLSelectElement, options: string[], valueFunction: StringMutator = (s) => s): void {
    select.innerHTML = '';
    options.map(o => createOption(o, valueFunction)).forEach(option => select.appendChild(option));
}
