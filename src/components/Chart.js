/* eslint-disable */
import React, { useEffect } from 'react';
import Chart from 'chart.js';

export default function ChartStats(props) {

    const { data: pokemonStat, label: pokemonLabel } = props;

    useEffect(() => {
        const pokemonStatsChart = document.querySelector('canvas');

        new Chart(pokemonStatsChart, {
            type: 'radar',
            data: {
                labels: pokemonLabel,
                datasets: [{
                    data: pokemonStat,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            display: false
                        }
                    }]
                }
            }
        });
    }, [pokemonStat]);

    return (
        <div>
            <canvas id="myChart" height="350" width="350"></canvas>
        </div>
    )
}
