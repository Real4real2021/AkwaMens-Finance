const selectSupplier = document.getElementById("select-supplier");
const table = document.getElementById("table");

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

renderInputs();
renderTable();

function renderInputs() {
    let html = `
    <label for="select-supplier">Select a Supplier:
            <select name="" id="supplier-selector"></select>
        </label><br>
        <label for="show-settled-items">Show Settled Items:
            <input type="radio" name="" id="radio-settled-items">
        </label>
    `
    selectSupplier.innerHTML = html;
}

function renderTable() {
    let html = `
    <table id="allocate-supplier-payment-or-credit-note-table">
            <th>Transaction Type</th>
            <th>#</th>
            <th>Reference</th>
            <th>Date</th>
            <th>Supplier</th>
            <th>Currency</th>
            <th>Total</th>
            <th>Left to Allocate</th>
            <tbody>
                
            </tbody>
        </table>
    `
    table.innerHTML = html;
}

async function searchAllocateSupplierPaymentOrCreditNote() {
    const allocateTable = document.getElementById("allocate-supplier-payment-or-credit-note-table");
    const paymentToSupplier = await fetch("function/read-payment-to-supplier.php");
    const payments = await paymentToSupplier.json();

    const supplierCreditNotes = await fetch("function/read-supplier-credit-notes.php");
    const creditNotes = await supplierCreditNotes.json();
    
    payments.forEach((payment)=>{
        let html = `
        <tr>
            <td>Payment</td>
            <td>${payment.id}</td>
            <td>${payment.reference}</td>
            <td>${payment.datePaid}</td>
            <td>${payment.paymentTo}</td>
            <td>${payment.amount}</td>
            <td>${payment.bankCharge}</td>
            <td>${payment.dimensions}</td>
            <td><input type="button" value="Allocate" id="allocate-button"></td>
        </tr>
        `
        allocateTable.innerHTML += html;
    })


    creditNotes.forEach((creditNote)=>{
        let html = `
        <tr>
            <td>Credit Note</td>
            <td>${creditNote.id}</td>
            <td>${creditNote.reference}</td>
            <td>${creditNote.date}</td>
            <td>${creditNote.supplier}</td>
            <td>${creditNote.supplierCurrency}</td>
            <td>${creditNote.amount}</td>
            <td>${creditNote.paymentTerms}</td>
            <td><input type="button" value="Allocate" id="allocate-button"></td>
        </tr>
        `
        allocateTable.innerHTML += html;
    })
}

searchAllocateSupplierPaymentOrCreditNote();

