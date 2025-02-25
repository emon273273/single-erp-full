import Button from "@/UI/Button";

function CustomInvoiceDownload() {
  // Function to handle the download
  const handleDownload = () => {
    // Path to the image in your assets folder
    const imagePath = "src/assets/images/invoice/inv3.jpg"; // Adjust the path as needed

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = imagePath;
    link.download = "invoice-image.jpg"; // Specify the filename for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Button to trigger the download */}
      <Button onClick={handleDownload}>Sample Invoice</Button>
    </>
  );
}

export default CustomInvoiceDownload;
