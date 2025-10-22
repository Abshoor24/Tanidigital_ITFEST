interface Props {
  selectedTanaman: string;
  onSelect: (tanaman: string) => void;
}

export default function DropdownTanaman({ selectedTanaman, onSelect }: Props) {
  const tanamanList = [
    { name: "🌾 Padi", value: "padi" },
    { name: "🌽 Jagung", value: "jagung" },
    { name: "🌶️ Cabai", value: "cabai" },
    { name: "🍅 Tomat", value: "tomat" },
    { name: "☕ Kopi", value: "kopi" },
    { name: "🍃 Teh", value: "teh" },
    { name: "🧄 Bawang Merah", value: "bawang-merah" },
    { name: "🌱 Singkong", value: "singkong" },
    { name: "🌴 Kelapa Sawit", value: "kelapa-sawit" },
    { name: "🍂 Tembakau", value: "tembakau" },
  ];
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">Pilih Tanaman :</label>
      <select
        title="select-tanaman"
        className="border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
        value={selectedTanaman}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">---pilih tanaman--</option>
        {tanamanList.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
