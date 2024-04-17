import {between, Filters, greaterThan} from "../users/filter/filtering.js";
import {updateState} from "./state/state.js";
import {QueryBuilder} from "../users/user_view.js";

export function initFilteringListeners(queryBuilder: QueryBuilder) {
    document.querySelectorAll<HTMLSelectElement>('li.filter select').forEach(select => {
        return select.oninput = () => {
            const name = select.name;
            const filter = inputsToFilters[name][select.value];
            if (select.value === 'any') {
                queryBuilder.removeFilterType(filter);
                updateState();
                return;
            }
            if (!filter) return;

            queryBuilder.filter(filter);
            updateState();
        };
    });

    document.querySelectorAll<HTMLInputElement>('li.filter input[type=checkbox]').forEach(input => {
        return input.oninput = () => {
            const filter = inputsToFilters[input.name];
            queryBuilder.toggleFilter(filter);

            updateState();
        };
    });
}

const inputsToFilters = {
    age: {
        any: Filters.byAge(0),
        age_18_31: Filters.byAge(between(18, 31)),
        age_32_45: Filters.byAge(between(32, 45)),
        age_46_64: Filters.byAge(between(46, 64)),
        age_65: Filters.byAge(greaterThan(64))
    },
    region: {
        any: Filters.byRegion(''),
        eu: Filters.byRegion('eu'),
        na: Filters.byRegion('na'),
        sa: Filters.byRegion('sa'),
        as: Filters.byRegion('as'),
        af: Filters.byRegion('af'),
        oc: Filters.byRegion('oc')
    },
    gender: {
        any: Filters.byGender(''),
        male: Filters.byGender('male'),
        female: Filters.byGender('female')
    },
    with_photos: Filters.withPhotos,
    only_favorites: Filters.favorite
}