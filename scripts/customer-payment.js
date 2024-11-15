const inputDiv = document.querySelector(".input-div");
const tableDiv = document.querySelector(".mid-third");

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
renderInputs();
renderTable();
customerSelectorOptions();
//INPUT DIV
const customerSelector = document.getElementById("customer-selector");
const branchSelector = document.getElementById("branch-selector");
const bankAccountSelector = document.getElementById("bank-account-selector");
const dateInput = document.getElementById("date-input");
const referanceInput = document.getElementById("referance-input");
const bankChargeInput = document.getElementById("bank-charge-input");
const dimensionsSelector = document.getElementById("dimensions-selector");
//TABLE DIV
const amountOfDiscount = document.getElementById("amount-of-discount");
const amount = document.getElementById("amount");
const memo = document.getElementById("memo");
const itemSelector = document.getElementById("item-selector");
const addPaymentButton = document.getElementById("add-payment-button");

let itemOptions = "";

async function itemSelectorOptions() {
  const response = await fetch("function/read-item.php");
  const items = await response.json();

  items.forEach((item) => {
    let options = `
        <option value="${item.name}" id="${item.itemCode}">${item.name}</option>
        `;
    itemOptions += options;
  });

  const itemSelector = document.getElementById("item-selector");
  itemSelector.innerHTML = itemOptions;
}

itemSelectorOptions();

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

addPaymentButton.addEventListener("click", () => {
  post("function/customer-payment.php", {
    customer: customerSelector.value,
    branch: branchSelector.value,
    bankAccount: bankAccountSelector.value,
    date: dateInput.value,
    referance: referanceInput.value,
    bankCharge: bankChargeInput.value,
    dimensions: dimensionsSelector.value,
    amountOfDiscount: amountOfDiscount.value,
    amount: amount.value,
    memo: memo.value,
  }).then((Data) => {
    console.log(Data);
  });
  localStorage.setItem("referanceNumber", referanceInput.value);
});
export const referanceNumber = localStorage.getItem("referanceNumber");

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
  const customerSelectorElement = document.getElementById("customer-selector");
  customerSelectorElement.innerHTML = innerOptions;
}

async function checkTables() {
  const response = await fetch("exec/create.php");
  const result = await response.json();
  console.log(result); // Log the result to see if tables were created successfully
  return result.success; // Assuming the PHP script returns a success property
}

function renderInputs() {
  let html = `
    <div class="customer-info">
            <label for="from-customer">From Customer:
                <select name="customer-selector" id="customer-selector">
                    
                </select>
            </label><br>
            <label for="branch">Branch:
                <select name="branch" id="branch-selector">
                    <option value="branch-1">Branch 1</option>
                    <option value="branch-2">Branch 2</option>
                </select>
            </label><br>
            <label for="into-bank-acount">Into Bank Account:
                <select name="bank-account" id="bank-account-selector">
                    <option value="current-account">Current Account</option>
                    <option value="petty-cash-account">Petty Cash Account</option>
                </select>
            </label><br>
            <label for="item-selector">Select Item form Inventory:
                <select name="item-selector" id="item-selector">
                    
                </select>
            </label>
        </div>
        <div class="credit-and-discount">
            <label for="date-of-deposit">Date of Deposit:
                <input type="date" id="date-input">
            </label><br>
            <label for="referance">Reference:
                <input type="text" id="referance-input">
            </label>
        </div>
        <div class="customer-info">
            <label for="bank-charge">Bank Charge:
                <input type="text" name="bank-charge" id="bank-charge-input">
            </label><br>
            <label for="dimensions">Dimensions:
                <select name="dimensions" id="dimensions-selector">
                    <option value="dim-1">Dim 1</option>
                    <option value="dim-2">Dim 2</option>
                    <option value="dim-3">Dim 3</option>
                </select>
            </label>
        </div>
    `;
  inputDiv.innerHTML = html;
}

function renderTable() {
  let html = `
    <table>
            <tr>
                <td>Customer prompt payment discount:</td>
                <td>0.0%</td>
            </tr>
            <tr>
                <td>Amount of Discount:</td>
                <td><input type="text" name="" id="amount-of-discount">RAND</td>
            </tr>
            <tr>
                <td>Amount:</td>
                <td><input type="text" name="" id="amount">RAND</td>
            </tr>
            <tr>
                <td>Memo:</td>
                <td><input type="text" name="" id="memo"></td>
            </tr>
        </table>
    `;
  tableDiv.innerHTML = html;
}
