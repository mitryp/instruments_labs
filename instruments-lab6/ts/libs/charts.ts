import {Chart} from 'chart.js/auto';
import {UserView} from 'ts/users/user_view';
import {countries} from "../countries/countries.js";

export function setPieChartAt(element: HTMLCanvasElement, userView: UserView): Chart {
    return new Chart(
        element, {
            type: 'pie',
            data: {
                labels: countries(),
                datasets: [{
                    data: countries().map(country => userView.filtered(u => u.country === country).length)
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        }
    );
}
