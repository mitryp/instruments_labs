import {openPopup, popups} from "./popups.js";
import {User} from "../../users/data/user.js";
import {updateState} from "../state/state.js";
import {UserView} from "../../users/user_view.js";


const favStar = document.querySelector<HTMLElement>('span.fav_star');

export function openTeacherInfoPopup(user: User) {
    const popup = popups.teacherInfo;

    const img: HTMLImageElement = popup.querySelector('img.teacher_profile');
    img.src = user.picture_large?.length > 0 ? user.picture_large : `https://via.placeholder.com/200/${user.bg_color?.slice(1)}/000?text=${user.full_name}`;
    img.alt = user.full_name + (user.picture_large?.length > 0 ? '' : ' (no image)');

    popup.querySelector<HTMLElement>('h2.teacher_name').innerText = user.full_name;
    popup.querySelector<HTMLElement>('p.speciality').innerText = user.course;
    popup.querySelector<HTMLElement>('p.age_sex_container').innerText = `${user.age}, ${user.gender}`;

    const email = popup.querySelector<HTMLAnchorElement>('p.teacher_email a.email');
    email.href = `mailto:${user.email.email}`;
    email.innerText = user.email.email;

    const tel = popup.querySelector<HTMLAnchorElement>('p.teacher_phone a.phone');
    tel.href = `tel:${user.phone}`;
    tel.innerText = user.phone;

    popup.querySelector<HTMLElement>('p.notes').innerText = user.note;

    const embeddedMap = popup.querySelector<HTMLIFrameElement>('iframe.embedded_map');
    embeddedMap.src =
        `https://maps.google.com/maps?q=${user.coordinates?.latitude},${user.coordinates?.longitude}&z=14&output=embed`;

    popup.querySelector<HTMLDetailsElement>('details.toggle_teacher_map')
        .classList.toggle('hidden', user.coordinates === undefined);


    styleStar(user.id, user.favorite);

    requestAnimationFrame(() => openPopup(popup));
}

function styleStar(userId: string, isMarked: boolean) {
    favStar.innerText = isMarked ? '★' : '☆';
    favStar.dataset.id = userId;

    if (isMarked)
        favStar.classList.add('marked');
    else
        favStar.classList.remove('marked');
}

export function initFavStarListener(userView: UserView) {
    document.querySelector<HTMLElement>('span.fav_star').addEventListener('click', (e) => {
        const star = e.target as HTMLElement;
        const userId: string = star.dataset.id!;
        const newFavStatus = !star.classList.contains('marked');

        userView.setFavoriteStatus(userId, newFavStatus);
        styleStar(userId, newFavStatus);
        updateState();
    });
}