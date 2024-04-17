import {QueryBuilder} from "../users/user_view.js";
import {Sort} from "../users/sort/sorting.js";

const entriesPerPage = 5;
let tableQueryBuilder: QueryBuilder;

let currentSortHeader: HTMLElement;
let currentPage = 0;

let table: HTMLTableElement;
let controls: HTMLElement;

export function initStatisticsTable(queryBuilder: QueryBuilder): void {
    const statisticsSection = document.querySelector<HTMLElement>('section#statistics');
    tableQueryBuilder = queryBuilder;
    table = statisticsSection.querySelector<HTMLTableElement>('table.statistics tbody');
    controls = statisticsSection.querySelector<HTMLElement>('ul.statistics_table_controls');

    table.querySelectorAll<HTMLElement>('th').forEach(th => {
        if (!currentSortHeader) currentSortHeader = th;
        th.onclick = () => {
            const thClassList = currentSortHeader.classList;

            if (currentSortHeader === th) {
                thClassList.remove(queryBuilder.currentOrder);
                queryBuilder.toggleSortOrder();
                thClassList.add(queryBuilder.currentOrder);
            } else {
                const classNames = ['sorting_by', queryBuilder.currentOrder];

                thClassList.remove(...classNames);
                th.classList.add(...classNames);
                currentSortHeader = th;
            }

            updateStatisticsTable();
        }
    });

    initControls();
    updateStatisticsTable();
}

function initControls() {
    controls.querySelector<HTMLAnchorElement>('.first').onclick = (e) => {
        e.preventDefault();
        if (currentPage === 0) return;
        currentPage = 0;
        updateTablePage();
    }

    controls.querySelector<HTMLAnchorElement>('.prev').onclick = (e) => {
        e.preventDefault();
        if (currentPage === 0) return;
        currentPage--;
        updateTablePage();
    }

    controls.querySelector<HTMLAnchorElement>('.next').onclick = (e) => {
        e.preventDefault();
        if (currentPage === tableQueryBuilder.countPages(entriesPerPage)) return;
        currentPage++;
        updateTablePage();
    }

    controls.querySelector<HTMLAnchorElement>('.last').onclick = (e) => {
        e.preventDefault();
        const maxPages = tableQueryBuilder.countPages(entriesPerPage);
        if (currentPage === maxPages) return;
        currentPage = maxPages;
        updateTablePage();
    }
}

export function updateStatisticsTable(): void {
    tableQueryBuilder.sort(idsToComparators[currentSortHeader.dataset.sort_id]);
    updateTablePage();
}

function updateTablePage() {
    const usersToDisplay = tableQueryBuilder.pageBy(currentPage, entriesPerPage);
    controls.querySelector<HTMLElement>('.curr_page').innerText = (currentPage + 1).toString();

    table.querySelectorAll('tr:not(:first-child)')
        .forEach(tr => table.removeChild(tr));
    usersToDisplay.map(u => u.toTableRow())
        .forEach(tr => table.appendChild(tr));
}

const idsToComparators = {
    'sort_by_name': Sort.byName,
    'sort_by_course': Sort.byCourse,
    'sort_by_age': Sort.byAge,
    'sort_by_birthday': Sort.byBirthday,
    'sort_by_country': Sort.byCountry
}
