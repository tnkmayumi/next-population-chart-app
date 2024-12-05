"use client";
import { useEffect, useState } from "react";
import { fetchPopulation } from "../../lib/apiClient";
import PrefectureSelector from "../../components/PrefectureSelector";
import PopulationChart from "../../components/PopulationChart";
import CategorySelector from "../../components/CategorySelector";

interface PopulationData {
  year: number;
  value: number;
}

interface Prefecture {
  code: number;
  name: string;
}

const Home = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefCode, setSelectedPrefCode] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("総人口");
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //人口種別リストを定義
  const categories = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

  //都道府県リストをモックで定義(実行する際はAPIを呼び出して取得する想定)
  useEffect(() => {
    setPrefectures([
      { code: 1, name: "北海道" },
      { code: 13, name: "東京都" },
      { code: 27, name: "大阪府" },
      { code: 47, name: "沖縄県" },
    ]);
  }, []);

  //人口データの取得
  useEffect(() => {
    if (!selectedPrefCode) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchPopulation(selectedPrefCode.toString());
        //選択されたカテゴリに対応するデータのみを抽出してくる
        setPopulationData(data[category] || []);
      } catch (error) {
        console.error("Failed to fetch population data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedPrefCode, category]);

  return (
    <div>
      <header>
        <h1>都道府県人口構成グラフ</h1>
      </header>
      <main>
        <section>
          <h2>都道府県を選択</h2>
          <PrefectureSelector
            prefectures={prefectures}
            onSelect={(code) => setSelectedPrefCode(code)}
          />
        </section>
        <section>
          <h2>人口種別を選択</h2>
          <CategorySelector
            categories={categories}
            onSelect={(selectedCategory) => setCategory(selectedCategory)}
          />
        </section>
        <section>
          <h2>人口グラフ</h2>
          {loading ? (
            <p>データを読み込んでいます...</p>
          ) : populationData.length > 0 ? (
            <PopulationChart data={populationData} />
          ) : (
            <p>データがありません。都道府県と人口種別を選択してください。</p>
          )}
        </section>
      </main>
    </div>
  );
};
export default Home;
