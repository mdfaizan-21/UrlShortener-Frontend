import React from "react";
// Import the Bar component from the React wrapper for Chart.js
import { Bar } from "react-chartjs-2";

// Import core Chart.js modules needed for a Bar chart
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    Filler,
} from "chart.js";

// Register the modules so Chart.js knows how to use them
ChartJS.register(
    BarElement,   // Required for drawing the bars
    Tooltip,      // Shows the pop-up when hovering over a bar
    CategoryScale, // Required for the X-axis (Dates/Text)
    LinearScale,   // Required for the Y-axis (Numbers/Counts)
    Legend,       // Shows the "Total Clicks" label at the top
    Filler        // Useful if you decide to add background fill effects
);

/**
 * Graph Component
 * @param {Array} graphData - Expects an array of objects: [{clickDate: "2023-10-01", count: 10}, ...]
 */
const Graph = ({ graphData }) => {
    
    // 1. DATA PREPARATION
    const labels = graphData?.map((item) => `${item.clickDate}`);
    const userPerDaya = graphData?.map((item) => item.count);

    // 2. CHART CONFIGURATION (The "What")
    const data = {
        labels: graphData.length > 0
                ? labels
                : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        
        datasets: [
            {
                label: "Total Clicks",
                data: graphData.length > 0
                        ? userPerDaya
                        : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
                
                // Blue-violet gradient feel for actual data, faint white for ghost data
                backgroundColor: graphData.length > 0 ? "rgb(0, 236, 159)" : "rgba(255, 255, 255, 0.05)",
                
                borderColor: "transparent",
                pointBorderColor: "transparent",
                fill: true,
                tension: 0.4,
                barThickness: 20,
                borderRadius: 4,
                categoryPercentage: 1.5,
                barPercentage: 1.5,
            },
        ],
    };

    // 3. CHART OPTIONS (The "How it Looks")
    const options = {
        maintainAspectRatio: false, 
        responsive: true,           
        plugins: {
            legend: {
                display: true,      
                labels: {
                    color: "#9ca3af", // text-gray-400
                    font: {
                        family: "'Inter', sans-serif",
                        weight: "500"
                    }
                }
            },
            tooltip: {
                backgroundColor: "rgba(10, 10, 10, 0.9)",
                titleColor: "#ffffff",
                bodyColor: "#d1d5db",
                borderColor: "rgba(255,255,255,0.1)",
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
            }
        },
        scales: {
            y: {
                beginAtZero: true, 
                grid: {
                    color: "rgba(255,255,255,0.05)", // Faint white grid lines
                    drawBorder: false,
                },
                ticks: {
                    color: "#9ca3af",
                    callback: function (value) {
                        if (Number.isInteger(value)) {
                            return value.toString();
                        }
                        return "";
                    },
                },
                title: {
                    display: true,
                    text: "Number Of Clicks",
                    color: "#d1d5db",
                    font: { weight: "600", family: "'Inter', sans-serif" },
                },
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: "#9ca3af",
                },
                title: {
                    display: true,
                    text: "Date",
                    color: "#d1d5db",
                    font: { weight: "600", family: "'Inter', sans-serif" },
                },
            },
        },
    };

    // 4. RENDERING
    return <Bar className="w-full" data={data} options={options}></Bar>;
};

export default Graph;