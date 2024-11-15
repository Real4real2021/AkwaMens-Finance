const customerReportClassButton = document.querySelector('.customer-button');
const reportClass = document.querySelector('.reports-for-class');
const supplierButton = document.querySelector('.supplier-button');
const inventoryButton = document.querySelector('.inventory-button');
const display = document.querySelector('.display');

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


function showCustomerReportClass(){
    let HTML =`
    Reports for Class: Customer <br>
        <input type="button" class="customer-balances" value="Customer Balances"><br>
        <input type="button" class="aged-customer-analysis" value="Aged Customer Analysis"><br>
        <input type="button" class="customer-trail-balance" value="Customer Trail Balance"><br>
        <input type="button" class="customer-detail-listing" value="Customer Detail Listing"><br>
        <input type="button" class="sales-summary-report" value="Sales Summary Report"><br>
        <input type="button" class="price-listing" value="Price Listing"><br>
        <input type="button" class="order-status-listing" value="Order Status Listing"><br>
        <input type="button" class="salesman-listing" value="Salesman Listing"><br>
        <input type="button" class="print-invoices" value="Print Invoices"><br>
        <input type="button" class="print-credit-notes" value="Print Credit Notes"><br>
        <input type="button" class="print-deliveries" value="Print Deliveries"><br>
        <input type="button" class="print-statements" value="Print Statements"><br>
        <input type="button" class="print-sales-orders" value="Print Sales Orders"><br>
        <input type="button" class="print-sales-quotations" value="Print Sales Quotations"><br>
        <input type="button" class="print-receipts" value="Print Receipts"><br>
    `
    reportClass.innerHTML=HTML;
};

customerReportClassButton.addEventListener('click', () => {
    showCustomerReportClass();
    const customerBalancesButton = document.querySelector('.customer-balances');
    const agedCustomerAnalysisButton = document.querySelector('.aged-customer-analysis');
    const customerTrailBalanceButton = document.querySelector('.customer-trail-balance');
    const customerDetailListingButton = document.querySelector('.customer-detail-listing');
    const salesSummaryReportButton = document.querySelector('.sales-summary-report');
    const priceListingButton = document.querySelector('.price-listing');
    const orderStatusListingButton = document.querySelector('.order-status-listing');
    const salesmanListingButton = document.querySelector('.salesman-listing');
    const printInvoicesButton = document.querySelector('.print-invoices');
    const printCreditNotesbutton = document.querySelector('.print-credit-notes');
    const printDeliveriesButton = document.querySelector('.print-deliveries');
    const printStatementButton = document.querySelector('.print-statements');
    const printSalesOrderButton = document.querySelector('.print-sales-orders');
    const printSalesQuotationsButton = document.querySelector('.print-sales-quotations');
    const printReceiptsButton = document.querySelector('.print-receipts');
    // const agedCustomerAnalysisButton = document.querySelector('.aged-customer-analysis');
    // const agedCustomerAnalysisButton = document.querySelector('.aged-customer-analysis');

    customerBalancesButton.addEventListener('click', () => {
        showCustomerBalances();
    });

    agedCustomerAnalysisButton.addEventListener('click', () => {
        showAgedCustomerAnalysis();
    });

    customerTrailBalanceButton.addEventListener('click', ()=>{
        showCustomerTrailBalance();
    });

    customerDetailListingButton.addEventListener('click', () => {
        showCustomerDetailListing();
    });

    salesSummaryReportButton.addEventListener('click', () => {
        showSalesSummaryReport();
    });

    priceListingButton.addEventListener('click', () => {
        showPriceListing();
    });

    orderStatusListingButton.addEventListener('click', () => {
        showOrderStatus();
    });

    salesmanListingButton.addEventListener('click', () => {
        showSalesmanListing();
    });

    printInvoicesButton.addEventListener('click', () =>{
        showPrintInvoices();
    });

    printCreditNotesbutton.addEventListener('click', () => {
        showPrintCreditNotes();
    });

    printDeliveriesButton.addEventListener('click', () => {
        showPrintDeliveries();
    });

    printStatementButton.addEventListener('click', () => {
        showPrintStatements();
    });

    printSalesOrderButton.addEventListener('click', () => {
        showSalesOrders();
    });
    printSalesQuotationsButton.addEventListener('click', () => {
        showPrintSalesQuotations();
    });
    
    printReceiptsButton.addEventListener('click', () => {
        showPrintRecipts();
    })
});

