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
    // Map the complex objects into simple arrays that Chart.js understands
    // labels: ["2023-10-01", "2023-10-02"]
    const labels = graphData?.map((item) => `${item.clickDate}`);
    // counts: [10, 25]
    const userPerDaya = graphData?.map((item) => item.count);

    // 2. CHART CONFIGURATION (The "What")
    const data = {
        // If data exists, use real labels; otherwise, show blank slots for the placeholder
        labels: graphData.length > 0
                ? labels
                : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        
        datasets: [
            {
                label: "Total Clicks",
                // If data exists, use real counts; otherwise, use dummy numbers (1,2,3...) for a "ghost" graph
                data: graphData.length > 0
                        ? userPerDaya
                        : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
                
                // Blue color if data is real, light gray-blue if it's just a placeholder
                backgroundColor: graphData.length > 0 ? "#3b82f6" : "rgba(54, 162, 235, 0.1)",
                
                borderColor: "#1D2327",
                pointBorderColor: "red",
                fill: true,
                tension: 0.4,      // Adds a slight curve/smoothness (mostly used for Line charts)
                barThickness: 20,  // The width of each bar in pixels
                categoryPercentage: 1.5,
                barPercentage: 1.5,
            },
        ],
    };

    // 3. CHART OPTIONS (The "How it Looks")
    const options = {
        maintainAspectRatio: false, // Allows the chart to fill the height of its container
        responsive: true,           // Chart resizes automatically when the window changes
        plugins: {
            legend: {
                display: true,      // Shows the "Total Clicks" dataset label
            },
        },
        scales: {
            y: {
                beginAtZero: true,  // Forces the Y-axis to start at 0 (essential for honest data)
                ticks: {
                    // Logic to ensure the Y-axis only shows whole numbers (1, 2, 3...)
                    // and doesn't show 1.5 or 2.5 clicks
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
                    font: { weight: "bold", color: "#FF0000" },
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Date",
                    font: { weight: "bold", color: "#FF0000" },
                },
            },
        },
    };

    // 4. RENDERING
    // Renders the Bar chart component with all the defined data and settings
    return <Bar className="w-full" data={data} options={options}></Bar>;
};

export default Graph;