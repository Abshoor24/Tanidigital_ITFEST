import tanamanData from "../data/tanaman.json";

interface Props {
  selectedTanaman: number;
  onSelect: (tanaman: number) => void;
}

export default function DropdownTanaman({ selectedTanaman, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-lg md:text-xl ">Pilih Tanaman :</label>
      <select
        title="select-tanaman"
        className="border md:text-xl rounded-lg p-2 focus:ring-2 focus:ring-green-500 h-16"
        value={selectedTanaman}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="">---pilih tanaman--</option>
        {tanamanData.map(({ name, value }, i) => (
          <option key={value} value={i}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
