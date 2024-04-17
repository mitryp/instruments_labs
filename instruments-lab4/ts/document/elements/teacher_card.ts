/*
{
      gender: 'male',
      title: 'Mr',
      full_name: 'Norbert Weishaupt',
      city: 'Rhön-Grabfeld',
      state: 'Mecklenburg-Vorpommern',
      country: 'Germany',
      postcode: 52640,
      coordinates: { latitude: '-42.1817', longitude: '-152.1685' },
      timezone: { offset: '+9:30', description: 'Adelaide, Darwin' },
      email: 'norbert.weishaupt@example.com',
      b_date: '1956-12-23T19:09:19.602Z',
      age: 65,
      phone: '0079-8291509',
      picture_large: 'https://randomuser.me/api/portraits/men/28.jpg',
      picture_thumbnail: 'https://randomuser.me/api/portraits/thumb/men/28.jpg',
      b_day: '1956-12-23T19:09:19.602Z',
      id: 'fgesrg456dsf234c1',
      favorite: true,
      course: 'English',
      bg_color: '#1f75cb',
      note: 'A 42 is the answer to the question'
}

 */

/*
<article class="teacher_card">
    <div class="teacher_photo_container">
        <img loading="lazy"
             src="https://thispersondoesnotexist.com/image"
             alt="Teacher photo"
             class="profile_picture">
    </div>
    <p class="teacher_name">Ihor Tkachuk</p>
    <p class="specialization">Chemistry</p>
    <p class="country">Ukraine</p>
</article>
 */

import {User} from "../../users/data/user.js";
import {createElement} from "../create_element.js";

export function createTeacherCard(user: User, includeCourse: boolean = true): HTMLElement {
    const article = createElement('article', 'teacher_card');
    article.dataset.id = user.id;

    const teacherPhotoContainer = createElement('div', 'teacher_photo_container');

    let img: any;
    if (!user.picture_thumbnail) {
        img = createElement('div', 'no_image');
        img.style.backgroundColor = `${user.bg_color}33`;
        const initials = createElement('p', 'initials');
        initials.innerText = user.full_name.split(' ').map(word => word.at(0)).join('.') + '.';
        img.appendChild(initials);
    } else {
        img = createElement('img', 'profile_picture');
        img.loading = 'lazy';
        img.src = user.picture_thumbnail;
        img.alt = `${user.full_name} profile image`;
    }
    teacherPhotoContainer.appendChild(img);

    const teacherName = createElement('p', 'teacher_name');
    teacherName.innerText = user.full_name;

    const country = createElement('p', 'country');
    country.innerText = user.country;

    article.append(teacherPhotoContainer, teacherName);

    if (includeCourse) {
        const specialization = createElement('p', 'specialization');
        specialization.innerText = user.course;
        article.append(specialization);
    }

    article.append(country);

    if (user.favorite)
        article.classList.add('favorite');

    return article;
}