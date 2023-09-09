import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js

// loader for this part 
import HashLoader from 'react-spinners/HashLoader';

const LineGraph = () => {
    // states to handle data and if loading yet 

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    //  useref to get hold of chart if created 
    const chartRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const response = await fetch(
                    'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
                );
                const data = await response.json();

                if (data && data.cases) {
                    const chartData = {
                        labels: Object.keys(data.cases),
                        datasets: [
                            {
                                label: 'Cases',
                                data: Object.values(data.cases),
                                fill: true,
                                borderColor: 'rgba(75, 192, 192, 0.2)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            },
                        ],
                    };

                    setData(chartData);

                    // Destroy the chart if it already exists
                    if (chartRef.current) {
                        chartRef.current.destroy();
                    }

                    // Create the chart
                    const ctx = document.getElementById('chart');
                    chartRef.current = new Chart(ctx, {
                        type: 'line',
                        data: chartData,
                    });
                    
                    // setLoading false if data fetched and chart created 

                    setLoading(false);

                } else {
                    console.error('Data is undefined or empty.');
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="line-graph w-[90%] md:w-[61vw]  px-[2%] mt-[2%]">
            {loading? <div className='text-center flex justify-center my-[16%]' ><HashLoader

                color={'#0b5ed7'}
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            /></div> : <>
                <h2 className='text-sechead font-head font-[700] text-[1.2rem] md:text-[2.2rem] text-center my-[1%]'>Worldwide COVID-19 Cases</h2>
                <canvas id="chart" ></canvas>
            </>}
    </div>

    );
};

export default LineGraph;
