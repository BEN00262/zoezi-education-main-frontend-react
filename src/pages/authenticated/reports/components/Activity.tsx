import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from "react-chartjs-2";
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { useEffect, useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export const options = (titleText: string, isMobile: boolean) =>({
    indexAxis: isMobile ? "y" : "x" as const,
    responsive: true,
    maintainAspectRatio: false,
    redraw: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: titleText,
        },
        barValueSpacing: 40,
        tooltips: {
            displayColors: true,
            callbacks: { mode: "x" }
        },
        datalabels: {
            display: (context: any) => false,
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: true,
                    drawBorder: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false,
                    drawBorder: true
                }
            }]
        },

    },
});

export interface IParticipation {
    [key: string]: number
}

const firstname = (document.getElementById("firstname")?.innerText || "LEARNER").toUpperCase() +"'S";
const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

const ActivityDisplayComp = () => {
    const [datapoints, setDatapoints] = useState<number[]>([]);
    // check if we are in a phone
    const isMobilePhone = useMediaQuery({ query: '(max-width: 760px)' });

    useEffect(() => {
        axios.get(`/analytics/participation`)
          .then(({ data }) => {
              if (data.participation) {
                  setDatapoints(
                      Object.entries(data.participation as IParticipation).reduce((acc, [month, value]) => {
                          const monthIndex = labels.findIndex(x => x.toLowerCase() === month.toLowerCase()); // 0:34 2:5 [34,0,5]

                          if (monthIndex > -1) {
                              acc[monthIndex] = value;
                          }

                          return acc;
                      }, (new Array(labels.length)).fill(0))
                  )
              }
          })
    }, []);

    return (
        <div>
            <div className="card z-depth-0" style={{border:"1px solid #dcdee2"}}>
                <div className="card-content">
                    <div className="row" id="insertChart">

                        <Bar
                            // @ts-ignore
                            options={options(`${firstname} activity for ${(new Date()).getFullYear()}`, isMobilePhone)}
                            style={{ ...(isMobilePhone ? { height:  "400px" } : { height: "300px" })}}
                            data={{
                                labels,
                                datasets: [
                                    {
                                        label: 'Completed',
                                        data: datapoints,
                                        backgroundColor: '#00c853',
                                    }
                                ],
                            }}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityDisplayComp
