const inputDiv = document.getElementById("input-div");
const firstTable = document.getElementById("first-table");
const secondTable = document.getElementById("second-table");

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
renderFirstTable();
renderSecondTable();

function renderInputs() {
    let html = `
    <label for="select-supplier">Select a Supplier:
            <select name="" id="supplier-selector"></select>
        </label>
        <select name="" id="transaction-selector">
          <option value="all-types">All Types</option>
          <option value="grns">GRNs</option> 
          <option value="invoices">Invoices</option> 
          <option value="unsetteld-transactions">Unsettled Transactions</option>  
          <option value="payments">Payments</option>  
          <option value="credit-notes">Credit Notes</option>   
          <option value="overdue-credit-notes">Overdue Credit Notes</option>   
          <option value="journal-entries">Journal Entries</option>   
        </select>
        <label for="from">From:
            <input type="date" name="" id="from-date-input">
        </label>
        <label for="to">To:
            <input type="date" name="" id="to-date-input">
        </label>
      <input type="button" value="Search" id="search-button">
    `
    inputDiv.innerHTML = html;
}

function renderFirstTable() {
    let html = `
    <table>
            <th>Currency</th>
            <th>Terms</th>
            <th>Current</th>
            <th>1-30 Days</th>
            <th>31-60 Days</th>
            <th>Over 60 Days</th>
            <th>Total Balance</th>
            <tbody>
                <tr>
                    <td>RAND</td>
                    <td>Cash Only</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>0.00</td>
                </tr>
            </tbody>
        </table>
    `
    firstTable.innerHTML = html;
}

function renderSecondTable() {
    let html = `
    <table id="inquiry-table">
            <th>Type</th>
            <th>#</th>
            <th>Reference</th>
            <th>Supplier</th>
            <th>Supplier's Referene</th>
            <th>Date</th>
            <th>Due Date</th>
            <th>Amount</th>
            <tbody>
                
            </tbody>
        </table>
    `
    secondTable.innerHTML = html;
}

async function supplierTransactionInquiry() {
  const inquiryTable = document.getElementById("inquiry-table");
  const readGrn = await fetch("function/read-direct-grn.php");
  const readSupplierInvoice = await fetch("function/read-direct-supplier-invoice-entries.php");
  const readPaymentToSupplier = await fetch("function/read-payment-to-supplier.php");
  const readSupplierCreditNote = await fetch("function/read-supplier-credit-notes.php");
  const readSupplierInvoices = await fetch("function/read-supplier-invoices.php");
  const readPurchaseOrder = await fetch("function/read-purchase-order-entries.php");

  const grn = await readGrn.json();
  const supplierInvoice = await readSupplierInvoice.json();
  const paymentToSupplier = await readPaymentToSupplier.json();
  const supplierCreditNote = await readSupplierCreditNote.json();
  const supplierInvoices = await readSupplierInvoices.json();
  const purchaseOrder = await readPurchaseOrder.json();

  grn.forEach((grnEntry)=>{
    let html = `
    <tr>
        <td>GRN</td>
        <td>${grnEntry.id}</td>
        <td>${grnEntry.reference}</td>
        <td>${grnEntry.supplier}</td>
        <td>${grnEntry.supplierReference}</td>
        <td>${grnEntry.orderDate}</td>
        <td>${grnEntry.delvierTo}</td>
        <td>${grnEntry.priceBeforeTax}</td>
    </tr>
    `
    inquiryTable.innerHTML += html;
  })

  supplierInvoice.forEach((supplierInvoiceEntry)=>{
    let html = `
    <tr>
        <td>Supplier Invoice</td>
        <td>${supplierInvoiceEntry.id}</td>
        <td>${supplierInvoiceEntry.reference}</td>        
        <td>${supplierInvoiceEntry.supplier}</td>
        <td>${supplierInvoiceEntry.supplierRef}</td>
        <td>${supplierInvoiceEntry.date}</td>
        <td>${supplierInvoiceEntry.dueDate}</td>
        <td>${supplierInvoiceEntry.amount}</td>
    </tr>
    `
    inquiryTable.innerHTML += html;
  })

  paymentToSupplier.forEach((paymentToSupplierEntry)=>{
    let html = `
    <tr>
        <td>Payment To Supplier</td>
        <td>${paymentToSupplierEntry.id}</td>
        <td>${paymentToSupplierEntry.reference}</td>
        <td>${paymentToSupplierEntry.paymentTo}</td>
        <td>${paymentToSupplierEntry.reference}</td>
        <td>${paymentToSupplierEntry.datePaid}</td>
        <td>${paymentToSupplierEntry.datePaid}</td>
        <td>${paymentToSupplierEntry.bankCharge}</td>
    </tr>
    `
    inquiryTable.innerHTML += html;
  })

  supplierCreditNote.forEach((supplierCreditNoteEntry)=>{
    let html = `
    <tr>
        <td>Supplier Credit Note</td>
        <td>${supplierCreditNoteEntry.id}</td>
        <td>${supplierCreditNoteEntry.reference}</td>
        <td>${supplierCreditNoteEntry.supplier}</td>
        <td>${supplierCreditNoteEntry.supplierRef}</td>
        <td>${supplierCreditNoteEntry.date}</td>
        <td>${supplierCreditNoteEntry.dueDate}</td>
        <td>${supplierCreditNoteEntry.amount}</td>
    </tr>
    `
    inquiryTable.innerHTML += html;
  })

  supplierInvoices.forEach((supplierInvoiceEntry)=>{
    let html = `
    <tr>
        <td>Supplier Invoice</td>
        <td>${supplierInvoiceEntry.id}</td>
        <td>${supplierInvoiceEntry.reference}</td>
        <td>${supplierInvoiceEntry.supplier}</td>
        <td>${supplierInvoiceEntry.supplierRef}</td>
        <td>${supplierInvoiceEntry.date}</td>
        <td>${supplierInvoiceEntry.dueDate}</td>
        <td>${supplierInvoiceEntry.amount}</td>
    </tr>
    `
    inquiryTable.innerHTML += html;
  })

  purchaseOrder.forEach((purchaseOrderEntry)=>{
    let html = `
    <tr>
        <td>Purchase Order</td>
        <td>${purchaseOrderEntry.id}</td>
        <td>${purchaseOrderEntry.reference}</td>
        <td>${purchaseOrderEntry.supplier}</td>
        <td>${purchaseOrderEntry.supplierReference}</td>
        <td>${purchaseOrderEntry.date}</td>
        <td>${purchaseOrderEntry.deliverTo}</td>
        <td>${purchaseOrderEntry.priceBeforeTax}</td>
    </tr>
    `
    inquiryTable.innerHTML += html;
  })
}

supplierTransactionInquiry();