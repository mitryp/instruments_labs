import {createTeacherCard} from "./elements/teacher_card.js";
import {openTeacherInfoPopup} from "./popups/teacher_info_popup.js";
import {favoriteTeachers, teachersGrid} from "./stateful_elements.js"
import {QueryBuilder, UserView} from "../users/user_view.js";

function setTeacherCardListeners(inElement: HTMLElement, userView: UserView): void {
    inElement.querySelectorAll<HTMLElement>('article.teacher_card').forEach(a => {
        return a.onclick = () => openTeacherInfoPopup(userView.byId(a.dataset.id!));
    });
}

export function updateTeacherGrid(userView: UserView, queryBuilder: QueryBuilder): void {
    const filtered = queryBuilder.pageBy(0, 15);

    teachersGrid.innerHTML = '';
    filtered.map((u) => u.toCard())
        .forEach(a => teachersGrid.appendChild(a));

    setTeacherCardListeners(teachersGrid, userView);
}

export function updateFavoriteTeachers(userView: UserView): void {
    favoriteTeachers.innerHTML = '';

    userView.favorites.map(u => createTeacherCard(u, false)).forEach(a => favoriteTeachers.appendChild(a));

    setTeacherCardListeners(favoriteTeachers, userView);
}