function showCustomerBalances(){
    let HTML = `
    <input type="button" value="Display: Customer Balances"><br>
        <label for="start-date">Start Date: <br>
            <input type="date">
        </label><br>
        <label for="end-date">End Date: <br>
            <input type="date">
        </label><br>
        <label for="customer">Customer: <br>
            <select name="customer-selector" id="customer-selector">
                <option value="no-customer-filter">No customer Filter</option>
                <option value="akwamens-sa">AkwaMens SA</option>
            </select>
        </label><br>
        <label for="show-balance">Show Balance: <br>
            <select name="show-balance-selector" id="show-balance-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="currency-filter">Currency Filter: <br>
            <select name="currency-filter-selector" id="currency-filter-selector">
                <option value="no-currency-filter">No Currency Filter</option>
                <option value="rand">R- Rand</option>
                <option value="usd">USD- US Dollar</option>
            </select>
        </label><br>
        <label for="suppress-zeros">Suppress Zeros: <br>
            <select name="suppress-zeros-selector" id="suppress-zeros-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label><br>
        <label for="destination">Destination: <br>
            <select name="destination-selector" id="destination-selector">
                <option value="pdf-printer">PDF/Printer</option>
                <option value="excel">Excel</option>
            </select>
        </label>
    `
    display.innerHTML=HTML;
};

function showAgedCustomerAnalysis(){
   let HTML=`
   <input type="button" value="Display: Customer Balances"><br>
        <label for="end-date">End Date: <br>
            <input type="date">
        </label><br>
        <label for="customer">Customer: <br>
            <select name="customer-selector" id="customer-selector">
                <option value="no-customer-filter">No customer Filter</option>
                <option value="akwamens-sa">AkwaMens SA</option>
            </select>
        </label><br>
        <label for="currency-filter">Currency Filter: <br>
            <select name="currency-filter-selector" id="currency-filter-selector">
                <option value="no-currency-filter">No Currency Filter</option>
                <option value="rand">R- Rand</option>
                <option value="usd">USD- US Dollar</option>
            </select>
        </label><br>
        <label for="show-also-allocated">Show Also Allocated: <br>
            <select name="show-also-allocated-selector" id="show-also-allocated-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="sumamry-only">Summary Only: <br>
            <select name="summary-only-selector" id="summary-only-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="suppress-zeros">Suppress Zeros: <br>
            <select name="suppress-zeros-selector" id="suppress-zeros-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="graphics">Graphics: <br>
            <select name="graphics-selector" id="graphics-selector">
                <option value="no-graphics">No Graphics</option>
                <option value="vertical-bars">Vertical Bars</option>
                <option value="horizontal-bars">Horizontal Bars</option>
                <option value="dotes">Dotes</option>
                <option value="lines">Lines</option>
                <option value="pies">Pies</option>
                <option value="donuts">Donuts</option>
            </select>
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label><br>
        <label for="destination">Destination: <br>
            <select name="destination-selector" id="destination-selector">
                <option value="pdf-printer">PDF/Printer</option>
                <option value="excel">Excel</option>
            </select>
        </label>
   ` 
   display.innerHTML=HTML;
}

