import { NextResponse } from "next/server"; // NextResponseに修正
import axios from "axios";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const prefCode = url.searchParams.get("prefCode");

  if (!prefCode) {
    return NextResponse.json({ error: "Missing prefCode" }, { status: 400 });
  }

  const API_URL = "https://yumemi-frontend-engineer-codecheck-api.vercel.app";
  const API_KEY = process.env.NEXT_API_KEY;

  if (!API_KEY) {
    console.error("API key is missing.");
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  try {
    console.log("Requesting API with URL:", `${API_URL}?prefCode=${prefCode}`);

    const response = await axios.get(`${API_URL}?prefCode=${prefCode}`, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
