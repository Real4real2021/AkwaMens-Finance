const inventorySelector = document.getElementById("inventory");

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

checkTables();

const buttonGeneralSettings = document.querySelector(".general-settings");
const buttonSalesPricing = document.querySelector(".sales-pricing");
const buttonPurchasingPricing = document.querySelector(".purchasing-pricing");
const buttonStandardCosts = document.querySelector(".standard-costs");
const buttonReorderLevels = document.querySelector(".reorder-levels");
const buttonTransactions = document.querySelector(".transactions");
const buttonStatus = document.querySelector(".status");
const buttonAttachments = document.querySelector(".attachments");

const tableDiv = document.querySelector(".rendered-table");

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

function renderTableGeneralSettings() {
  let HTML = `
   <table class="general-settings customer-info">
        <th>General Settings</th>
        <tbody>
            <tr>
                <td>Item Code: <input type="text" class="item-code"></td>
            </tr>
            <tr>
                <td>Name: <input type="text" class="general-settings-name"> </td>
            </tr>
            <tr>
                <td>Description: <input type="text" class="description-input"> </td>
            </tr>
            <tr>
                <td> Category: <select name="" id="category-selector">
                    <option selected value="components">Components</option>
                    <option value="charges">Charges</option>
                    <option value="systems">Systems</option>
                    <option value="services">services</option>
                </select> </td>
            </tr>
            <tr>
                <td>Item Tax Type: <select id="tax-type-selector">
                    <option value="regular">Regular</option>
                </select> </td>
            </tr>
            <tr>
                <td>Item Type: <select id="item-type-selector">
                    <option value="manufactured">Manufactured</option>
                    <option selected value="purchased">Purchased</option>
                    <option value="service">Service</option>
                </select></td>
            </tr>
            <tr>
                <td>Units of Measure: <select id="unit-of-measure-selector">
                    <option value="each">Each</option>
                    <option value="hour">Hour</option>
                </select></td>
            </tr>
            <tr>
                <td>Editable Description: <input type="text" selected class="editable-description-input"></td>
            </tr>
            <tr>
                <td>Exclude from Sales: <input type="text" class="exclude-from-sales-input"></td>
            </tr>
            <tr>
                <td>Exclude from Purchases: <input type="text" class="exclude-from-purchases-input"></td>
            </tr>
        </tbody>
    </table>

    <div class="customer-info">
        <table class="dimensions customer-info">
            <th>Dimensions</th>
              <tbody>
                <tr>
                    <td>Dimension 1: <select name="dimensions" id="dimensions">
                        <option value="cost-centre">08/2024Cost Centre</option>
                        <option value="cost">08/2024Cost Centre</option>
                    </select></td>
                </tr>
              </tbody>
        </table><br><br>
    </div>

    <div class="customer-info">
        <table class="gl-accounts customer-info">
            <th>GL Accounts</th>
            <tbody>
              <tr>
                  <td>Sales Account: <select name="sales-accounts" id="sales-accounts-selector">
                      <option value="checking-account">1060 Checking Account</option>
                      <option value="petty-cash">1065 Petty Cash</option>
                      <option value="allowance-for-doubtful-accounts">1205 Allowance for Doubtful Accounts</option>
                      <option value="inventory">Inventory</option>
                      <option value="stocks-of-raw-materials">Stocks of Raw Materials</option>
                      <option value="stocks-of-work-in-progress">Stocks of Work in Progress</option>
                      <option value="stocks-of-finished-goods">Stocks of Finished Goods</option>
                      <option value="goods-received-clearing-account">Goods Received Clearing Account</option>
                      <option value="office-furniture-equipment">Office Furniture and Equipment</option>
                      <option value="accum-amort-furn-equip">Accum. Amort, -Furn, & Equip</option>
                      <option value="vehicle">Vehicle</option>
                      <option value="accum-amort-vehicle">Accum. Amort. -Vehicle</option>
                      <option value="accounts-payable">Accounts-Payable</option>
                      <option value="deferred-income">Deferred Income</option>
                      <option value="accrued-tax-federal">Accrued Tax - Federal</option>
                  </select></td>
              </tr>
              <tr>
                  <td>Inventory Account: <select name="inventory-accounts" id="inventory-accounts-selector">
                      <option value="checking-account">1060 Checking Account</option>
                      <option value="petty-cash">1065 Petty Cash</option>
                      <option value="allowance-for-doubtful-accounts">1205 Allowance for Doubtful Accounts</option>
                      <option value="inventory">Inventory</option>
                      <option value="stocks-of-raw-materials">Stocks of Raw Materials</option>
                      <option value="stocks-of-work-in-progress">Stocks of Work in Progress</option>
                      <option value="stocks-of-finished-goods">Stocks of Finished Goods</option>
                      <option value="goods-received-clearing-account">Goods Received Clearing Account</option>
                      <option value="office-furniture-equipment">Office Furniture and Equipment</option>
                      <option value="accum-amort-furn-equip">Accum. Amort, -Furn, & Equip</option>
                      <option value="vehicle">Vehicle</option>
                      <option value="accum-amort-vehicle">Accum. Amort. -Vehicle</option>
                      <option value="accounts-payable">Accounts-Payable</option>
                      <option value="deferred-income">Deferred Income</option>
                      <option value="accrued-tax-federal">Accrued Tax - Federal</option>
                  </select></td>
              </tr>
              <tr>
                  <td>C.O.G.S. Accounts: <select name="cogs-accounts" id="cogs-accounts-selector">
                      <option value="checking-account">1060 Checking Account</option>
                      <option value="petty-cash">1065 Petty Cash</option>
                      <option value="allowance-for-doubtful-accounts">1205 Allowance for Doubtful Accounts</option>
                      <option value="inventory">Inventory</option>
                      <option value="stocks-of-raw-materials">Stocks of Raw Materials</option>
                      <option value="stocks-of-work-in-progress">Stocks of Work in Progress</option>
                      <option value="stocks-of-finished-goods">Stocks of Finished Goods</option>
                      <option value="goods-received-clearing-account">Goods Received Clearing Account</option>
                      <option value="office-furniture-equipment">Office Furniture and Equipment</option>
                      <option value="accum-amort-furn-equip">Accum. Amort, -Furn, & Equip</option>
                      <option value="vehicle">Vehicle</option>
                      <option value="accum-amort-vehicle">Accum. Amort. -Vehicle</option>
                      <option value="accounts-payable">Accounts-Payable</option>
                      <option value="deferred-income">Deferred Income</option>
                      <option value="accrued-tax-federal">Accrued Tax - Federal</option>
                  </select></td>
              </tr>
              <tr>
                  <td>Inventory Adjustments Accounts: <select name="inventory-adjustment-accounts" id="inventory-adjustments-accounts">
                      <option value="checking-account">1060 Checking Account</option>
                      <option value="petty-cash">1065 Petty Cash</option>
                      <option value="allowance-for-doubtful-accounts">1205 Allowance for Doubtful Accounts</option>
                      <option value="inventory">Inventory</option>
                      <option value="stocks-of-raw-materials">Stocks of Raw Materials</option>
                      <option value="stocks-of-work-in-progress">Stocks of Work in Progress</option>
                      <option value="stocks-of-finished-goods">Stocks of Finished Goods</option>
                      <option value="goods-received-clearing-account">Goods Received Clearing Account</option>
                      <option value="office-furniture-equipment">Office Furniture and Equipment</option>
                      <option value="accum-amort-furn-equip">Accum. Amort, -Furn, & Equip</option>
                      <option value="vehicle">Vehicle</option>
                      <option value="accum-amort-vehicle">Accum. Amort. -Vehicle</option>
                      <option value="accounts-payable">Accounts-Payable</option>
                      <option value="deferred-income">Deferred Income</option>
                      <option value="accrued-tax-federal">Accrued Tax - Federal</option>
                  </select></td>
              </tr>
            </tbody>
        </table><br><br>
    </div>

    <div class="customer-info">    
        <table class="other customer-info">
            <th>Other</th>
            <tr>
                <td>Image File (.jpg): <input type="image" value="Choose Image"></td>
            </tr>
            <tr>
                <td>Delete Image: <input type="radio"></td>
            </tr>
            <tr>
                <td>Item Status: <select name="" id="">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select></td>
            </tr>
        </table>
    </div>
    <div>
        <input type="button" class="submit-button" value="Submit">
    </div>
   
   `;
  tableDiv.innerHTML = HTML;
}

