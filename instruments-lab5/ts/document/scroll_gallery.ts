let elementWidth: number;

export function initScrollGalleryListeners(): void {
    const scrollGallery = document.querySelector('.favorite_teachers');

    const container = scrollGallery.querySelector<HTMLElement>('.scroll_gallery'),
        controlLeft = scrollGallery.querySelector<HTMLElement>('.scroll_gallery_control.control_left'),
        controlRight = scrollGallery.querySelector<HTMLElement>('.scroll_gallery_control.control_right');

    function calculateElementWidth(): void {
        if (elementWidth || !container.hasChildNodes()) return;
        const widthStyle = getComputedStyle(container.firstChild as HTMLElement).width;
        elementWidth = parseInt(widthStyle.slice(0, widthStyle.length - 2));
    }

    function scrollContainerBy(value: number): void {
        container.scrollBy({left: value, behavior: 'smooth'});
    }

    controlLeft.onclick = () => {
        calculateElementWidth();
        scrollContainerBy(-elementWidth * 1.5);
    }

    controlRight.onclick = () => {
        calculateElementWidth();
        scrollContainerBy(elementWidth * 1.5);
    }
}