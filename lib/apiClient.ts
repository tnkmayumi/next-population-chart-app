// フロントエンド用ユーティリティ
import axios from "axios";

// export async function fetchPopulation(prefCode: string) {
//   const response = await axios.get(`/api/population?prefCode=${prefCode}`);
//   return response.data;
// }

export const fetchPopulation = async (prefCode: string) => {
  try {
    const response = await axios.get(`/api/population/route`, {
      params: { prefCode },
      headers: {
        "X-API-KEY": process.env.NEXT_API_KEY || "",
      },
    });

    const contentType = response.headers["content-Type"];
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid Content-Type in response");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error(
        `Failed ti fetch population data: ${error.response?.status || "Unknown error"}`
      );
    }
    throw error;
  }
};