function showCustomerTrailBalance(){
   let HTML=`
   <input type="button" value="Display: Customer Balances"><br>
        <label for="end-date">End Date: <br>
            <input type="date">
        </label><br>
        <label for="customer">Customer: <br>
            <select name="customer-selector" id="customer-selector">
                <option value="no-customer-filter">No customer Filter</option>
                <option value="akwamens-sa">AkwaMens SA</option>
            </select>
        </label><br>
        <label for="currency-filter">Currency Filter: <br>
            <select name="currency-filter-selector" id="currency-filter-selector">
                <option value="no-currency-filter">No Currency Filter</option>
                <option value="rand">R- Rand</option>
                <option value="usd">USD- US Dollar</option>
            </select>
        </label><br>
        <label for="show-also-allocated">Show Also Allocated: <br>
            <select name="show-also-allocated-selector" id="show-also-allocated-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="sumamry-only">Summary Only: <br>
            <select name="summary-only-selector" id="summary-only-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="suppress-zeros">Suppress Zeros: <br>
            <select name="suppress-zeros-selector" id="suppress-zeros-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="graphics">Graphics: <br>
            <select name="graphics-selector" id="graphics-selector">
                <option value="no-graphics">No Graphics</option>
                <option value="vertical-bars">Vertical Bars</option>
                <option value="horizontal-bars">Horizontal Bars</option>
                <option value="dotes">Dotes</option>
                <option value="lines">Lines</option>
                <option value="pies">Pies</option>
                <option value="donuts">Donuts</option>
            </select>
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label><br>
        <label for="destination">Destination: <br>
            <select name="destination-selector" id="destination-selector">
                <option value="pdf-printer">PDF/Printer</option>
                <option value="excel">Excel</option>
            </select>
        </label>
   ` 
   display.innerHTML=HTML;
}

function showCustomerDetailListing(){
    let HTML =`
    <input type="button" value="Display: Customer Detail Listing"><br>
        <label for="activity-since">Activity Since: <br>
            <input type="date">
        </label><br>
        <label for="sales-areas">Sales Areas: <br>
            <select name="sales-area-selector" id="sales-area-selector">
                <option value="no-areas-filter">No Areas Filter</option>
                <option value="global">Global</option>
            </select>
        </label><br>
        <label for="sales-folk">Sales Folk: <br>
            <select name="sales-folk-selector" id="sales-folk-selector">
                <option value="no-sales-folk-filter">No Sales Folk Filter</option>
                <option value="sales-person">Sales Person</option>
            </select>
        </label><br>
        <label for="activity-greater-than">Activity Greater Than: <br>
            <input type="text">
        </label><br>
        <label for="activity-less-than">Activity Less Than: <br>
            <input type="text">
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label><br>
        <label for="destination">Destination: <br>
            <select name="destination-selector" id="destination-selector">
                <option value="pdf-printer">PDF/Printer</option>
                <option value="excel">Excel</option>
            </select>
        </label>
    `

    display.innerHTML = HTML;
}

function showSalesSummaryReport(){
    HTML = `
    <input type="button" value="Display: Customer Detail Listing"><br>
        <label for="start-date">Start Date: <br>
            <input type="date">
        </label><br>
        <label for="end-date">End Date: <br>
            <input type="date">
        </label><br>
        <label for="tax-id-only">Tax Id Only: <br>
            <select name="tax-id-only-selector" id="tax-id-only-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label><br>
        <label for="destination">Destination: <br>
            <select name="destination-selector" id="destination-selector">
                <option value="pdf-printer">PDF/Printer</option>
                <option value="excel">Excel</option>
            </select>
        </label>
    `
    display.innerHTML = HTML;
}

