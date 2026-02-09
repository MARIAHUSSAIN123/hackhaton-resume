import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadPDF = () => {
  const element = document.getElementById("resume-preview");

  html2canvas(element).then((canvas) => {
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(img, "PNG", 0, 0, 210, 297);
    pdf.save("resume.pdf");
  });
};
