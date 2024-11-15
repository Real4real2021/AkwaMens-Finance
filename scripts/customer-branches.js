const customerTable = document.getElementById("customer-table");

checkTables();

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
customerSelectorOptions();

let tabelBodyHTML = "";
async function renderCustomerTable() {
  const response = await fetch("function/read-and-manage-branches.php");
  const branches = await response.json();
  console.log(branches)

  branches.forEach((branch) => {
    let html = `
        <tr>
            <td>${branch.shortName}</td>
            <td>${branch.branchName}</td>
            <td>${branch.branchName}</td>
            <td>${branch.salesPerson}</td>
            <td>${branch.area}</td>
            <td>${branch.phoneNo}</td>
            <td>${branch.email}</td>
            <td>${branch.taxGroup}</td>
            <td><input type="button" value="edit"></td>
            <td><input type="button" value="delete"></td>
        </tr>
        `;
    tabelBodyHTML += html;
  });
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = tabelBodyHTML;
}

renderCustomerTable();

const branchNameInput = document.getElementById('branch-name-input');
const branchNameShortNameInput = document.getElementById('branch-short-name-input');
const salesPersonSelector = document.getElementById('sales-person-selector');
const salesAreaSelector = document.getElementById('sales-area-selector');
const salesGroupSelector = document.getElementById('sales-group-selector');
const defaultInventoryLocationSelector = document.getElementById('default-inventory-location');
const defaultShippingCompanySelector = document.getElementById('default-shipping-company-selector');
const taxGroupSelector = document.getElementById('tax-group-selector');
const salesAccountSelector = document.getElementById('sales-account-selector');
const salesDiscountAccountSelector = document.getElementById('sales-discount-account-selector');
const accountsReceivableAccountSelector = document.getElementById('accounts-receivable-account-selector');
const promptPaymentDiscountAccountSelector = document.getElementById('prompt-payment-discount-account-selector');
const bankAccountInput = document.getElementById('bank-account-input');
const contactPersonInput = document.getElementById('contact-person-input');
const phoneNumberInput = document.getElementById('phone-number-input');
const secondaryPhoneNumberInpt = document.getElementById('secondary-phone-number-input');
const emailInput = document.getElementById('email-input');
const documentLanguageSelecor = document.getElementById('document-language-selector');
const mailingAddressInput = document.getElementById('mailing-address-input');
const billingAddressInput = document.getElementById('billing-address-input');
const generalNotesInput = document.getElementById('general-notes-input');
const addNewBranchButton = document.getElementById('add-new-branch-button');


addNewBranchButton.addEventListener('click', () => {
  const branchInfo = [];
    branchInfo.push({
        branchName: branchNameInput.value,
        branchShortName: branchNameShortNameInput.value,
        salesPerson: salesPersonSelector.value,
        salesDiscountAccount: salesDiscountAccountSelector.value,
        promptPaymentDiscountAccount: promptPaymentDiscountAccountSelector.value,
        bankAccount: bankAccountInput.value,
        contactPerson: contactPersonInput.value,
        phoneNumber: phoneNumberInput.value,
        secondaryPhoneNumber: secondaryPhoneNumberInpt.value,
        email: emailInput.value,
        documentLanguage: documentLanguageSelecor.value,
        mailingAddress: mailingAddressInput.value,
        billingAddress: billingAddressInput.value,
        generalNotes: generalNotesInput.value,
    });
    console.log(branchInfo);

    post('function/add-and-manage-branches.php', {
        branchName: branchNameInput.value,
        branchShortName: branchNameShortNameInput.value,
        salesPerson: salesPersonSelector.value,
        salesArea: salesAreaSelector.value,
        taxGroup: taxGroupSelector.value,
        salesDiscountAccount: salesDiscountAccountSelector.value,
        promptPaymentDiscountAccount: promptPaymentDiscountAccountSelector.value,
        bankAccount: bankAccountInput.value,
        contactPerson: contactPersonInput.value,
        phoneNumber: phoneNumberInput.value,
        secondaryPhoneNumber: secondaryPhoneNumberInpt.value,
        email: emailInput.value,
        documentLanguage: documentLanguageSelecor.value,
        mailingAddress: mailingAddressInput.value,
        billingAddress: billingAddressInput.value,
        generalNotes: generalNotesInput.value
    }).then((Data)=> {
        console.log(Data)
    });
});

async function checkTables() {
  const response = await fetch("exec/create.php");
  const result = await response.json();
  console.log(result); // Log the result to see if tables were created successfully
  return result.success; // Assuming the PHP script returns a success property
}