function showPriceListing(){
    HTML = `
    <input type="button" value="Display: Price Listing"><br>
        <label for="currency-fileter">Currency Filter: <br>
            <select name="currency-filter-selector" id="currency-fileter-selector">
                <option value="no-currency-filter">No Currency Filter</option>
                <option value="rand">Rand</option>
            </select>
        </label><br>
        <label for="inventory-category">Inventory Category: <br>
            <select name="inventory-category-selector" id="inventory-category-selector">
                <option value="no-filter">No Filter</option>
                <option value="component">Component</option>
                <option value="charges">Charges</option>
                <option value="systems">systems</option>
                <option value="services">services</option>
            </select>
        </label><br>
        <label for="sales-type">Sales Type: <br>
            <select name="sales-type-selector" id="sales-type-selector">
                <option value="retail">Retail</option>
                <option value="wholesale">Wholesale</option>
            </select>
        </label><br>
        <label for="show-pictures">Show Pictures: <br>
            <select name="show-pictures-selector" id="show-pictures-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="show-gp-precent">Show GP %: <br>
            <select name="show-gp-precent-selector" id="show-gp-precent-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label><br>
        <label for="destination">Destination: <br>
            <select name="destination-selector" id="destination-selector">
                <option value="pdf-printer">PDF/Printer</option>
                <option value="excel">Excel</option>
            </select>
        </label>
    `
    display.innerHTML=HTML;
}

function showOrderStatus(){
    HTML =`
    <input type="button" value="Display: Customer Balances"><br>
        <label for="start-date">Start Date: <br>
            <input type="date">
        </label><br>
        <label for="end-date">End Date: <br>
            <input type="date">
        </label><br>
        <label for="inventory-category">Inventory Category: <br>
            <select name="inventory-category-selector" id="inventory-category-selector">
                <option value="no-category-filter">No Category Filter</option>
                <option value="component">Component</option>
                <option value="charges">Charges</option>
                <option value="systems">Systems</option>
                <option value="services">Services</option>
            </select>
        </label><br>
        <label for="stock-location">Stock Location: <br>
            <select name="stock-location-selector" id="stock-location-selector">
                <option value="no-location-filter">No Location Filter</option>
                <option value="default">Default</option>
            </select>
        </label><br>
        <label for="back-orders-only">Back Orders Only: <br>
            <select name="back-orders-only-selector" id="back-orders-only-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label><br>
        <label for="destination">Destination: <br>
            <select name="destination-selector" id="destination-selector">
                <option value="pdf-printer">PDF/Printer</option>
                <option value="excel">Excel</option>
            </select>
        </label>
    `
    display.innerHTML=HTML;
}

function showSalesmanListing(){
    HTML = `
    <input type="button" value="Display: Customer Detail Listing"><br>
        <label for="start-date">Start Date: <br>
            <input type="date">
        </label><br>
        <label for="end-date">End Date: <br>
            <input type="date">
        </label><br>
        <label for="summary-only">Summary Only: <br>
            <select name="summary-only-selector" id="summary-only-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label><br>
        <label for="destination">Destination: <br>
            <select name="destination-selector" id="destination-selector">
                <option value="pdf-printer">PDF/Printer</option>
                <option value="excel">Excel</option>
            </select>
        </label> 
    `
    display.innerHTML = HTML;
}

function showPrintInvoices(){
    HTML = `
    <input type="button" value="Display: Customer Detail Listing"><br>
        <label for="form">From: <br>
            <select name="from-selector" id="from-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="to">To: <br>
            <select name="to-selector" id="to-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="currency-filter">Currency Filter: <br>
            <select name="currency-filter-selector" id="currency-filter-selector">
                <option value="no-currency-filter">No Currency Filter</option>
                <option value="rand">Rand</option>
                <option value="usd">USD</option>
            </select>
        </label><br>
        <label for="email-customer">Email Customer: <br>
            <select name="email-customer-selector" id="email-customer-selector">
                <option value="no">No </option>
                <option value="yes">Yes </option>
            </select>
        </label><br>
        <label for="payment-link">Payment Link: <br>
            <select name="payment-link-selector" id="payment-link-selector">
                <option value="no-payment-link">No Payment Link</option>
                <option value="paypal">Paypal</option>
            </select>
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label><br>
        <label for="destination">Destination: <br>
            <select name="destination-selector" id="destination-selector">
                <option value="pdf-printer">PDF/Printer</option>
                <option value="excel">Excel</option>
            </select>
        </label>
    `
    display.innerHTML = HTML;
}

