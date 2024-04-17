const scrollDisableClass = 'stop_scrolling';
const hidePopupClass = 'hidden';
let currentPopup: HTMLElement;
let resizeListener: () => void;

export const popups = {
    get teacherInfo(): HTMLElement {
        return document.querySelector('#teacher_info_popup')
    },

    get newTeacherForm(): HTMLElement {
        return document.querySelector('#add_teacher_popup');
    }
}

function setScrollBlockingStatus(isEnabled: boolean): void {
    const classList = document.documentElement.classList;

    if (isEnabled)
        classList.add(scrollDisableClass);
    else
        classList.remove(scrollDisableClass);
}

function centerPopupVertically(popup: HTMLElement): void {
    popup.style.marginTop = `${window.scrollY}px`;
}

export function openPopup(popup: HTMLElement): void {
    currentPopup = popup;
    resizeListener = () => centerPopupVertically(popup);
    window.addEventListener('resize', resizeListener);

    setScrollBlockingStatus(true);
    popup.classList.remove(hidePopupClass);
    centerPopupVertically(popup);
}

export function closePopup(): void {
    if (currentPopup === null) return;

    window.removeEventListener('resize', resizeListener);
    setScrollBlockingStatus(false);
    currentPopup.classList.add(hidePopupClass);
    document.body.classList.remove('stop_scrolling');
}

export function initPopupCloseListeners(): void {
    document.querySelectorAll<HTMLButtonElement>('button.close_popup').forEach(b => b.onclick = closePopup);
    document.querySelectorAll<HTMLElement>('div.popup_container').forEach(container => container.onclick = (e) => {
        if (e.target === container)
            closePopup();
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape')
            closePopup();
    });
}