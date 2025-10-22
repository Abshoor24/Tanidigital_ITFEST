import tanamanData from "../data/tanaman.json";

interface Props {
  selectedTanaman: string;
  onSelect: (tanaman: string) => void;
}

export default function DropdownTanaman({ selectedTanaman, onSelect }: Props) {
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
        {tanamanData.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
