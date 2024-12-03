import React from "react";

interface Prefecture {
  code: number;
  name: string;
}

interface PrefectureSelectorProps {
  prefectures: Prefecture[];
  onSelect: (code: number) => void;
}

interface Prefecture {
  code: number;
  name: string;
}

interface PrefectureSelectorProps {
  prefectures: Prefecture[];
  onSelect: (code: number) => void;
}

const PrefectureSelector: React.FC<PrefectureSelectorProps> = ({
  prefectures,
  onSelect,
}) => {
  return (
    <select onChange={(e) => onSelect(Number(e.target.value))}>
      {prefectures.map((prefecture) => (
        <option key={prefecture.code} value={prefecture.code}>
          {prefecture.name}
        </option>
      ))}
    </select>
  );
};

export default PrefectureSelector;
