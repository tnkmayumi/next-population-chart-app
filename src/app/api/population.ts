// サーバーサイドAPIを作成
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_URL = "https:yumemi-frontend-engineer-codecheck-api.vercel.app";
const API_KEY = process.env.API_KEY || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prefCode } = req.query;

  if (!prefCode) {
    return res.status(400).json({ error: "Missing prefCode parameter" });
  }
  try {
    const response = await axios.get(`${API_URL}?prefCode=${prefCode}`, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "API Error:",
      isErrorWithMessage(error) ? error.message : error
    );
    res.status(500).json({ error: "Failed to fetch data" });
  }
}

// エラーチェック用のユーティリティ関数
function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: string }).message === "string"
  );
}
