import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function FullCertificate({ name, vaccine, certId }) {

  const safeName = name || "N/A";
  const safeVaccine = vaccine || "N/A";

  // ✅ Download PDF
  const downloadPDF = async () => {
    const element = document.getElementById("certificate");

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("vaccination_certificate.pdf");
  };

  // ✅ Download Image
  const downloadImage = () => {
    const node = document.getElementById("certificate");

    toPng(node).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "certificate.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="mt-6 flex flex-col items-center fade-in">

      {/* CERTIFICATE */}
      <div
        id="certificate"
        className="w-[600px] bg-white border-4 border-blue-700 rounded-xl shadow-2xl p-8"
      >

        {/* HEADER */}
        <div className="text-center border-b pb-3 mb-4">
          <h2 className="text-lg font-bold tracking-wide">
            Ministry of Health & Family Welfare
          </h2>
          <p className="text-sm text-gray-600">
            Government of India
          </p>
        </div>

        {/* TITLE */}
        <h3 className="text-center text-2xl font-bold text-blue-700 mb-6">
          COVID-19 Vaccination Certificate
        </h3>

        {/* BODY */}
        <div className="flex justify-between items-center">

          {/* LEFT */}
          <div className="text-sm space-y-3">

            <p><b>Beneficiary Name:</b> {safeName}</p>

            <p><b>Vaccine Name:</b> {safeVaccine}</p>

            <p>
              <b>Status:</b>{" "}
              <span className="text-green-600 font-semibold">
                Vaccinated ✅
              </span>
            </p>

            <p><b>Certificate ID:</b> {certId}</p>

            <p className="text-xs text-gray-500 mt-4">
              Issued Date: {new Date().toLocaleDateString()}
            </p>

          </div>

          {/* QR */}
          <div className="text-center">
            <img
              src={
                certId
                  ? `http://localhost:5000/qr/qr_${certId}.png`
                  : "https://via.placeholder.com/100"
              }
              alt="QR"
              className="w-28 h-28 border p-1"
            />
            <p className="text-xs mt-1">Scan to verify</p>
          </div>

        </div>

        {/* SIGNATURE */}
        <div className="flex justify-between items-end mt-10">

          <div>
            <p className="text-xs text-gray-500">
              This is a system generated certificate.
            </p>
          </div>

          <div className="text-right">
            <div className="border-t w-40 mb-1"></div>
            <p className="text-sm">Authorized Signatory</p>
          </div>

        </div>

        {/* FOOTER */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Together, India will defeat COVID-19 🇮🇳
        </p>

      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mt-4">

        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>

        <button
          onClick={downloadImage}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Download Image
        </button>

      </div>

    </div>
  );
}

export default FullCertificate;