const customerNameInput = document.querySelector(".customer-name");
const customerShortNameInput = document.querySelector(".customer-short-name");
const customerAddress = document.querySelector(".customer-address");
const gstNoInput = document.querySelector(".gstNo");
const customerCurrencyInput = document.getElementById("currency-selector");
const salesTypeSelector = document.getElementById("sales-type-price-list");
const phoneNumberInput = document.querySelector(".phoneNumber");
const secondaryPhoneNumberInput = document.querySelector(
  ".secondary-phone-number"
);
const emailInput = document.querySelector(".email");
const bankAccountNumberInput = document.querySelector(".bank-account-number");
const salesPersonSelector = document.getElementById("sales-person");

const discountPercentInput = document.querySelector(".discount-percent");
const paymentDiscountPercentInput = document.querySelector(
  ".payment-discount-percent"
);
const creditLimitInput = document.querySelector(".credit-limit");
const paymentTermsSelector = document.getElementById("payment-terms");
const generalNotesInput = document.querySelector(".general-notes");
const defaultInventoryLocationSelector = document.getElementById(
  "default-inventory-location"
);
const defaultShippingCompanySelector = document.getElementById(
  "default-shipping-company"
);
const salesAreaSelector = document.getElementById("sales-area");
const taxGroupSelector = document.getElementById("tax-group");
const addNewCustomerButton = document.querySelector(".add-new-customer-button");

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

const customerDetails = [];

checkTables();

async function checkTables() {
  const response = await fetch("exec/create.php");
  const result = await response.json();
  console.log(result); 
  // Log the result to see if tables were created successfully
  return result.success; 
  // Assuming the PHP script returns a success property
}

addNewCustomerButton.addEventListener("click", () => {
  customerDetails.push(
    (NameAndAddress = {
      customerName: customerNameInput.value,
      customerShortName: customerShortNameInput.value,
      address: customerAddress.value,
      GSTNo: gstNoInput.value,
      customerCurrency: customerCurrencyInput.value,
      salesType: salesTypeSelector.value,
    }),
    (branch = {
      phoneNumber: phoneNumberInput.value,
      secondaryPhoneNumber: secondaryPhoneNumberInput.value,
      email: emailInput.value,
      bankAccountNumber: bankAccountNumberInput.value,
      salesPerson: salesPersonSelector.value,
    }),
    (sales = {
      discountPercent: discountPercentInput.value,
      paymentDiscountPercent: paymentDiscountPercentInput.value,
      creditLimit: creditLimitInput.value,
      paymentTerms: paymentTermsSelector.value,
      creditLimit: creditLimitInput.value,
      paymentTerms: paymentTermsSelector.value,
      generalNotes: generalNotesInput.value,
    }),
    (branch = {
      defaultInventoryLocation: defaultInventoryLocationSelector.value,
      defaultShippingCompany: defaultShippingCompanySelector.value,
      salesArea: salesAreaSelector.value,
      taxGroup: taxGroupSelector.value,
    })
  );
  console.log(customerDetails);
  
  post("function/add-and-manage-customers.php", {
    customerName: customerNameInput.value,
    customerShortName: customerShortNameInput.value,
    customerAddress: customerAddress.value,
    GSTNo: gstNoInput.value,
    customerCurrency: customerCurrencyInput.value,
    phoneNumber: phoneNumberInput.value,
    secondaryPhoneNumber: secondaryPhoneNumberInput.value,
    email: emailInput.value,
    bankAccountNumber: bankAccountNumberInput.value,
    discountPercent: discountPercentInput.value,
    paymentDiscountPercent: paymentDiscountPercentInput.value,
    creditLimit: creditLimitInput.value,
    generalNotes: generalNotesInput.value,
    salesType: salesTypeSelector.value,
    salesPerson: salesPersonSelector.value,
    paymentTerms: paymentTermsSelector.value,
    defaultInventory: defaultInventoryLocationSelector.value,
    defaultShippingCompany: defaultShippingCompanySelector.value,
    salesArea: salesAreaSelector.value,
    taxGroup: taxGroupSelector.value,
  }).then((Data) => {
    console.log(Data);
  });
});