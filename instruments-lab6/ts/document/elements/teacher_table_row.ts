import {User} from "../../users/data/user.js";
import {createElement} from "../create_element.js";
import {openTeacherInfoPopup} from "../popups/teacher_info_popup.js";

export function createTeacherTableRow(user: User): HTMLElement {
    const tr = createElement('tr');

    for (const property of ['full_name', 'course', 'age', 'country']) {
        const td = createElement('td');
        td.innerText = user[property];
        tr.appendChild(td);
    }

    const b_date = createElement('td');
    b_date.innerText = user.formattedDate;
    tr.appendChild(b_date);

    tr.onclick = () => {
        openTeacherInfoPopup(user);
    }

    return tr;
}