import {UserView} from "../users/user_view.js";
import {User} from "../users/data/user.js";
import {openTeacherInfoPopup} from "./popups/teacher_info_popup.js";

const searchForm = document.querySelector<HTMLFormElement>('#search');

export function initSearchListeners(userView: UserView): void {
    const searchBar = searchForm.querySelector<HTMLInputElement>('input'),
        searchButton = searchForm.querySelector<HTMLButtonElement>('button');

    searchForm.onsubmit = (e) => {
        e.preventDefault();
        searchButton.click();
    }

    let searchResult: User;
    searchBar.oninput = () => {
        if (searchBar.value === '') {
            searchResult = null;
            return;
        }

        searchResult = userView.search(searchBar.value)[0];
    }

    searchButton.onclick = () => {
        if (!searchResult) return;
        openTeacherInfoPopup(searchResult);
    }
}
