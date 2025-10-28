type ClearButtonProps = {
    show: boolean;
};

export default function ClearButton({ show }: ClearButtonProps) {
    if (!show) return null;
    return (
        <button
            onClick={() => window.location.reload()}
            className="w-full bg-red-500 text-white px-6 py-3 rounded-lg font-semibold 
            transition-all duration-300 shadow-md hover:shadow-lg hover:bg-red-300 hover:opacity-70 mt-4"
        >
            🔄 Mulai Ulang Prediksi
        </button>
    );
}