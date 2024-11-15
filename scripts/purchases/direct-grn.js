const inputDiv = document.getElementById("top-third");
const tableDiv = document.getElementById("mid-third");

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
renderTable();

async function checkTables() {
  const response = await fetch("exec/create.php");
  const result = await response.json();
  console.log(result); // Log the result to see if tables were created successfully
  return result.success; // Assuming the PHP script returns a success property
}

function renderInputs() {
  let html = `
    <div id="supplier-details-1">
            <label for="supplier">Supplier:
                <select name="supplier-selector" id="supplier-selector">
                    <option value="supplier-1">Supplier 1</option>
                </select>
            </label><br>
            <label for="order-date">Order Date:
                <input type="date" id="date-input">
            </label><br>
            <label for="current-credit">Current Credit:
                0.00
            </label><br>
            <label for="supplier-currency">Supplier Currency:
                <input type="text" id="supplier-currency-input" placeholder="RAND">
            </label><br>
            <label for="exchange-rate">Exchange Rate:
                <input type="text" id="exchange-rate-input" placeholder="1.0000"> RAND = 19USD
            </label><br>
            <label for="reference">Reference:
                <input type="text" id="reference-input">
            </label>
        </div>
        <div id="supplier-reference">
            <label for="supplier-reference">Supplier Reference:
                <input type="text" id="supplier-reference-input">
            </label><br>
            <label for="dimensions">Dimensions:
                <select name="dimensions-selector" id="dimensions-selector">
                    <option value="default">default</option>
                </select>
            </label><br>
            <label for="receive-into">Receive Into:
                <select name="receive-into-selector" id="receive-into-selector">
                    <option value="default">Default</option>
                </select>
            </label>
        </div>
        <div id="deliver-to">
            <label for="deliver-to">Delvier To:
                <input type="text" id="deliver-to-input">
            </label>
        </div>
    `;
  inputDiv.innerHTML = html;
}

function renderTable() {
  let html = `
    <table class="table">
            <th>Item Code</th>
            <th>Item Description</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Required Delviery Date</th>
            <th>Price Before Tax</th>
            <th>Line Total</th>
            <tbody>
                <tr>
                    <td><input type="text" name="" id="item-code-input"></td>
                    <td><select name="" id="item-description-selector"></select></td>
                    <td><input type="text" name="" id="quantity-input"></td>
                    <td id="unit-cell">each</td>
                    <td><input type="date" name="" id="required-delivery-date-input"></td>
                    <td><input type="text" name="" id="price-before-tax-input"></td>
                    <td></td>
                    <td><input type="button" value="Add Item"  id="add-item-button"></td>
                </tr>
                <tr>
                    <td colspan="6">Sub-total</td>
                    <td>0.00</td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="6">Amount Total</td>
                    <td>0.00</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    `;
  tableDiv.innerHTML = html;
}

const table = document.querySelector("table");
const addItemButton = document.getElementById("add-item-button");
const supplierSelector = document.getElementById("supplier-selector");
const orderDate = document.getElementById("date-input");
const currency = document.getElementById("supplier-currency-input");
const exchangeRate = document.getElementById("exchange-rate-input");
const reference = document.getElementById("reference-input");
const supplierReference = document.getElementById("supplier-reference-input");
const dimensionsSelector = document.getElementById("dimensions-selector");
const receiveIntoSelector = document.getElementById("receive-into-selector");
const deliverTo = document.getElementById("deliver-to-input");
const itemCode = document.getElementById("item-code-input");
const descriptionSelector = document.getElementById(
  "item-description-selector"
);
const quantityInput = document.getElementById("quantity-input");
const unitCell = document.getElementById("unit-cell");
const requiredDeliveryDate = document.getElementById(
  "required-delivery-date-input"
);
const priceBeforeTax = document.getElementById("price-before-tax-input");
const placeDirectGrnButton = document.getElementById("place-direct-grn-button");

const directGrnItems = [];
addItemButton.addEventListener("click", () => {
  directGrnItems.push({
    supplier: supplierSelector.value,
    orderDate: orderDate.value,
    currency: currency.value,
    exchangeRate: exchangeRate.value,
    reference: reference.value,
    supplierReference: supplierReference.value,
    dimensions: dimensionsSelector.value,
    receiveInto: receiveIntoSelector.value,
    deliverTo: deliverTo.value,
    itemCode: itemCode.value,
    description: descriptionSelector.value,
    quantity: quantityInput.value,
    unit: unitCell.innerHTML,
    requiredDeliveryDate: requiredDeliveryDate.value,
    priceBeforeTax: priceBeforeTax.value,
  });

  const newRowHTML = `
      <tr class="align-right">
          <td>${directGrnItems[directGrnItems.length - 1].itemCode}</td>
          <td>${directGrnItems[directGrnItems.length - 1].description}</td>
          <td>${directGrnItems[directGrnItems.length - 1].quantity}</td>
          <td>
            ${directGrnItems[directGrnItems.length - 1].unit}
          </td>
          <td>${
            directGrnItems[directGrnItems.length - 1].requiredDeliveryDate
          }</td>
          <td>${directGrnItems[directGrnItems.length - 1].priceBeforeTax}</td>
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

placeDirectGrnButton.addEventListener("click", () => {
  const groupedData = directGrnItems.reduce((acc, item) => {
    if (!acc[item.reference]) {
      acc[item.reference] = []; // Create a new array for this reference
    }
    acc[item.reference].push({
      supplier: item.supplier,
      orderDate: item.orderDate,
      currency: item.currency,
      exchangeRate: item.exchangeRate,
      supplierReference: item.supplierReference,
      dimensions: item.dimensions,
      receiveInto: item.receiveInto,
      deliverTo: item.deliverTo,
      itemCode: item.itemCode,
      description: item.description,
      quantity: item.quantity,
      unit: item.unit,
      requiredDeliveryDate: item.requiredDeliveryDate,
      priceBeforeTax: item.priceBeforeTax,
    });
    return acc;
  }, {});

  // Prepare the data to be sent to the PHP script
  const dataToSend = {
    reference: Object.keys(groupedData), // Get the references
    items: groupedData, // Grouped items
  };

  post("function/direct-grn.php", dataToSend).then((Data) => {
    console.log(Data);
  });
});


