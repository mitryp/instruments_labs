export function createElement<T extends HTMLElement>(element: string, ...classNames: string[]): T {
    const elem = document.createElement(element) as T;
    classNames.forEach(className => elem.classList.add(className));

    return elem;
}
