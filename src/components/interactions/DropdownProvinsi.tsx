import type React from 'react';
import pronvinsiData from '../../data/provinsi.json';

interface Props {
    selectedProvinsi: string;
    onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export default function DropdownProvinsi({ selectedProvinsi, onSelect }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className='font-medium text-lg md:text-xl'>Pilih Provinsi :</label>
            <select
            title="select-provinsi" 
            className="border md:text-xl rounded-lg p-2 focus:ring-2 focus:ring-green-500 h-16"
            value={selectedProvinsi}
            onChange={(e) => onSelect(e.target.value)}
            >
                <option value="">--Pilih Provinsi--</option>
                {pronvinsiData.map((provinsi) => (
                    <option key={provinsi.id} value={provinsi.nama}>
                        {provinsi.nama}
                    </option>
                ))}
            </select>
        </div>
    )
}