function showPrintCreditNotes(){
    HTML = `
    <input type="button" value="Display: Customer Detail Listing"><br>
        <label for="form">From: <br>
            <select name="from-selector" id="from-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="to">To: <br>
            <select name="to-selector" id="to-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="currency-filter">Currency Filter: <br>
            <select name="currency-filter-selector" id="currency-filter-selector">
                <option value="no-currency-filter">No Currency Filter</option>
                <option value="rand">Rand</option>
                <option value="usd">USD</option>
            </select>
        </label><br>
        <label for="email-customer">Email Customer: <br>
            <select name="email-customer-selector" id="email-customer-selector">
                <option value="no">No </option>
                <option value="yes">Yes </option>
            </select>
        </label><br>
        <label for="payment-link">Payment Link: <br>
            <select name="payment-link-selector" id="payment-link-selector">
                <option value="no-payment-link">No Payment Link</option>
                <option value="paypal">Paypal</option>
            </select>
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label>
    `
    display.innerHTML = HTML;
}

function showPrintDeliveries(){
    HTML = `
    <input type="button" value="Display: Customer Detail Listing"><br>
        <label for="form">From: <br>
            <select name="from-selector" id="from-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="to">To: <br>
            <select name="to-selector" id="to-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="email-customer">Email Customer: <br>
            <select name="email-customer-selector" id="email-customer-selector">
                <option value="no">No </option>
                <option value="yes">Yes </option>
            </select>
        </label><br>
        <label for="print-as-packing-slip">Print as Packing Slip: <br>
            <select name="print-as-packing-slip-selector" id="print-as-packing-slip-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label>
    `
    display.innerHTML = HTML;
}

function showPrintStatements(){
    HTML = `
    <input type="button" value="Display: Customer Detail Listing"><br>
        <label for="customer">Customer: <br>
            <select name="customer-selector" id="customer-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="currency">Currency: <br>
            <select name="currency-selector" id="currency-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="show-also-allocated">Show Also Allocated: <br>
            <select name="show-also-allocated-selector" id="show-also-allocated-selector">
                <option value="no">No </option>
                <option value="yes">Yes </option>
            </select>
        </label><br>
        <label for="email-customer">Email Customer: <br>
            <select name="email-customer-selector" id="email-customer-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label>
    `
    display.innerHTML = HTML;
}

function showSalesOrders(){
    HTML = `
    <input type="button" value="Display: Customer Detail Listing"><br>
        <label for="form">From: <br>
            <select name="from-selector" id="from-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="to">To: <br>
            <select name="to-selector" id="to-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="currency-filter">Currency Filter: <br>
            <select name="currency-filter-selector" id="currency-filter-selector">
                <option value="no-currency-filter">No Currency Filter </option>
                <option value="rand">Rand </option>
            </select>
        </label><br>
        <label for="email-customer">Email Customer: <br>
            <select name="email-customer-selector" id="email-customer-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="print-as-note">Print as Note: <br>
            <select name="print-as-note-selector" id="print-as-note-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label>
    `
    display.innerHTML = HTML;
}

function showPrintSalesQuotations(){
    HTML = `
    <input type="button" value="Display: Customer Detail Listing"><br>
        <label for="form">From: <br>
            <select name="from-selector" id="from-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="to">To: <br>
            <select name="to-selector" id="to-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="currency-filter">Currency Filter: <br>
            <select name="currency-filter-selector" id="currency-filter-selector">
                <option value="no-currency-filter">No Currency Filter </option>
                <option value="rand">Rand </option>
            </select>
        </label><br>
        <label for="email-customer">Email Customer: <br>
            <select name="email-customer-selector" id="email-customer-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label>
    `
    display.innerHTML = HTML;
}


