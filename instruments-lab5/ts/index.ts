import {UserView} from "./users/user_view.js";
import {updateFavoriteTeachers, updateTeacherGrid} from "./document/state_update.js";
import {initFavStarListener} from "./document/popups/teacher_info_popup.js";
import {stateUpdateSink, updateState} from "./document/state/state.js";
import {initFilteringListeners} from "./document/filters.js";
import {initScrollGalleryListeners} from "./document/scroll_gallery.js";
import {initStatisticsTable} from "./document/statistics.js";
import {initPopupCloseListeners} from "./document/popups/popups.js";
import {initSearchListeners} from "./document/search.js";
import {initNewTeacherPopup} from "./document/popups/new_teacher_form_popup.js";
import {DataFetch, initialRandomUsers} from "./data_fetch.js";
import {mergeUserArrays} from "./users/normalize/normalize_data.js";

async function init() {
    const dataFetch = DataFetch.default,
        users = await Promise.all([dataFetch.fetchUsers(), dataFetch.mockUsers(initialRandomUsers)]),
        userView = new UserView(mergeUserArrays(users[0], users[1])), filteringQuery = userView.query;

    stateUpdateSink.listen(e => {
        if (e.name !== 'update') return;
        updateFavoriteTeachers(userView);
        updateTeacherGrid(userView, filteringQuery);
    });
    initPopupCloseListeners();
    initNewTeacherPopup(userView, dataFetch);
    initScrollGalleryListeners();
    initFavStarListener(userView);
    initSearchListeners(userView);
    initFilteringListeners(filteringQuery);
    initStatisticsTable(userView.query, dataFetch);
}

init().then(() => {
    updateState();
});
