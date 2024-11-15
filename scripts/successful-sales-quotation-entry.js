const viewQuotationButton = document.querySelector(".view-quotation");

function loading() {
  console.log("loading");
}

let skipLoading = false;

async function post(url, data, options = {}) {
  const { timeout = 8000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  if (!url.includes("notifications")) {
    if (!skipLoading) loading();
    const responseText = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...options,
      body: JSON.stringify(data),
    });
    clearTimeout(id);
    if (!skipLoading) loading();
    if (skipLoading) skipLoading = false;
    return responseText.json();
  }
  const responseText = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.log(error);
  });
  if (skipLoading) skipLoading = false;
  return responseText.json();
}

async function renderQuotation() {
  const response = await fetch("function/read-sales-quotation-entries.php");
  const quotation = await response.json();

  quotation.forEach((quotationEntry) => {
    let html = `
        <tr>
            <td>${quotationEntry.itemCode}</td>
            <td>${quotationEntry.description}</td>
            <td>${quotationEntry.quantity}</td>
            <td>${quotationEntry.unit}</td>
            <td>${quotationEntry.priceAfterTax}</td>
            <td>${quotationEntry.discount}</td>
        </tr>
        `;

    const receiptWindow = window.open("", "_blank");
    receiptWindow.document.write(
      "<html><head><title>Receipt</title></head><body>"
    );
    receiptWindow.document.write(html);
    receiptWindow.document.write("</body></html>");
    receiptWindow.document.close();
    receiptWindow.print();
  });
}

viewQuotationButton.addEventListener("click", () => {
  renderQuotation();
});
