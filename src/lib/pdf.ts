export async function downloadPlanAsPDF(
  destination: string,
  duration: string
) {
  const element = document.getElementById("trip-plan-pdf");
  if (!element) {
    alert("No plan to download yet!");
    return;
  }

  const html2pdf = (await import("html2pdf.js")).default;
  await html2pdf()
    .set({
      margin: 12,
      filename: `trip-plan-${destination || "india"}-${duration}days.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(element)
    .save();
}