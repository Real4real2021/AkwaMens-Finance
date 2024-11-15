const printReceiptLink = document.getElementById("print-receipt-button");
const receiptDiv = document.querySelector(".receipt");

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

printReceiptLink.addEventListener("click", () => {
    renderReceipt();
});

async function renderReceipt() {
  const response = await fetch("function/read-payment-entries.php");
  const payments = await response.json();
  
  // Assuming we want to display the most recent payment
  const latestPayment = payments[payments.length - 1];

  const html = `
    <h1>${latestPayment.customer}</h1>
    <div class="date-and-receipt-number align-right">
        <label for="date">Date: ${latestPayment.transactionDate}</label><br>
        <label for="receipt-no">Receipt No: ${latestPayment.referance}</label>
    </div>
    <div class="to-and-from">
        <label for="from">From: ${latestPayment.customer}</label><br>
        <label for="to" class="align-right">To: <p class="align-right">Company/Customer</p></label>
    </div>
    <div class="payment-details-table">
        <table>
            <thead>
                <tr>
                    <th>Customer's Reference</th>
                    <th>Type</th>
                    <th>Your VAT no.</th>
                    <th>Our Order NO</th>
                    <th>Due Date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${latestPayment.customer}</td>
                    <td>Customer Payment</td>
                    <td>123456789</td>
                    <td></td>
                    <td>${latestPayment.transactionDate}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="payment-terms">
        <label for="payment-terms">Payment Terms: Cash Only</label>
    </div>
    <div class="full-payment-summary">
        <table>
            <thead>
                <tr>
                    <th>Trans Type</th>
                    <th>#</th>
                    <th>Date</th>
                    <th>Total Amount</th>
                    <th>Left to Allocate</th>
                    <th>This Allocation</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>As Advance/full/part/payment towards</td>
                    <td>${latestPayment.referance}</td>
                    <td>${latestPayment.transactionDate}</td>
                    <td>${latestPayment.discountAmount}</td>
                    <td>0</td>
                    <td>${latestPayment.discountAmount}</td>
                </tr>
                <tr>
                    <td colspan="5" style="text-align: right;">Total</td>
                    <td>${latestPayment.discountAmount}</td>
                </tr>
            </tbody>
        </table>
    </div>
  `;

  receiptDiv.innerHTML = html;

  // Open a new window with the receipt content
  const receiptWindow = window.open('', '_blank');
  receiptWindow.document.write('<html><head><title>Receipt</title></head><body>');
  receiptWindow.document.write(html);
  receiptWindow.document.write('</body></html>');
  receiptWindow.document.close();
  receiptWindow.print();
}