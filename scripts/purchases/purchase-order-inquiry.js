const inputDiv = document.getElementById("input-div");
const tableDiv = document.getElementById("table");

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
    <label for="#">#:
            <input type="text" name="" id="hash-input">
        </label>
        <label for="from">From:
            <input type="date" name="" id="from-date-input">
        </label>
        <label for="to">To:
            <input type="date" name="" id="to-date-input">
        </label>
        <label for="into-location">Into Location:
            <select name="" id="location-selector"></select>
        </label><br>
        <label for="for-items">For Items:
            <input type="text" name="" id="for-items-input">
        </label>
        <select name="" id="inventory-items-selector"></select>
        <label for="select-supplier">Select a Supplier:
            <select name="" id="supplier-selector"></select>
        </label>
        <label for="also-closed">Also closed:
            <input type="radio" name="" id="radio-also-closed">
        </label>
        <input type="button" value="Search" id="search-button">
    `
    inputDiv.innerHTML = html;
}

function renderTable() {
    let html = `
    <table id="purchase-order-table">
            <th>#</th>
            <th>Reference</th>
            <th>Supplier</th>
            <th>Location</th>
            <th>Supplier's Reference</th>
            <th>Order Date</th>
            <th>Currency</th>
            <th>Order Total</th>
            <tbody>
                
            </tbody>
        </table>
    `
    tableDiv.innerHTML = html;
}

async function searchPurchaseOrders() {
  const purchaseOrderTable = document.getElementById("purchase-order-table");
  const reponse = await fetch("function/read-purchase-order-entries.php");
  const data = await reponse.json();

  data.forEach((order)=> {
    let html = `
    <tr>
        <td>${order.id}</td>
        <td>${order.reference}</td>
        <td>${order.supplier}</td>
        <td>${order.deliverTo}</td>
        <td>${order.supplierReference}</td>
        <td>${order.date}</td>
        <td>${order.currency}</td>
        <td>${order.priceBeforeTax}</td> 
    </tr>
    `
    purchaseOrderTable.innerHTML += html;
})
}

searchPurchaseOrders();