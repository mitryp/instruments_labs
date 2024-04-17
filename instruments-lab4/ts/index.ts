import {mockUserData} from "./mocks/mock_data.js";
import {UserView} from "./users/user_view.js";
import {updateFavoriteTeachers, updateTeacherGrid} from "./document/state_update.js";
import {initFavStarListener} from "./document/popups/teacher_info_popup.js";
import {stateUpdateSink, updateState} from "./document/state/state.js";
import {initFilteringListeners} from "./document/filters.js";
import {initScrollGalleryListeners} from "./document/scroll_gallery.js";
import {initStatisticsTable, updateStatisticsTable} from "./document/statistics.js";
import {initPopupCloseListeners} from "./document/popups/popups.js";
import {initSearchListeners} from "./document/search.js";
import {initNewTeacherPopup} from "./document/popups/new_teacher_form_popup.js";
import {User} from "./users/data/user.js";

const userView = new UserView(mockUserData().filter(u => u.isValid));
const filteringQuery = userView.query;

export function appendUser(user: User): void {
    userView.users.push(user);
    updateState();
    updateStatisticsTable();
}

function init() {
    stateUpdateSink.listen(e => {
        if (e.name !== 'update') return;
        updateFavoriteTeachers(userView);
        updateTeacherGrid(userView, filteringQuery);
    });
    initPopupCloseListeners();
    initNewTeacherPopup();
    initScrollGalleryListeners();
    initFavStarListener(userView);
    initSearchListeners(userView);
    initFilteringListeners(filteringQuery);
    initStatisticsTable(userView.query);

    updateState();
}

init();