function showPrintRecipts(){
    HTML = `
    <input type="button" value="Display: Customer Detail Listing"><br>
        <label for="form">From: <br>
            <select name="from-selector" id="from-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="to">To: <br>
            <select name="to-selector" id="to-selector">
                <option value=""></option>
                <option value=""></option>
            </select>
        </label><br>
        <label for="currency-filter">Currency Filter: <br>
            <select name="currency-filter-selector" id="currency-filter-selector">
                <option value="no-currency-filter">No Currency Filter </option>
                <option value="rand">Rand </option>
            </select>
        </label><br>
        <label for="email-customer">Email Customer: <br>
            <select name="email-customer-selector" id="email-customer-selector">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </label><br>
        <label for="comments">Comments: <br>
            <input type="text">
        </label><br>
        <label for="orientation">Orientation: <br>
            <select name="orientation-selector" id="orientation-selector">
                <option value="portrait">Portrait</option>
                <option value="portrait">Landscape</option>
            </select>
        </label>
    `
    display.innerHTML = HTML;
}

function showSupplierReportClass(){
    let HTML=`
    Report For Class: Supplier <br>
        <input type="button" value="Supplier Balances" class="supplier-balances"> <br>
        <input type="button" value="Aged Supplier Analyses" class="aged-supplier-analyses"> <br>
        <input type="button" value="Supplier Trail Balance" class="supplier-trail-balance"> <br>
        <input type="button" value="Payment Report" class="payment-report"> <br>
        <input type="button" value="Outstanding GRNs Reports" class="outstanding-grns-reports"> <br>
        <input type="button" value="Supplier Detail Listing" class="supplier-detail-listing"> <br>
        <input type="button" value="Print Purchase Orders" class="print-purchase-orders"> <br>
        <input type="button" value="Print Remittances" class="print-remittances"> <br>
    `
    reportClass.innerHTML=HTML;
};

supplierButton.addEventListener('click', () => {
    showSupplierReportClass();
    const supplierBalanceButton = document.querySelector('.supplier-balances');
    const agedSupplierAnalysesButton = document.querySelector('.aged-supplier-analyses');
    const supplierTrailBalanceButton = document.querySelector('.supplier-trail-balance');
    const paymentReportButton = document.querySelector('.payment-report');
    const outstandingGrnsReportsButton = document.querySelector('.outstanding-grns-reports');
    const supplierDetailsListingButton = document.querySelector('.supplier-detail-listing');
    const printPurchaseOrdersButton = document.querySelector('.print-purchase-orders');
    const printRemittancesButton = document.querySelector('.print-remittances');

    supplierBalanceButton.addEventListener('click', () => {
        ShowSupplierBalanceButton();
    });
    agedSupplierAnalysesButton.addEventListener('click', () => {
        ShowAgedSupplierAnalysesButton();
    });
    supplierTrailBalanceButton.addEventListener('click', () => {
        ShowSupplierTrailBalanceButton();
    });
    paymentReportButton.addEventListener('click', () => {
        ShowPaymentReportButton();
    });
    outstandingGrnsReportsButton.addEventListener('click', () => {
        ShowOutstandingGrnsReportsButton();
    });
    supplierDetailsListingButton.addEventListener('click', () => {
        ShowSupplierDetailsListingButton();
    });
    printPurchaseOrdersButton.addEventListener('click', () => {
        ShowPrintPurchaseOrdersButton();
    });
    printRemittancesButton.addEventListener('click', () => {
        ShowPrintRemittancesButton();
    });
});

function ShowSupplierBalanceButton(){
    HTML = `
    
    `
    display.innerHTML=HTML
}
function ShowAgedSupplierAnalysesButton(){
    HTML = `
    
    `
    display.innerHTML=HTML
}
function ShowSupplierTrailBalanceButton(){
    HTML = `
    
    `
    display.innerHTML=HTML
}
function ShowPaymentReportButton(){
    HTML = `
    
    `
    display.innerHTML=HTML
}
function ShowOutstandingGrnsReportsButton(){
    HTML = `
    
    `
    display.innerHTML=HTML
}
function ShowSupplierDetailsListingButton(){
    HTML = `
    
    `
    display.innerHTML=HTML
}
function ShowPrintPurchaseOrdersButton(){
    HTML = `
    
    `
    display.innerHTML=HTML
}
function ShowPrintRemittancesButton(){
    HTML = `
    
    `
    display.innerHTML=HTML
}

