

interface Props {
  selectedTanaman: string;
  onSelect: (tanaman: string) => void;
}

export default function DropdownTanaman({ selectedTanaman, onSelect }: Props) {
    const tanamanList = ['Padi', 'Jagung'];
    return(
        <div className='flex flex-col gap-1'>
            <label className='font-medium'>Pilih Tanaman :</label>
            <select className='border rounded-lg p-2 focus:ring-2 focus:ring-green-500'
            value={selectedTanaman}
            onChange={(e) => onSelect(e.target.value)}
            >
                <option value="">---pilih tanaman--</option>
                {tanamanList.map((tanaman) => (
                    <option key={tanaman} value={tanaman}>
                        {tanaman}
                    </option>
                ))}
            </select>
        </div>
    )
}