buttonGeneralSettings.addEventListener("click", () => {
  renderTableGeneralSettings();
  const submitButton = document.querySelector(".submit-button");
  const itemCodeInput = document.querySelector(".item-code");
  const nameInput = document.querySelector(".general-settings-name");
  const descriptionInput = document.querySelector(".description-input");
  const categorySelector = document.getElementById("category-selector");
  const taxTypeSelector = document.getElementById("tax-type-selector");
  const itemTypeSelector = document.getElementById("item-type-selector");
  const unitOfMeasureSelector = document.getElementById(
    "unit-of-measure-selector"
  );
  const editableDescriptionInput = document.querySelector('.editable-description-input');
  const excludeFromSalesInput = document.querySelector('.exclude-from-sales-input');
  const excludeFromPurchasesInput = document.querySelector('.exclude-from-purchases-input');
  const dimensionsSelector = document.getElementById('dimensions');
  const salesAccountsSelector = document.getElementById(
    "sales-accounts-selector"
  );
  const inventoryAccountsSelector = document.getElementById(
    "inventory-accounts-selector"
  );
  const cogsAccountsSelector = document.getElementById("cogs-accounts-selector");
  const inventoryAdjustmentAccountSelector = document.getElementById("inventory-adjustments-accounts");

  submitButton.addEventListener('click', () => {
    post("function/add-new-item.php", {
      itemName: nameInput.value,
      itemDescription: descriptionInput.value,
      itemCategory: categorySelector.value,
      itemTaxType: taxTypeSelector.value,
      itemType: itemTypeSelector.value,
      unitOfMeasure: unitOfMeasureSelector.value,
      editableDescription:editableDescriptionInput.value, 
        excludeFromSales: excludeFromSalesInput.value,
        excludeFromPurchases: excludeFromPurchasesInput.value,
      dimensions: dimensionsSelector.value,
      salesAccounts: salesAccountsSelector.value,
      inventoryAccounts: inventoryAccountsSelector.value,
      cogsAccounts: cogsAccountsSelector.value,
      inventoryAdjustmentAccount: inventoryAdjustmentAccountSelector.value,
      itemCode: itemCodeInput.value,
    }).then((Data) => {
      console.log(Data);
    });
  });
});

