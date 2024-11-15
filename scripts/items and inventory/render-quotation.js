const printQuotationButton = document.getElementById("print-this-quotation");

printQuotationButton.addEventListener("click", async () => {
    const reference = "2"; // Replace with the actual reference you want to fetch
    const response = await fetch(`function/read-sales-quotation-entries.php?referance=${reference}`);
    const invoiceData = await response.json();

    if (invoiceData.length > 0) {
        renderInvoice(invoiceData);
    } else {
        console.error("No invoice data found for the given reference.");
    }
});

function renderInvoice(invoiceData) {
    const latestInvoice = invoiceData[0]; // Assuming you want the first invoice

    const html = `
        <h1>Invoice for ${latestInvoice.customer}</h1>
        <div class="date-and-invoice-number align-right">
            <label for="date">Date: ${latestInvoice.date}</label><br>
            <label for="invoice-no">Invoice No: ${latestInvoice.reference}</label>
        </div>
        <div class="invoice-details">
            <table>
                <thead>
                    <tr>
                        <th>Item Code</th>
                        <th>Item Description</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Price After Tax</th>
                        <th>Discount</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoiceData.map(item => `
                        <tr>
                            <td>${item.itemCode}</td>
                            <td>${item.itemDescription}</td>
                            <td>${item.quantity}</td>
                            <td>${item.unit}</td>
                            <td>${item.priceAfterTax}</td>
                            <td>${item.discount}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    // Open a new window with the invoice content
    const invoiceWindow = window.open('', '_blank');
    invoiceWindow.document.write('<html><head><title>Invoice</title></head><body>');
    invoiceWindow.document.write(html);
    invoiceWindow.document.write('</body></html>');
    invoiceWindow.document.close();
    invoiceWindow.print();
}