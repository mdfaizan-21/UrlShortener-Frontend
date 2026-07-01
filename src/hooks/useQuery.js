import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useFetchMyShortUrls = (token, onError) => {
    return useQuery({
        // 1. Give this specific request a unique name so React Query can remember it.
        queryKey: ["my-shortenurls", token],

        // 2. This is the "messenger" that goes to the server to get the data.
        queryFn: async () => {
            const response = await api.get("/api/urls/myurls", {
                headers: {
                    // This is like showing your ID card to the server to prove who you are.
                    Authorization: "Bearer " + token,
                },
            });
            // Send back the raw data we got from the server.
            return response.data;
        },

        // 3. This part cleans up the data before the rest of your app sees it.
        select: (rawData) => {
            // We want the newest links first, so we sort them by their creation date.
            // We make a copy of the data first so we don't accidentally mess up the original.
            const sorted = [...rawData].sort((a, b) => {
                return new Date(b.createdTime) - new Date(a.createdTime);
            });
            return sorted;
        },

        // If something goes wrong (like a server error), run this "emergency" function.
        onError,

        // Don't ask the server for new data again if it's been less than 5 seconds.
        staleTime: 5000,
    });
};

export const useFetchTotalClicks = (token, onError) => {
    return useQuery({
        // 1. A unique name for this specific request.
        queryKey: ["url-totalclick", token],

        // 2. The function that actually talks to the backend.
        queryFn: async () => {
            const response = await api.get(
                "/api/urls/totalClicks?startDate=2026-01-01&endDate=2026-12-31",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            return response.data;
        },

        // 3. Reshaping the data. 
        // The server sends data like: {"Jan-01": 10}.
        // But charts usually want: { date: "Jan-01", count: 10 }.
        select: (rawData) => {
            // We take every "Date" key in the data and turn it into a neat list (array).
            const chartReadyData = Object.keys(rawData).map((date) => {
                return {
                    clickDate: date, // The date label
                    count: rawData[date], // The number of clicks for that date
                };
            });
            return chartReadyData;
        },

        onError,
        staleTime: 5000,
    });
};