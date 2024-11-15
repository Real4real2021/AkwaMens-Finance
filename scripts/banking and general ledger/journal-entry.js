const inputDiv = document.getElementById("input-div");
const tableDiv = document.getElementById("table-div");
const navigateTables = document.getElementById("navigate-tables");

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
renderNavigateTables();
renderGlPostingsTable();
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
            <label for="jounal-date">Journal Date:
                <input type="date" name="" id="journal-date-input">
            </label>
            <label for="currency">Currency:
                <select name="" id="currency-selector"></select>
            </label>
        </div>
        <div id="second-section">
            <label for="document-date">Document Date:
                <input type="date" name="" id="document-date-input">
            </label>
            <label for="event-date">Event Date;
                <input type="date" name="" id="event-date-input">
            </label>
            <label for="source-ref">Source Ref;
                <input type="text" name="" id="source-ref-input">
            </label>
        </div>
        <div id="third-section">
            <label for="reference">Reference:
                <input type="text" name="" id="reference-input">
            </label>
            <label for="include-in-tax-register">Include in tax register:
                <input type="checkbox" name="" id="include-in-tax-register-checkbox">
            </label>
        </div>
    `
    inputDiv.innerHTML = html;
}

function renderNavigateTables() {
    let html = `
    <input type="button" value="GL Postings" id="gl-postings">
    <input type="button" value="Tax Register" id="tax-register">
    `
    navigateTables.innerHTML = html;
}

function renderGlPostingsTable() {
    let html = `
    <table id="gl-postings-table" class="table">
            <th>Account Code</th>
            <th>Account Description</th>
            <th>Dimension</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Memo</th>
            <tbody>
                <tr>
                    <td><input type="text" name="" id="account-code-input"></td>
                    <td><select name="" id="account-description-selector"></select></td>
                    <td><select name="" id="dimension-selector"></select></td>
                    <td><input type="text" name="" id="debit-input"></td>
                    <td><input type="text" name="" id="credit-input"></td>
                    <td><input type="text" name="" id="memo-input"></td>
                    <td><input type="button" value="Add Item" id="add-item-button"></td>
                </tr>
            </tbody>
        </table>
    `
    tableDiv.innerHTML = html;
}

function renderTaxRegisterTable() {
    let html = `
    <table id="tax-register-table">
            <tr>
                <td>VAT date:</td>
                <td><input type="date" name="" id="vat-date-input"></td>
            </tr>
        </table>
        <table>
            <th>Name</th>
            <th>Input Tax</th>
            <th>Output Tax</th>
            <th>Net Amount</th>
            <tbody>
                <tr>
                    <td>Tax 5%</td>
                    <td>0.00</td>
                    <td><input type="text" name="" id="net-amount-input"></td>
                </tr>
            </tbody>
        </table>
    `
    tableDiv.innerHTML = html;
}

const glPostingsButton = document.getElementById("gl-postings");
const taxRegisterButton = document.getElementById("tax-register");

taxRegisterButton.addEventListener("click", () => {
    renderTaxRegisterTable();
});

const table = document.querySelector("table");
const journalDateInput = document.getElementById("journal-date-input");
const currencySelector = document.getElementById("currency-selector");
const documentDateInput = document.getElementById("document-date-input");
const eventDateInput = document.getElementById("event-date-input");
const sourceRefInput = document.getElementById("source-ref-input");
const referenceInput = document.getElementById("reference-input");
const includeInTaxRegisterCheckbox = document.getElementById("include-in-tax-register-checkbox");
const accountCodeInput = document.getElementById("account-code-input");
const accountDescriptionSelector = document.getElementById("account-description-selector");
const dimensionSelector = document.getElementById("dimension-selector");
const debitInput = document.getElementById("debit-input");
const creditInput = document.getElementById("credit-input");
const memoInput = document.getElementById("memo-input");
const addItemButton = document.getElementById("add-item-button");

const journalEntryItems = [];

addItemButton.addEventListener("click", () => {
    journalEntryItems.push({
        currency: currencySelector.value,
        documentDate: documentDateInput.value,
        eventDate: eventDateInput.value,
        sourceRef: sourceRefInput.value,
        reference: referenceInput.value,
        includeInTaxRegister: includeInTaxRegisterCheckbox.value,
        accountCode: accountCodeInput.value,
        accountDescription: accountDescriptionSelector.value,
        dimension: dimensionSelector.value,
        debit: debitInput.value,
        credit: creditInput.value,
        memo: memoInput.value,
    });

    const newRowHTML = `
            <tr class="align-right">
                <td>${accountCodeInput.value}</td>
                <td>${accountDescriptionSelector.value}</td>
                <td>${dimensionSelector.value}</td>
                <td>${debitInput.value}</td>
                <td>${creditInput.value}</td>
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
        debitInput.value = "";
        creditInput.value = "";
        memoInput.value = "";
});

const processJournalEntryButton = document.getElementById("process-journal-entries-button");

processJournalEntryButton.addEventListener("click", () => {
    const groupedData = journalEntryItems.reduce((acc, item) => {
        if (!acc[item.reference]) {
          acc[item.reference] = []; // Create a new array for this reference
        }
        acc[item.reference].push({
            currency: item.currency,
            documentDate: item.documentDate,
            eventDate: item.eventDate,
            sourceRef: item.sourceRef,
            includeInTaxRegister: item.includeInTaxRegister,
            accountCode: item.accountCode,
            accountDescription: item.accountDescription,
            dimension: item.dimension,
            debit: item.debit,
            credit: item.credit,
            memo: item.memo,
        });
        return acc;
      }, {});
    
      // Prepare the data to be sent to the PHP script
      const dataToSend = {
        reference: Object.keys(groupedData), // Get the references
        items: groupedData, // Grouped items
      };
    
      post("function/journal-entry.php", dataToSend).then((Data) => {
        console.log(Data);
      });
})