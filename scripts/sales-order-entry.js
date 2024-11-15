const salesOrderTableDiv =  document.querySelector('.sales-order-table');
const inputDiv =  document.querySelector('.customer-info-inputs');
const placeOrderButton = document.getElementById('place-order-button');
const cancelOrderButton = document.getElementById('cancel-order-button');

checkTables();

renderInputs();

async function checkTables() {
    const response = await fetch("exec/create.php");
    const result = await response.json();
    console.log(result); // Log the result to see if tables were created successfully
    return result.success; // Assuming the PHP script returns a success property
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
  const customerSelectorElement = document.getElementById("customer-selector");
  customerSelectorElement.innerHTML = innerOptions;
}
customerSelectorOptions();

renderSalesOrderTable();

const customerSelector = document.getElementById('customer-selector');
const branchSelector = document.getElementById('branch-selector');
const reference = document.getElementById('reference');
const currentCreditElement = document.getElementById('current-credit-element');
const customerDiscountElement = document.getElementById('customer-discount-element');
const paymentSelector = document.getElementById('payment');
const priceListSelector = document.getElementById('price-list');
const quotationDateInput = document.getElementById('quotation-date');

const itemCodeInput = document.getElementById('item-code');
const descriptionSelector = document.getElementById('description');
const quantityInput = document.getElementById('Quantity');
const unitCell = document.getElementById('unit-cell');
const priceAfterTax = document.getElementById('price-taxed');
const discountInput = document.getElementById('Discount');
const totalCell = document.getElementById('total-cell');
const addItemButton = document.querySelector('.add-item-button');
const ShippingChargeInput = document.getElementById('chargeAmount');

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
    updateThemeToggleText();
});

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

const salesOrder = [];

addItemButton.addEventListener('click', () => {
    salesOrder.push({
        reference: reference.value,
        itemCode: itemCodeInput.value,
        description: descriptionSelector.value,
        quantity: quantityInput.value,
        priceAfterTax: priceAfterTax.value,
        discount: discountInput.value
    });
    console.log(salesOrder);
});

placeOrderButton.addEventListener('click', () => {
    post('function/sales-order-entry.php', {
        referance: reference.value,
        itemCode: itemCodeInput.value,
        description: descriptionSelector.value,
        quantity: quantityInput.value,
        unit: "each",
        priceAfterTax: priceAfterTax.value,
        discount: discountInput.value
    }).then((Data)=> {
        console.log(Data);
    });
});

function renderInputs(){
    let html = `
    <h1>New Sales Order Entry</h1>
        <div class="customer-info">
            <label for="customer-selector">
                Customer:
                <select name="customer-selector" id="customer-selector">
                    
                </select> </label><br />
            <label for="branch-selector">Branch:
                <select name="branch-selector" id="branch-selector">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select> </label><br />
            <label for="reference">
                Reference:
                <input type="text" name="reference" id="reference" />
            </label>
        </div>
    
        <div class="credit-and-discount">
            <label for="current-credit" id="current-credit-element">Current Credit: 1000</label><br />
            <label for="customer-discount" id="customer-discount-element">Customer Discount: 0%</label>
        </div>
        <div class="payment-and-price-list">
            <label for="payment">Payment:
                <select name="payment" id="payment">
                    <option value="Cash Only">Cash Only</option>
                    <option value="Due by 15th of the following month">
                        Due by 15th of the following month
                    </option>
                    <option value="Due by 15th of the following month">
                        Due by 15th of the following month
                    </option>
                    <option value="Due By The End Of The Following Month">
                        Due By The End Of The Following Month
                    </option>
                    <option value="Payment Due Within 10 Days">
                        Payment Due Within 10 Days
                    </option>
                    <option value="Prepaid">Prepaid</option>
                </select> </label><br />
            <label for="price-list">Price List:
                <select name="price-list" id="price-list">
                    <option value="Retail">Retail</option>
                    <option value="Wholesale">Wholesale</option>
                </select>
            </label>
        </div>
        <div class="quotation-date">
            <label for="quotation-date">Quotation Date:
                <input type="date" name="quotation-date" id="quotation-date" />
            </label>
        </div>
    `
    inputDiv.innerHTML = html
}

function renderSalesOrderTable(){
    let html = `
    <h2>Sales Order Items</h2>
        <table class="table">
            <th>Item Code</th>
            <th>Item Description</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price after Tax</th>
            <th>Discount %</th>
            <th>Total</th>
            <tbody>
                <tr class="input-row">
                    <td>
                        <input type="text" name="" id="item-code">
                    </td>
                    <td>
                            <select name="Description" id="description">
                            <option value="Products in Inventory">Products in Inventory</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" name="Quantity" id="Quantity">
                    </td>
                    <td id="unit-cell">
                        each
                    </td>
                    <td>
                        <input type="text" name="price-taxed" id="price-taxed">
                    </td>
                    <td>
                        <input type="text" name="Discount" id="Discount">
                    </td>
                    <td id="total-cell">
                        0.00
                    </td>
                    <td>
                        <input type="button" class="add-item-button" value="Add Item">
                    </td>
                </tr>
                <tr>
                    <td class="align-right" colspan="6">
                        Shipping Charge
                    </td>
                    <td>
                        <input type="text" name="charge-amount" id="charge-amount">
                    </td>
                </tr>
                <tr>
                    <td class="align-right" colspan="6">
                        Sub-total
                    </td>
                    <td class="align-right">
                        0.00
                    </td>
                </tr>
                <tr>
                    <td class="align-right" colspan="6">
                        Amount Total
                    </td>
                    <td class="align-right">
                        0.00
                    </td>
                    <td>
                        <input type="button" value="Update">
                    </td>
                </tr>
            </tbody>
        </table>
    `
    salesOrderTableDiv.innerHTML = html
}