function renderTableSalesPricing() {
  let HTML = `
    <table>
            <th>Curreny</th>
            <th>Sales Type</th>
            <th>Price</th>
            <tbody>
                <tr>
                    <td>RAND</td>
                    <td>Retail</td>
                    <td>50.00</td>
                    <td><input type="button" value="edit"></td>
                    <td><input type="button" value="delete"></td>
                </tr>
                <tr>
                    <td>Sales Type:</td>
                    <td colspan="2"><select name="sales-type" id="sales-type">
                        <option value="retail">Retail</option>
                        <option value="wholesale">Wholesale</option>
                    </select></td>
                </tr>
                <tr>
                    <td>Price:</td>
                    <td colspan="2"><input type="text" placeholder="50.00"> per each</td>
                </tr>
            </tbody>
        </table><br><br>
        <table>
            <tr>
                <td>Currency:</td>
                <td><select name="currency-selector" id="currency-selector">
                    <option value="RAND">RAND</option>
                    <option value="MALUTI">MALUTI</option>
                </select></td>
            </tr>
        </table>
    `;
  tableDiv.innerHTML = HTML;
}

buttonSalesPricing.addEventListener("click", () => {
  renderTableSalesPricing();
});

function renderPurchasingPricing() {
  HTML = `
    <table>
            <th>Suppier</th>
            <th>Price</th>
            <th>Currency</th>
            <th>Supplier's Unit</th>
            <th>Conversion Factor</th>
            <th>Supplier's Description</th>
            <tbody>
                <tr>
                    <td>AkwaMens SA</td>
                    <td>10</td>
                    <td>Rand</td>
                    <td></td>
                    <td>1</td>
                    <td>Item Description</td>
                    <td><input type="button" value="Edit"></td>
                    <td><input type="button" value="Delete"></td>
                </tr>
            </tbody>
        </table><br><br>
        <table>
            <tr>
                <td>Supplier:</td>
                <td><select name="supplier-selector" id="supplier-selector">
                    <option value="supplier-1">Supplier 1</option>
                    <option value="supplier-2">Supplier 2</option>
                    <option value="supplier-3">Supplier 3</option>
                </select></td>
            </tr>
            <tr>
                <td>Price:</td>
                <td><input type="text">Rand</td>
            </tr>
            <tr>
                <td>Supplier Unit of Measure:</td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td>Conversion Factor(to our UOM):</td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td>Supplier's Code or Description:</td>
                <td><input type="text"></td>
            </tr>
        </table>
    `;
  tableDiv.innerHTML = HTML;
}

