import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getSteamPlayerCount = async (): Promise<number> => {
    try {
        const response = await axios.get(`${API_URL}/steam/player-count`);

        if (response.data && typeof response.data.playerCount === "number") {
            return response.data.playerCount;
        }

        throw new Error("Invalid data format received from Steam API!");
    } catch (error) {
        console.error("Steam service error for player count:", error);
        throw error;
    }
};
