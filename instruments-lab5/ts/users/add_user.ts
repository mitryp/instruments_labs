import {User} from "./data/user.js";
import {UserView} from "./user_view.js";
import {updateState} from "../document/state/state.js";
import {updateStatisticsTable} from "../document/statistics.js";

export function appendUser(user: User, userView: UserView): void {
    userView.users.push(user);
    updateState();
    updateStatisticsTable();
}
