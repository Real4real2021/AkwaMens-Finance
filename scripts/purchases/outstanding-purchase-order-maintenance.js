const inputDiv = document.getElementById("top");
const tableDiv = document.getElementById("bottom");

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
const tableBody = document.getElementById("table-body");

function renderInputs () {
    let html = `
    <label for="#">#:
            <input type="text" name="" id="hash-text-input">
        </label>
        <label for="from">From:
            <input type="date" name="" id="from-date-input">
        </label>
        <label for="to">To:
            <input type="date" name="" id="to-date-input">
        </label>
        <label for="location">Location:
            <select name="" id="location-selector"></select>
        </label><br>
        <label for="item">Item:
            <input type="text" name="" id="item-text-input">
        </label>
        <select name="" id="inventory-item-selector"></select>
        <label for="select-a-supplier">Select a Supplier:
            <select name="" id="supplier-selector"></select>
        </label>
        <input type="button" value="Search" id="search-button">
    `
    inputDiv.innerHTML = html;
}

function renderTable () {
    let html = `
    <table>
        <th>#</th>
        <th>Reference</th>
        <th>Supplier</th>
        <th>Location</th>
        <th>Supplier's Reference</th>
        <th>Order Date</th>
        <th>Currency</th>
        <th>Order Total</th>
        <tbody id="table-body">
        </tbody>
    </table>
    `
    tableDiv.innerHTML = html;
}

async function searchOutstandingPurchaseOrders () {
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
        tableBody.innerHTML += html;
    })
}

searchOutstandingPurchaseOrders();