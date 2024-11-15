const inputDiv = document.getElementById("input-div");
const tableDiv = document.getElementById("table-div");

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

// Tab functionality
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Search functionality
const searchInput = document.getElementById('search');
const sidebarItems = document.querySelectorAll('.sidebar a');
const gridItems = document.querySelectorAll('.grid-item');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    sidebarItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });

    gridItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
    updateThemeToggleText();
});

// Function to update theme toggle button text
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

renderInputs();
renderTable();
checkTables();

async function checkTables() {
  const response = await fetch("exec/create.php");
  const result = await response.json();
  console.log(result); // Log the result to see if tables were created successfully
  return result.success; // Assuming the PHP script returns a success property
}

function renderInputs() {
    let html = `
    <div id="locaton">
            <label for="locaton">Location:
                <select name="" id="location-selector"></select>
            </label><br>
            <label for="date">Date:
                <input type="date" name="" id="date-input">
            </label>
        </div>
        <div id="reference">
            <label for="reference">Reference:
                <input type="text" name="" id="referene-input">
            </label>
        </div>
    `
    inputDiv.innerHTML = html;
}

function renderTable() {
    let html = `
    <table id="table">
            <th>Item Code</th>
            <th>Item Description</th>
            <th>QOH</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Unit Cost</th>
            <th>Total</th>
            <tbody>
                <tr>
                    <td><input type="text" name="" id="item-code-input"></td>
                    <td><select name="" id="inventory-item-selector"></select></td>
                    <td><input type="text" name="" id="qoh-input"></td>
                    <td><input type="text" name="" id="quantity-input"></td>
                    <td>each</td>
                    <td><input type="text" name="" id="unit-cost-input"></td>
                    <td></td>
                    <td><input type="button" value="Add Item" id="add-item-button"></td>
                </tr>
                <tr>
                    <td colspan="6">Total</td>
                    <td>0/00</td>
                </tr>
            </tbody>
        </table>
    `
    tableDiv.innerHTML = html;
}

const table = document.querySelector("table");
const addItemButton = document.getElementById("add-item-button");
const locationSelector = document.getElementById("location-selector");
const dateInput = document.getElementById("date-input");
const referenceInput = document.getElementById("referene-input");
const itemCodeInput = document.getElementById("item-code-input");
const inventoryItemSelector = document.getElementById("inventory-item-selector");
const qohInput = document.getElementById("qoh-input");
const quantityInput = document.getElementById("quantity-input");
const unitCostInput = document.getElementById("unit-cost-input");
const memoInput = document.getElementById("memo-input");
const placeAdjustmentButton = document.getElementById("place-adjustment");

const adjustmentItems = [];

addItemButton.addEventListener("click", () => {
    adjustmentItems.push({
        location: locationSelector.value,
        date: dateInput.value,
        reference: referenceInput.value,
        itemCode: itemCodeInput.value,
        inventoryItem: inventoryItemSelector.value,
        QOH: qohInput.value,
        quantity: quantityInput.value,
        unit: "each",
        unitCost: unitCostInput.value,
    })

    const newRowHTML = `
            <tr class="align-right">
                <td>${adjustmentItems[adjustmentItems.length - 1].itemCode}</td>
                <td>${adjustmentItems[adjustmentItems.length - 1].inventoryItem}</td>
                <td>${adjustmentItems[adjustmentItems.length - 1].QOH}</td>
                <td>${adjustmentItems[adjustmentItems.length - 1].quantity}</td>
                <td>
                    ${adjustmentItems[adjustmentItems.length - 1].unit}
                </td>
                <td>${adjustmentItems[adjustmentItems.length - 1].unitCost}</td>
                <td></td>
            </tr>
        `;

        // Create a new table row element
        const newTr = document.createElement("tr");
        newTr.innerHTML = newRowHTML;

        // Get the table body and insert the new row after the first row
        const tableBody = table.querySelector("tbody");
        const firstRow = tableBody.querySelector("tr"); // Get the first row
        tableBody.insertBefore(newTr, firstRow.nextSibling);

        itemCodeInput.value = "";
        inventoryItemSelector.value = "";
        qohInput.value = "";
        quantityInput.value = "";
        unitCostInput.value = "";
        locationSelector.value = "";
        dateInput.value = "";
        referenceInput.value = "";
});

placeAdjustmentButton.addEventListener("click", () => {
    const groupedData = adjustmentItems.reduce((acc, item) => {
        if (!acc[item.reference]) {
          acc[item.reference] = []; // Create a new array for this reference
        }
        acc[item.reference].push({
            location: item.location,
            date: item.date,
            itemCode: item.itemCode,
            inventoryItem: item.inventoryItem,
            QOH: item.QOH,
            quantity: item.quantity,
            unit: item.unit,
            unitCost: item.unitCost,
        });
        return acc;
      }, {});
    
      // Prepare the data to be sent to the PHP script
      const dataToSend = {
        reference: Object.keys(groupedData), // Get the references
        items: groupedData, // Grouped items
      };
    
      post("function/inventory-adjustment.php", dataToSend).then((Data) => {
        console.log(Data);
      });
})