buttonPurchasingPricing.addEventListener("click", () => {
  renderPurchasingPricing();
});

function renderStandardCosts() {
  HTML = `
    <table>
        <tbody>
            <tr>
                <td>Unit Cost:</td>
                <td><input type="text" placeholder="10.00"></td>
            </tr>
            <tr>
                <td>Reference Line:</td>
                <td><select name="reference-line-selector" id="reference-line-selector"></select></td>
            </tr>
            <tr>
                <td>Memo:</td>
                <td><input type="text"></td>
            </tr>
        </tbody>
    </table>
    `;
  tableDiv.innerHTML = HTML;
}

buttonStandardCosts.addEventListener("click", () => {
  renderStandardCosts();
});

function renderReorderLevels() {
  HTML = `
    <h3>Item Code - Item Name</h3>
        <h4>in units of : each</h4>
        <table>
            <th>Location</th>
            <th>Qunatity on Hand</th>
            <th>Re-Order Level</th>
            <tbody>
                <tr>
                    <td>Default</td>
                    <td>97</td>
                    <td><input type="text" placeholder="0"></td>
                </tr>
            </tbody>
        </table>
    `;
  tableDiv.innerHTML = HTML;
}

buttonReorderLevels.addEventListener("click", () => {
  renderReorderLevels();
});

function renderStatus() {
  HTML = `
    <table>
            <th>Location</th>
            <th>Quantity On Hand</th>
            <th>Re-Order Levels</th>
            <th>Demand</th>
            <th>Available</th>
            <th>On Order</th>
            <tbody>
                <tr>
                    <td>Default</td>
                    <td>98</td>
                    <td>0</td>
                    <td>1</td>
                    <td>97</td>
                    <td>0</td>
                </tr>
            </tbody>
        </table>
    `;
  tableDiv.innerHTML = HTML;
}

buttonStatus.addEventListener("click", () => {
  renderStatus();
});

function renderAttachments() {
  HTML = `
    <table>
            <th>ID</th>
            <th>Doc Title</th>
            <th>Filename</th>
            <th>Size</th>
            <th>FileType</th>
            <th>Doc Date</th>
        </table>
    `;
  tableDiv.innerHTML = HTML;
}

buttonAttachments.addEventListener("click", () => {
  renderAttachments();
});

async function checkTables() {
  const response = await fetch("exec/create.php");
  const result = await response.json();
  console.log(result); // Log the result to see if tables were created successfully
  return result.success; // Assuming the PHP script returns a success property
}