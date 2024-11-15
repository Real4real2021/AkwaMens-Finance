const inputDiv = document.getElementById("top");
const tableDiv = document.getElementById("bottom");
const placePaymentButton = document.getElementById("place-payment-button"); 

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

checkTables();
renderInputs();
renderTable();

async function checkTables() {
    const response = await fetch("exec/create.php");
    const result = await response.json();
    console.log(result); // Log the result to see if tables were created successfully
    return result.success; // Assuming the PHP script returns a success property
}

function renderInputs() {
    let html = `
    <div id="payment-to">
            <label for="payment-to">Payment To:
                <select name="" id="supplier-selector"></select>
            </label><br>
            <label for="from-bank-account">From Bank Account:
                <select name="" id="bank-account-selector"></select>
            </label><br>
            <label for="bank-balance">Bank Balance:
                <input type="text" name="" id="bank-balance-input">
            </label>
        </div>
        <div id="date-paid">
            <label for="date-paid">Date Paid:
                <input type="date" name="" id="date-paid-input">
            </label><br>
            <label for="reference">Reference:
                <input type="text" name="" id="reference-input">
            </label>
        </div>
        <div id="bank-amount">
            <label for="bank-amount">Bank Amount:
                <input type="text" name="" id="bank-amount-input">
            </label><br>
            <label for="bank-charge">Bank Charge:
                <input type="text" name="" id="bank-charge-input">
            </label><br>
            <label for="dimension">Dimension:
                <select name="" id="dimension-selector"></select>
            </label>
        </div>
    `
    inputDiv.innerHTML = html;
}

function renderTable() {
    let html = `
    <table>
            <tr>
                <td>Amount of Discount</td>
                <td><input type="text" name="" id="discount-amount-input"></td>
            </tr>
            <tr>
                <td>Amount of Payment</td>
                <td><input type="text" name="" id="payment-amount-input"></td>
            </tr>
            <tr>
                <td>Memo:</td>
                <td><input type="text" name="" id="memo-input"></td>
            </tr>
        </table>
    `
    tableDiv.innerHTML = html;
}

const paymentTo = document.getElementById("supplier-selector");
const fromBankAccount = document.getElementById("bank-account-selector");
const bankBalance = document.getElementById("bank-balance-input");  
const datePaid = document.getElementById("date-paid-input");  
const reference = document.getElementById("reference-input");  
const bankAmount = document.getElementById("bank-amount-input");   
const bankCharge = document.getElementById("bank-charge-input");   
const dimensions = document.getElementById("dimension-selector");   
const discountAmount = document.getElementById("discount-amount-input");   
const paymentAmount = document.getElementById("payment-amount-input");   

const paymentToSupplierItems = [];

placePaymentButton.addEventListener('click', () => {
    paymentToSupplierItems.push({
        reference: reference.value,
        paymentTo: paymentTo.value,
        fromBankAccount: fromBankAccount.value,
        bankBalance: bankBalance.value,
        datePaid: datePaid.value,
        bankAmount: bankAmount.value,
        bankCharge: bankCharge.value, 
        dimensions: dimensions.value,
        discountAmount: discountAmount.value,
        paymentAmount: paymentAmount.value,
    });

    const groupedData = paymentToSupplierItems.reduce((acc, item) => {
        if (!acc[item.reference]) {
          acc[item.reference] = []; // Create a new array for this reference
        }
        acc[item.reference].push({
            paymentTo: item.paymentTo,
            fromBankAccount: item.fromBankAccount,
            bankBalance: item.bankBalance,
            datePaid: item.datePaid,
            bankAmount: item.bankAmount,
            bankCharge: item.bankCharge, 
            dimensions: item.dimensions,
            discountAmount: item.discountAmount,
            paymentAmount: item.paymentAmount,
        });
        return acc;
      }, {});
    
      // Prepare the data to be sent to the PHP script
      const dataToSend = {
        reference: Object.keys(groupedData), // Get the references
        items: groupedData, // Grouped items
      };
    
      post("function/payment-to-supplier.php", dataToSend).then((Data) => {
        console.log(Data);
      });
})

