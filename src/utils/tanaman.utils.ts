import type React from "react";
import { fetchWeatherData, type WeatherData } from "./api";
import toast from "react-hot-toast";
import plantsData from "../data/tanaman.json"

interface PredictionLogic {
    provinsiData: any[]
    selectedProvinsi: string
    selectedPlantIndex: number
    setWeatherData: React.Dispatch<React.SetStateAction<WeatherData[]>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setStatus: React.Dispatch<React.SetStateAction<string[]>>
    setConclusion: React.Dispatch<React.SetStateAction<string>>
}

export const PredictionLogicHandle = async (data: PredictionLogic) => {
    data.setLoading(true)
    try {
        const prov = data.provinsiData.find((p) => p.nama === data.selectedProvinsi);
        if (!prov) {
            toast.error("Pilih provinsi dan tanaman terlebih dahulu.");
            return;
        }

        const dataTanam = await fetchWeatherData(
            prov.latitude,
            prov.longitude,
            "tanam"
        );
        const dataPanen = await fetchWeatherData(
            prov.latitude,
            prov.longitude,
            "panen"
        );

        const tanaman = plantsData[data.selectedPlantIndex]
        const { harvest, plant } = tanaman
        let hasilTanam = "";
        let hasilPanen = "";

        // logic prediksi tanam dan panen
        if (
            dataPanen.rainSum <= harvest.rainfall &&
            dataPanen.soilMoisture >= harvest.minSoilMoisture &&
            dataPanen.soilMoisture <= harvest.maxSoilMoisture
        ) {
            hasilPanen = `${harvest.messages.ideal}`;
        } else if (dataPanen.rainSum > harvest.delayRainfall) {
            hasilPanen = `☔ ${harvest.messages.delay} (${dataPanen.rainSum.toFixed(1)} mm)`;
        } else {
            hasilPanen = `${harvest.messages.ok}`;
        }

        // Tanam
        if (
            dataTanam.rainSum >= plant.rainsum &&
            dataTanam.soilMoisture >= plant.minSoilMoisture
        ) {
            hasilTanam = `${plant.messages.ideal}`;
        } else {
            hasilTanam = `${plant.messages.notIdeal}`;
        }

        data.setWeatherData([dataTanam, dataPanen]);
        data.setStatus([hasilTanam, hasilPanen]);
        data.setConclusion(`${hasilTanam}\n & \n${hasilPanen}`);
    } catch (error) {
        return
    } finally {
        data.setLoading(false)
    }
};