const inputDiv = document.getElementById("first-fifth");
const SelectedToAddToCreditNoteTableDiv = document.getElementById("second-fifth");
const glItemsForInvoiceTableDiv = document.getElementById("third-fifth");

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

checkTables();
renderInputs();
renderSelectedToAddToCreditNoteTable();
renderGLItemsForInvoiceTable();

async function checkTables() {
    const response = await fetch("exec/create.php");
    const result = await response.json();
    console.log(result); // Log the result to see if tables were created successfully
    return result.success; // Assuming the PHP script returns a success property
}

function renderInputs() {
    let html = `
    <div>
            <label for="supplier">Supplier:
                <select name="" id="supplier-selector"></select>
            </label><br>
            <label for="date">Date:
                <input type="date" name="" id="date-input">
            </label><br>
            <label for="reference">Reference:
                <input type="text" name="" id="reference-input">
            </label><br>
            <label for="supplier-ref">Supplier Ref:
                <input type="text" name="" id="supplier-ref-input">
            </label>
        </div>
        <div>
            <label for="due-date">Due Date:
                <input type="date" name="" id="due-date">
            </label><br>
            <label for="terms">Terms:
                <select name="" id="terms-selector"></select>
            </label><br>
            <label for="Dimensions">Dimensions:
                <select name="" id="dimension-selector"></select>
            </label>
        </div>
        <div id="supplier-currency">
            <label for="supplier-currency">Supplier's supplier-currency:
                <select name="" id="currency-selector"></select>
            </label><br>
            <label for="exchange-rate">Exchange Rate:
                <input type="text" name="" id="exchange-rate-input">
            </label><br>
            <label for="tax-group">Tax Group:
                <select name="" id="tax-group-selector"></select>
            </label><br>
            <label for="current-credit">Current Credit:
                <input type="text" name="" id="current-credit-input">
            </label>
        </div>
    `
    inputDiv.innerHTML = html;
}

function renderSelectedToAddToCreditNoteTable() {
    let html = `
    <h2>Delivery Items Selected For Adding To A Supplier Credit Note</h2>
        <table>
            <th>Delivery</th>
            <th>P.O.</th>
            <th>Item</th>
            <th>Description</th>
            <th>Recived On</th>
            <th>Quantity Received</th>
            <th>Quantity Invoiced</th>
            <th>Qty Yet to Invoiced</th>
            <th>Price Before Tax</th>
            <th>Total</th>
            <tbody>
                <tr></tr>
            </tbody>
        </table>
    `
    SelectedToAddToCreditNoteTableDiv.innerHTML = html;
}

function renderGLItemsForInvoiceTable() {
    let html = `
    <h2>GL Items for this Invoice</h2>
        <table class="table">
            <th>Account</th>
            <th>name</th>
            <th>Dimensions</th>
            <th>Amount</th>
            <th>Memo</th>
            <tbody>
                <tr>
                    <td><input type="text" name="" id="account-input"></td>
                    <td><select name="" id="name-selector"></select></td>
                    <td><select name="" id="dimension-selector"></select></td>
                    <td><input type="text" name="" id="amount-input"></td>
                    <td><input type="text" name="" id="memo-input"></td>
                    <td><input type="button" value="Add" id="add-button"></td>
                    <td><input type="button" value="Reset" id="reset-button"></td>
                </tr>
                <tr></tr>
                <tr></tr>
            </tbody>
        </table>
    `
    glItemsForInvoiceTableDiv.innerHTML = html;
}

const table = document.querySelector("table");
const addButton = document.getElementById("add-button");
const resetButton = document.getElementById("reset-button");
const enterCreditNoteButton = document.getElementById("enter-credit-note-button");
const supplier = document.getElementById("supplier-selector");
const date = document.getElementById("date-input");
const reference = document.getElementById("reference-input");
const supplierRef = document.getElementById("supplier-ref-input"); 
const dueDate = document.getElementById("due-date"); 
const paymentTerms = document.getElementById("terms-selector"); 
const Dimensions = document.getElementById("dimension-selector");
const supplierCurrency = document.getElementById("currency-selector");
const exchangeRate = document.getElementById("exchange-rate-input");
const taxGroup = document.getElementById("tax-group-selector");
const currentCredit = document.getElementById("current-credit-input");
const account = document.getElementById("account-input");
const name = document.getElementById("name-selector");
const dimension = document.getElementById("dimension-selector");
const amount = document.getElementById("amount-input");
const memo = document.getElementById("memo-input");

const glItems = [];

addButton.addEventListener("click", () => {
    glItems.push({
        supplier: supplier.value,
        date: date.value,
        reference: reference.value,
        supplierRef: supplierRef.value,
        dueDate: dueDate.value,
        paymentTerms: paymentTerms.value,
        dimensions: Dimensions.value,
        supplierCurrency: supplierCurrency.value,
        exchangeRate: exchangeRate.value,
        taxGroup: taxGroup.value,
        currentCredit: currentCredit.value,
        account: account.value,
        name: name.value,
        dimension: Dimensions.value,
        amount: amount.value,
        memo: memo.value,
    });
    const newRowHTML = `
      <tr class="align-right">
          <td>${
            glItems[glItems.length - 1].account
          }</td>
          <td>${
            glItems[glItems.length - 1].name
          }</td>
          <td>${
            glItems[glItems.length - 1].dimension
          }</td>
          <td>${
            glItems[glItems.length - 1].amount
          }</td>
          <td>${glItems[glItems.length - 1].memo}</td>
      </tr>
  `;

  // Create a new table row element
  const newTr = document.createElement("tr");
  newTr.innerHTML = newRowHTML;

  // Get the table body and insert the new row after the first row
  const tableBody = table.querySelector("tbody");
  const firstRow = tableBody.querySelector("tr"); // Get the first row
  tableBody.insertBefore(newTr, firstRow.nextSibling);
});


enterCreditNoteButton.addEventListener("click", () => {
    const groupedData = glItems.reduce((acc, item) => {
        if (!acc[item.reference]) {
          acc[item.reference] = []; // Create a new array for this reference
        }
        acc[item.reference].push({
            supplier: item.supplier,
            date: item.date,
            supplierRef: item.supplierRef,
            dueDate: item.dueDate,
            paymentTerms: item.paymentTerms,
            dimensions: item.dimensions,
            supplierCurrency: item.supplierCurrency,
            exchangeRate: item.exchangeRate,
            taxGroup: item.taxGroup,
            currentCredit: item.currentCredit,
            account: item.account,
            name: item.name,
            dimension: item.dimension,
            amount: item.amount,
            memo: item.memo,
        });
        return acc;
      }, {});
    
      // Prepare the data to be sent to the PHP script
      const dataToSend = {
        reference: Object.keys(groupedData), // Get the references
        items: groupedData, // Grouped items
      };
    
      post("function/supplier-credit-notes.php", dataToSend).then((Data) => {
        console.log(Data);
      });
});

