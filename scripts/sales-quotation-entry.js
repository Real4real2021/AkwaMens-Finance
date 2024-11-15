// ... (keep the existing variable declarations and functions)
const inputDiv = document.querySelector(".first-quarter");
const itemsTable = document.querySelector(".second-quarter");
const newselector = document.querySelector(".new-selector");
const inputRow = document.querySelector(".input-row");
const deliveryLocationSelector = document.getElementById("location");
const cashAccountSelector = document.getElementById("cash-account-selector");
const comments = document.getElementById("comments");
const placeQuotationButton = document.getElementById("place-quotation-button");
const cancelQuotationButton = document.getElementById(
  "cancel-quotation-button"
);


renderInputFields();
renderItemsTable();

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

// Add theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
    updateThemeToggleText();
});

function updateThemeToggleText() {
    const isDarkTheme = body.classList.contains('dark-theme');
    themeToggle.textContent = isDarkTheme ? 'Light Theme' : 'Dark Theme';
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('darkTheme');
if (savedTheme === 'true') {
    body.classList.add('dark-theme');
}

// Initial update of theme toggle text
updateThemeToggleText();

const addItemButton = document.querySelector(".add-item-button");
const itemCodeInupt = document.getElementById("item-code");
const descriptionSelector = document.getElementById("description");
const quantityInput = document.getElementById("quantity");
const priceAfterTaxInput = document.getElementById("price-taxed");
const discountInput = document.getElementById("discount");
const totalCell = document.getElementById("total-cell");
const customerSelector = document.getElementById("customer-selector");
const branchSelector = document.getElementById("branch-selector");
const referenceInput = document.getElementById("reference");
const currentCreditElement = document.getElementById("current-credit");
const paymentSelector = document.getElementById("payment");
const priceListSelector = document.getElementById("price-list");
const dateInput = document.getElementById("quotation-date");
const table = document.querySelector(".table");
const unitCell = document.getElementById("unit-cell");

const salesQuotationInvoice = [];

let HTML = "";
addItemButton.addEventListener("click", () => {
  salesQuotationInvoice.push({
    referance: referenceInput.value,
    itemCode: itemCodeInupt.value,
    description: descriptionSelector.value,
    quantity: quantityInput.value,
    unit: 'each',
    priceAfterTax: priceAfterTaxInput.value,
    discount: discountInput.value,
    customer: customerSelector.value,
    branch: branchSelector.value,
    payment: paymentSelector.value,
    priceList: priceListSelector.value,
    date: dateInput.value
  });

  // console.log(salesQuotationInvoice)

  const newRowHTML = `
      <tr class="align-right">
          <td>${
            salesQuotationInvoice[salesQuotationInvoice.length - 1].itemCode
          }</td>
          <td>${
            salesQuotationInvoice[salesQuotationInvoice.length - 1].description
          }</td>
          <td>${
            salesQuotationInvoice[salesQuotationInvoice.length - 1].quantity
          }</td>
          <td></td>
          <td>${
            salesQuotationInvoice[salesQuotationInvoice.length - 1]
              .priceAfterTax
          }</td>
          <td>${
            salesQuotationInvoice[salesQuotationInvoice.length - 1].discount
          }</td>
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

placeQuotationButton.addEventListener("click", () => {
    const groupedData = salesQuotationInvoice.reduce((acc, item) => {
      if (!acc[item.referance]) {
        acc[item.referance] = []; // Create a new array for this referance
      }
      acc[item.referance].push({
        itemCode: item.itemCode,
        description: item.description,
        quantity: item.quantity,
        unit:item.unit,
        priceAfterTax: item.priceAfterTax,
        discount: item.discount,
        customer: item.customer,
        branch: branchSelector.value,
        payment: paymentSelector.value,
        priceList: priceListSelector.value,
        date: dateInput.value
      });
      return acc;
    }, {});
  
    // Prepare the data to be sent to the PHP script
    const dataToSend = {
      referance: Object.keys(groupedData), // Get the referances
      items: groupedData, // Grouped items
    };
  
    post("function/sales-quotation-entry.php", dataToSend).then((Data) => {
      console.log(Data);
    });
    alert("Data added to database");
  });


// Update the renderInputFields function
function renderInputFields() {
    let HTML = `
        <div class="input-group">
            <label for="customer-selector">Customer:</label>
            <select name="customer-selector" id="customer-selector"></select>
        </div>
        <div class="input-group">
            <label for="branch-selector">Branch:</label>
            <select name="branch-selector" id="branch-selector"></select>
        </div>
        <div class="input-group">
            <label for="reference">Reference:</label>
            <input type="text" name="reference" id="reference" />
        </div>
        <div class="input-group">
            <label for="current-credit">Current Credit:</label>
            <span id="current-credit">R 1000</span>
        </div>
        <div class="input-group">
            <label for="customer-discount">Customer Discount:</label>
            <span id="customer-discount">0%</span>
        </div>
        <div class="input-group">
            <label for="payment">Payment:</label>
            <select name="payment" id="payment">
                <option value="Cash Only">Cash Only</option>
                <option value="Due by 15th of the following month">Due by 15th of the following month</option>
                <option value="Due By The End Of The Following Month">Due By The End Of The Following Month</option>
                <option value="Payment Due Within 10 Days">Payment Due Within 10 Days</option>
                <option value="Prepaid">Prepaid</option>
            </select>
        </div>
        <div class="input-group">
            <label for="price-list">Price List:</label>
            <select name="price-list" id="price-list">
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
            </select>
        </div>
        <div class="input-group">
            <label for="quotation-date">Quotation Date:</label>
            <input type="date" name="quotation-date" id="quotation-date" />
        </div>
    `;
    inputDiv.innerHTML = HTML;
}

// Update the renderItemsTable function
function renderItemsTable() {
    let HTML = `
        <h2>Sales Quotation Items</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Item Code</th>
                    <th>Item Description</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Price after Tax</th>
                    <th>Discount %</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" id="item-code"></td>
                    <td>
                        <select id="description">
                            <option value="Products in Inventory">Products in Inventory</option>
                        </select>
                    </td>
                    <td><input type="text" id="quantity"></td>
                    <td id="unit-cell">each</td>
                    <td><input type="text" id="price-taxed"></td>
                    <td><input type="text" id="discount"></td>
                    <td id="total-cell">0.00</td>
                    <td><button class="add-item-button">Add Item</button></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="6" class="align-right">Shipping Charge</td>
                    <td><input type="text" id="charge-amount"></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="6" class="align-right">Sub-total</td>
                    <td class="align-right">0.00</td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="6" class="align-right">Amount Total</td>
                    <td class="align-right">0.00</td>
                    <td><button id="update-total">Update</button></td>
                </tr>
            </tfoot>
        </table>
    `;
    itemsTable.innerHTML = HTML;
}



customerSelectorOptions();


let innerOptions = "";
async function customerSelectorOptions() {
  const response = await fetch("function/read-and-manage-customers.php");
  const customers = await response.json();

  customers.forEach((customer) => {
    let options = `
        <option value="${customer.name}">${customer.name}</option> 
        `;

    innerOptions += options;
  });
  console.log(innerOptions);
  const customerSelectorElement = document.getElementById("customer-selector");
  customerSelectorElement.innerHTML = innerOptions;
}

let secondInnerOption = "";

async function productSelectorOptions() {
  const response = await fetch("function/read-item.php");
  const items = await response.json();

  items.forEach((item) => {
    let options = `
          <option value="${item.name}">${item.name}</option> 
          `;

    secondInnerOption += options;
  });
  const descriptionElement = document.getElementById("description");
  descriptionElement.innerHTML = secondInnerOption;
}

let thirdInnerOption = "";

async function branchSelectorOptions() {
  const response = await fetch("function/read-and-manage-branches.php");
  const branches = await response.json();

  branches.forEach((branch) => {
    let options = `
          <option value="${branch.branchName}">${branch.branchName}</option> 
          `;
    thirdInnerOption += options;
  });
  const branchSelector = document.getElementById("branch-selector");
  branchSelector.innerHTML = thirdInnerOption;
}


productSelectorOptions();
branchSelectorOptions();