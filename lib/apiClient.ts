// フロントエンド用ユーティリティ
import axios from "axios";

export async function fetchPopulation(prefCode: string) {
  const response = await axios.get(`/api/population?prefCode=${prefCode}`);
  return response.data;
}
