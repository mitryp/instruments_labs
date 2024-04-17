import {validateUser} from "./js/validate/validate.js";
import {mockUserData} from "./js/mocks/mock_data.js";
import {between, Filters, greaterThan} from "./js/filter/filtering.js";
import {Sort, SortOrder} from "./js/sort/sorting.js";
import {UserRepository} from "./js/users/users_repository.js";

const users = new UserRepository(mockUserData().filter(validateUser));

console.log(
    users.filtered(Filters.favorite, Filters.byGender('female'))
);

console.log(
    users.filtered(Filters.favorite, Filters.byAge(greaterThan(70)))
);

console.log(
    users.filtered(Filters.favorite, Filters.byAge(between(60, 65)))
);

console.log(
    users.sorted(Sort.byName)
);

console.log(
    users.sorted(Sort.byAge, SortOrder.descending)
);

console.log(users.count);
console.log(
    users.search(`65`).length
);
console.log(users.percentageSatisfyingQuery(`65`));




