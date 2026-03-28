import { toPng } from "html-to-image";

function VaccineCard({ name, vaccine, certId }) {

  const downloadImage = () => {
    const node = document.getElementById("card");

    toPng(node).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "vaccination_card.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="mt-6 flex flex-col items-center">

      {/* CARD */}
      <div
        id="card"
        className="w-[380px] bg-white rounded-xl shadow-lg border p-5"
      >
        <h2 className="text-center text-lg font-bold mb-4">
          Vaccination Card
        </h2>

        {/* FLEX LAYOUT */}
        <div className="flex justify-between items-center">

          {/* LEFT TEXT */}
          <div className="text-sm space-y-2">
            <p><span className="font-semibold">Name:</span> {name}</p>
            <p><span className="font-semibold">Vaccine:</span> {vaccine}</p>
            <p className="text-green-600 font-bold">
              Vaccinated: YES ✅
            </p>
          </div>

          {/* RIGHT QR */}
          <div className="text-center">
            <img
              src={`http://localhost:5000/qr/qr_${certId}.png`}
              alt="QR"
              className="w-24 h-24 border"
            />
            <p className="text-xs mt-1">Scan to verify</p>
          </div>

        </div>
      </div>

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={downloadImage}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download Card
      </button>

    </div>
  );
}

export default VaccineCard;