function showInventoryReportClass(){
    HTML = `
    Report For Class: Inventory <br>
    <input type="button" value="Inventory Valuation Report" class="inventory-valuation-report"><br>
        <input type="button" value="Inventory Planning Report" class="inventory-valuation-report"><br>
        <input type="button" value="Stock Check Sheets" class="stock-check-sheets"><br>
        <input type="button" value="Inventory Sales Report" class="inventory-sales-report"><br>
        <input type="button" value="GRN Valuation Report" class="grn-valuation-report"><br>
        <input type="button" value="Inventory Purchasing Report" class="inventory-purchasing-report"><br>
        <input type="button" value="Inventory Movement Report" class="inventory-movement-report"><br>
        <input type="button" value="Costed Inventory Movement Report" class="costed-item-movement-report"><br>
        <input type="button" value="Item Sales Summary Report" class="item-sales-summary"><br>
        <input type="button" value="Inventory Purchasing - Transaction Based" class="inventory-purchasing">
    `
    reportClass.innerHTML = HTML;
}

inventoryButton.addEventListener('click', () => {
    showInventoryReportClass();
    const inventoryPurchasingTransactionBasedButton = document.querySelector('.inventory-valuation-report');
    const inventoryValuationReport = document.querySelector('.inventory-valuation-report');
    const stockCheckSheets = document.querySelector('.stock-check-sheets');
    const inventorySalesReport = document.querySelector('.inventory-sales-report');
    const grnValuationReport = document.querySelector('.grn-valuation-report');
    const inventoryPurchasingReport = document.querySelector('.inventory-purchasing-report');
    const inventoryMovementReport = document.querySelector('.inventory-movement-report');
    const itemMovementReport = document.querySelector('.costed-item-movement-report');
    const itemSalesSummary = document.querySelector('.item-sales-summary');

    inventoryPurchasingTransactionBasedButton.addEventListener('click', () => {
        showinventoryPurchasingTransactionBasedButton();
    })
    inventoryValuationReport.addEventListener('click', () => {
        showinventoryValuationReport();
    })
    stockCheckSheets.addEventListener('click', () => {
        showstockCheckSheets();
    })
    inventorySalesReport.addEventListener('click', () => {
        showinventorySalesReport();
    })
    grnValuationReport.addEventListener('click', () => {
        showgrnValuationReport();
    })
    inventoryPurchasingReport.addEventListener('click', () => {
        showinventoryPurchasingReport();
    })
    inventoryMovementReport.addEventListener('click', () => {
        showinventoryMovementReport();
    })
    itemMovementReport.addEventListener('click', () => {
        showitemMovementReport();
    })
    itemSalesSummary.addEventListener('click', () => {
        showitemSalesSummary();
    })
});

function showinventoryPurchasingTransactionBasedButton(){
    HTML = `
    
    `
    display.innerHTML = HTML
}
function showinventoryValuationReport(){
    HTML = `
    
    `
    display.innerHTML = HTML
}
function showstockCheckSheets(){
    HTML = `
    
    `
    display.innerHTML = HTML
}
function showinventorySalesReport(){
    HTML = `
    
    `
    display.innerHTML = HTML
}
function showgrnValuationReport(){
    HTML = `
    
    `
    display.innerHTML = HTML
}
function showinventoryPurchasingReport(){
    HTML = `
    
    `
    display.innerHTML = HTML
}
function showinventoryMovementReport(){
    HTML = `
    
    `
    display.innerHTML = HTML
}
function showitemMovementReport(){
    HTML = `
    
    `
    display.innerHTML = HTML
}
function showitemSalesSummary(){
    HTML = `
    
    `
    display.innerHTML = HTML
}