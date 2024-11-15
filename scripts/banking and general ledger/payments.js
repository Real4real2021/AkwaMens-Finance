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
    <div id="first-section">
            <label for="date">Date:
                <input type="date" name="" id="date-input">
            </label><br>
            <label for="reference">Reference:
                <input type="text" name="" id="reference-input">
            </label>
        </div>
        <div id="second-section">
            <label for="pay-to">Pay To:
                <select name="pay-to-selector" id="pay-to-selector"></select>
            </label><br>
            <label for="to-the-order-of">To The Order Of:
                <input type="text" name="" id="to-the-order-of-input">
            </label>
        </div>
        <div id="third-section">
            <label for="from">From:
                <select name="from-selector" id="from-selector"></select>
            </label><br>
            <label for="bank-balamce">Bank Balance:
                <input type="text" name="" id="bank-balance-input">
            </label>
        </div>
    `
    inputDiv.innerHTML = html;
}

function renderTable() {
    let html = `
     <div id="table-div">
        <table class="table">
            <th>Account Code</th>
            <th>Account Description</th>
            <th>Dimension</th>
            <th>Amount</th>
            <th>Memo</th>
            <tbody>
                <tr>
                    <td><input type="text" name="" id="account-code-input"></td>
                    <td><select name="" id="account-description-selector"></select></td>
                    <td><select name="" id="dimension-selector"></select></td>
                    <td><input type="text" name="" id="amount-input"></td>
                    <td><input type="text" name="" id="memo-input"></td>
                    <td><input type="button" value="Add Item" id="add-item-button"></td>
                </tr>
            </tbody>
        </table>
    </div>
    `
    tableDiv.innerHTML = html;
}

const table = document.querySelector("table");
const addItemButton = document.getElementById("add-item-button");
const accountCodeInput = document.getElementById("account-code-input");
const accountDescriptionSelector = document.getElementById("account-description-selector");
const dimensionSelector = document.getElementById("dimension-selector");
const amountInput = document.getElementById("amount-input");
const memoInput = document.getElementById("memo-input");
const dateInput = document.getElementById("date-input");
const referenceInput = document.getElementById("reference-input");
const toTheOrderOfInput = document.getElementById("to-the-order-of-input");
const payToSelector = document.getElementById("pay-to-selector");
const fromSelector = document.getElementById("from-selector");
const bankBalanceInput = document.getElementById("bank-balance-input");

const payments = [];

addItemButton.addEventListener("click", () => {
    payments.push({
        date: dateInput.value,
        reference: referenceInput.value,
        payTo: payToSelector.value,
        toTheOrderOf: toTheOrderOfInput.value,
        from: fromSelector.value,
        bankBalance: bankBalanceInput.value,
        accountCode: accountCodeInput.value,
        accountDescription: accountDescriptionSelector.value,
        dimension: dimensionSelector.value,
        amount: amountInput.value,
        memo: memoInput.value
    })
    const newRowHTML = `
            <tr class="align-right">
                <td>${accountCodeInput.value}</td>
                <td>${accountDescriptionSelector.value}</td>
                <td>${dimensionSelector.value}</td>
                <td>${amountInput.value}</td>
                <td>${memoInput.value}</td>
            </tr>
        `;

        // Create a new table row element
        const newTr = document.createElement("tr");
        newTr.innerHTML = newRowHTML;

        // Get the table body and insert the new row after the first row
        const tableBody = table.querySelector("tbody");
        const firstRow = tableBody.querySelector("tr"); // Get the first row
        tableBody.insertBefore(newTr, firstRow.nextSibling);

        accountCodeInput.value = "";
        accountDescriptionSelector.value = "";
        dimensionSelector.value = "";
        amountInput.value = "";
        memoInput.value = "";
});

const processPaymentButton = document.getElementById("process-payment-button");

processPaymentButton.addEventListener("click", () => {
    const groupedData = payments.reduce((acc, item) => {
        if (!acc[item.reference]) {
          acc[item.reference] = []; // Create a new array for this reference
        }
        acc[item.reference].push({
            date: item.date,
            payTo: item.payTo,
            toTheOrderOf: item.toTheOrderOf,
            from: item.from,
            bankBalance: item.bankBalance,
            accountCode: item.accountCode,
            accountDescription: item.accountDescription,
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
    
      post("function/payments.php", dataToSend).then((Data) => {
        console.log(Data);
      });
})