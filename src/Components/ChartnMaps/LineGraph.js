import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js

// Loader for this part
import HashLoader from 'react-spinners/HashLoader';

const LineGraph = () => {
    // States to handle data and loading status
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    // useRef to get hold of the chart canvas element
    const chartRef = useRef(null);

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            try {
                // Fetch COVID-19 historical data
                const response = await fetch(
                    'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
                );
                const data = await response.json();

                if (data && data.cases) {
                    // Prepare data for the chart
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

                    // Check if the chart canvas element exists
                    if (chartRef.current) {
                        // Create the chart
                        const ctx = chartRef.current.getContext('2d');
                        new Chart(ctx, {
                            type: 'line',
                            data: chartData,
                        });
                    }

                    // Set the chart data
                    setData(chartData);

                    // Set loading to false when data is fetched and chart is created
                    setLoading(false);
                } else {
                    console.error('Data is undefined or empty.');
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        // Fetch data when the component mounts (empty dependency array)
        fetchData();
    }, []);

    return (
        <div className="line-graph w-[90%] md:w-[61vw] px-[2%] mt-[2%]">
            {loading ? (
                <div className='text-center flex justify-center my-[16%]'>
                    <HashLoader
                        color={'#0b5ed7'}
                        loading={loading}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <>
                    <h2 className='text-sechead font-head font-[700] text-[1.2rem] md:text-[2.2rem] text-center my-[1%]'>
                        Worldwide COVID-19 Cases
                    </h2>
                    {/* Canvas element for the chart */}
                    <canvas id="chart" ref={chartRef}></canvas>
                </>
            )}
        </div>
    );
};

export default LineGraph;
