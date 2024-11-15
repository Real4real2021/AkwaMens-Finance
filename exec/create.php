<?php
require_once("../config/db_con.php");

// Create invoices table
$createInvoicesTable = "
CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoiceNumber VARCHAR(25) NOT NULL,
    invoiceDate DATE NOT NULL,
    dueDate DATE NOT NULL,
    clientName VARCHAR(25) NOT NULL,
    clientAddress TEXT NOT NULL,
    clientContact VARCHAR(25),
    notes TEXT,
    itemDescription TEXT,
    quantity INT NOT NULL,
    unitPrice DECIMAL(10, 2) NOT NULL
)";

mysqli_query($con, $createInvoicesTable) or die(mysqli_error($con));

// Create item_inventory table
$createItemInventoryTable = "
CREATE TABLE IF NOT EXISTS item_inventory (
    item_code VARCHAR(25) PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    description TEXT,
    category VARCHAR(25),
    item_tax_type VARCHAR(25),
    item_type VARCHAR(25),
    unit_of_measure VARCHAR(25),
    editable_description TEXT,
    exclude_from_sales BOOLEAN DEFAULT FALSE,
    exclude_from_purchases BOOLEAN DEFAULT FALSE,
    dimensions VARCHAR(25),
    sales_account VARCHAR(25),
    inventory_account VARCHAR(25),
    cogs_account VARCHAR(25),
    inventory_adjustment_account VARCHAR(25)
)";

mysqli_query($con, $createItemInventoryTable) or die(mysqli_error($con));

// Create customers table
$createCustomersTable = "
CREATE TABLE IF NOT EXISTS customers (
    primaryId INT AUTO_INCREMENT PRIMARY KEY,
    customerName VARCHAR(25) NOT NULL,
    customerShortName VARCHAR(25),
    customerAddress TEXT,
    GSTNo VARCHAR(25),
    customerCurrency VARCHAR(25),
    salesType VARCHAR(25),
    phone VARCHAR(25),
    secondaryPhoneNumber VARCHAR(25),
    email VARCHAR(25),
    bankAccountNumber VARCHAR(25),
    salesPerson VARCHAR(25),
    discountPercent DECIMAL(5, 2),
    promptPaymentDiscountPercent DECIMAL(5, 2),
    creditLimit DECIMAL(10, 2),
    paymentTerms VARCHAR(25),
    generalNotes TEXT,
    defaultInventoryLocation VARCHAR(25),
    defaultShippingCompany VARCHAR(25),
    salesArea VARCHAR(25),
    taxGroup VARCHAR(25)
)";

mysqli_query($con, $createCustomersTable) or die(mysqli_error($con));

// Create branches table
$createBranchesTable = "
CREATE TABLE IF NOT EXISTS branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shortName VARCHAR(25),
    branchName VARCHAR(25) NOT NULL,
    contact VARCHAR(25),
    salesPerson VARCHAR(25),
    area VARCHAR(25),
    phoneNo VARCHAR(25),
    email VARCHAR(25),
    taxGroup VARCHAR(25)
)";

mysqli_query($con, $createBranchesTable) or die(mysqli_error($con));

// Create sales_order_entries table
$createSalesOrderEntriesTable = "
CREATE TABLE IF NOT EXISTS sales_order_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(25) NOT NULL,
    itemCode VARCHAR(25) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit VARCHAR(25),
    priceAfterTax DECIMAL(10, 2),
    discount DECIMAL(5, 2)
)";

mysqli_query($con, $createSalesOrderEntriesTable) or die(mysqli_error($con));

// Create customer_payments table
$createCustomerPaymentsTable = "
CREATE TABLE IF NOT EXISTS customer_payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer VARCHAR(25) NOT NULL,
    branch VARCHAR(25),
    bankAccount VARCHAR(25),
    transactionDate DATE NOT NULL,
    reference VARCHAR(25),
    bankCharge DECIMAL(10, 2),
    dimensions VARCHAR(25),
    paymentDiscount DECIMAL(5, 2),
    discountAmount DECIMAL(10, 2),
    memo TEXT
)";

mysqli_query($con, $createCustomerPaymentsTable) or die(mysqli_error($con));

// Create direct_delivery table
$createDirectDeliveryTable = "
CREATE TABLE IF NOT EXISTS direct_delivery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(25) NOT NULL,
    itemCode VARCHAR(25) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit VARCHAR(25),
    priceAfterTax DECIMAL(10, 2),
    discount DECIMAL(5, 2)
)";

mysqli_query($con, $createDirectDeliveryTable) or die(mysqli_error($con));

// Create direct_invoice table
$createDirectInvoiceTable = "
CREATE TABLE IF NOT EXISTS direct_invoice (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(25) NOT NULL,
    itemCode VARCHAR(25) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit VARCHAR(25),
    priceAfterTax DECIMAL(10, 2),
    discount DECIMAL(5, 2)
)";

mysqli_query($con, $createDirectInvoiceTable) or die(mysqli_error($con));

$createSalesQuotationEntriesTable = "
CREATE TABLE IF NOT EXISTS sales_quotation_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(25) NOT NULL,
    itemCode VARCHAR(25) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit VARCHAR(25),
    priceAfterTax DECIMAL(10, 2),
    discount DECIMAL(5, 2),
    customer VARCHAR(25),
    branch VARCHAR(25),
    payment VARCHAR(25),
    priceList VARCHAR(25),
    date DATE
)";

mysqli_query($con, $createSalesQuotationEntriesTable) or die(mysqli_error($con));

$createPurchaseOrderEntriesTable = "
CREATE TABLE IF NOT EXISTS purchase_order_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(25) NOT NULL,
    supplierReference VARCHAR(25),
    dimensions VARCHAR(25),
    receiveInto VARCHAR(25),
    deliverTo VARCHAR(25),
    itemCode VARCHAR(25) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit VARCHAR(25),
    requiredDeliveryDate DATE,
    priceBeforeTax DECIMAL(10, 2),
    supplier VARCHAR(25),
    exchangeRate VARCHAR(25),
    date DATE
)";

mysqli_query($con, $createPurchaseOrderEntriesTable) or die(mysqli_error($con));

$createGRNENtriesTable = "
CREATE TABLE IF NOT EXISTS grn_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier VARCHAR(25),
    reference VARCHAR(25) NOT NULL,
    orderDate DATE NOT NULL,
    currency VARCHAR(25) NOT NULL,
    exchangeRate INT(25) NOT NULL,
    supplierReference VARCHAR(25),
    dimensions VARCHAR(25),
    receiveInto VARCHAR(25),
    deliverTo VARCHAR(25),
    itemCode VARCHAR(25) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit VARCHAR(25),
    requiredDeliveryDate DATE,
    priceBeforeTax DECIMAL(10, 2)
)"; 

mysqli_query($con, $createGRNENtriesTable) or die(mysqli_error($con));

$createDirectSupplierInvoiceEntriesTable = "
CREATE TABLE IF NOT EXISTS direct_supplier_invoice_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier VARCHAR(25),
    reference VARCHAR(25) NOT NULL,
    orderDate DATE NOT NULL,
    currency VARCHAR(25) NOT NULL,
    exchangeRate INT(25) NOT NULL,
    supplierReference VARCHAR(25),
    dimensions VARCHAR(25),
    receiveInto VARCHAR(25),
    deliverTo VARCHAR(25),
    itemCode VARCHAR(25) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit VARCHAR(25),
    requiredDeliveryDate DATE,
    priceBeforeTax DECIMAL(10, 2)
)";

mysqli_query($con, $createDirectSupplierInvoiceEntriesTable) or die(mysqli_error($con));

$paymentToSupplierTable = "
CREATE TABLE IF NOT EXISTS payment_to_supplier (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paymentTo VARCHAR(25) NOT NULL,
    fromBankAccount VARCHAR(25) NOT NULL,
    bankBalance DECIMAL(10, 2) NOT NULL,
    datePaid DATE NOT NULL,
    reference VARCHAR(25) NOT NULL,
    bankCharge DECIMAL(10, 2) NOT NULL,
    dimensions VARCHAR(25),
    discountAmount DECIMAL(10, 2),
    paymentAmount DECIMAL(10, 2),
    memo TEXT
)";

mysqli_query($con, $paymentToSupplierTable) or die(mysqli_error($con));


$createSupplierInvoicesTable = "
CREATE TABLE IF NOT EXISTS supplier_invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(25) NOT NULL,
    supplier VARCHAR(25) NOT NULL,
    date DATE NOT NULL,
    supplierRef VARCHAR(25),
    dueDate DATE NOT NULL,
    paymentTerms VARCHAR(25) NOT NULL,
    dimensions VARCHAR(25),
    supplierCurrency VARCHAR(25) NOT NULL,
    exchangeRate INT(25) NOT NULL,
    taxGroup VARCHAR(25) NOT NULL,
    currentCredit DECIMAL(10, 2) NOT NULL,
    account VARCHAR(25) NOT NULL,
    name VARCHAR(25) NOT NULL,
    dimension VARCHAR(25),
    amount DECIMAL(10, 2) NOT NULL,
    memo TEXT
)";

mysqli_query($con, $createSupplierInvoicesTable) or die(mysqli_error($con));

$createSupplierCreditNotesTable = "
CREATE TABLE IF NOT EXISTS supplier_credit_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(25) NOT NULL,
    supplier VARCHAR(25) NOT NULL,
    date DATE NOT NULL,
    supplierRef VARCHAR(25),
    dueDate DATE NOT NULL,
    paymentTerms VARCHAR(25) NOT NULL,
    dimensions VARCHAR(25),
    supplierCurrency VARCHAR(25) NOT NULL,
    exchangeRate INT(25) NOT NULL,
    taxGroup VARCHAR(25) NOT NULL,
    currentCredit DECIMAL(10, 2) NOT NULL,
    account VARCHAR(25) NOT NULL,
    name VARCHAR(25) NOT NULL,
    dimension VARCHAR(25),
    amount DECIMAL(10, 2) NOT NULL,
    memo TEXT
)";

mysqli_query($con, $createSupplierCreditNotesTable) or die(mysqli_error($con));

$createInventoryLocationTable = "
CREATE TABLE IF NOT EXISTS inventory_location (
    id INT AUTO_INCREMENT PRIMARY KEY,
    locationCode VARCHAR(25) NOT NULL,
    locationName VARCHAR(25) NOT NULL,
    contactForDeliveries VARCHAR(25),
    address TEXT,
    telephone VARCHAR(25),
    secondaryTelephone VARCHAR(25),
    email VARCHAR(25)
)";

mysqli_query($con, $createInventoryLocationTable) or die(mysqli_error($con));

$createInventoryLocationTransferTable = "
CREATE TABLE IF NOT EXISTS inventory_location_transfer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(25),
    fromLocation VARCHAR(25),
    toLocation VARCHAR(25),
    transferDate DATE,
    itemCode VARCHAR(25),
    inventoryItem VARCHAR(25),
    quantity INT,
    unit VARCHAR(25)
)";

mysqli_query($con, $createInventoryLocationTransferTable) or die(mysqli_error($con));

$createInventoryAdjustmentTable = "
CREATE TABLE IF NOT EXISTS inventory_adjustment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(25),
    location VARCHAR(25),
    date DATE,
    itemCode VARCHAR(25),
    inventoryItem VARCHAR(25),
    QOH INT,
    quantity INT,
    unit VARCHAR(25),
    unitCost DECIMAL(10, 2),
    total DECIMAL(10, 2),
    memo VARCHAR(25)
)"; 

mysqli_query($con, $createInventoryAdjustmentTable) or die(mysqli_error($con));


$createSalesPricingTable = "
CREATE TABLE IF NOT EXISTS sales_pricing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    currency VARCHAR(25) NOT NULL,
    salesType VARCHAR(25) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
)";

mysqli_query($con, $createSalesPricingTable) or die(mysqli_error($con));

$createPaymentsTable = "
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    payTo VARCHAR(25) NOT NULL,
    toTheOrderOf VARCHAR(25) NOT NULL,
    payFrom VARCHAR(25) NOT NULL,
    bankBalance DECIMAL(10, 2) NOT NULL,
    accountCode VARCHAR(25) NOT NULL,
    accountDescription VARCHAR(25) NOT NULL,
    dimension VARCHAR(25) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    memo TEXT
)";

mysqli_query($con, $createPaymentsTable) or die(mysqli_error($con));

$createDepositsTable = "
CREATE TABLE IF NOT EXISTS deposits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    depositDate DATE NOT NULL,
    payFrom VARCHAR(25) NOT NULL,
    name VARCHAR(25) NOT NULL,
    payInto VARCHAR(25) NOT NULL,
    accountCode VARCHAR(25) NOT NULL,
    accountDescription VARCHAR(25) NOT NULL,
    dimension VARCHAR(25) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    memo TEXT
)";

mysqli_query($con, $createDepositsTable) or die(mysqli_error($con));

$createBankAccountTransferTable = "
CREATE TABLE IF NOT EXISTS bank_account_transfer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fromAccount VARCHAR(25) NOT NULL,
    amount VARCHAR(25) NOT NULL,
    bankBalance DECIMAL(10, 2) NOT NULL,
    bankCharge DECIMAL(10, 2) NOT NULL,
    toAccount DECIMAL(10, 2) NOT NULL,
    memo VARCHAR(25) NOT NULL,
    reference VARCHAR(25) NOT NULL,
    dimension VARCHAR(25) NOT NULL
)";

mysqli_query($con, $createBankAccountTransferTable) or die(mysqli_error($con));

$createJournalEntriesTable = "
CREATE TABLE IF NOT EXISTS journal_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    currency VARCHAR(25) NOT NULL,
    documentDate DATE NOT NULL,
    eventDate DATE NOT NULL,
    sourceRef VARCHAR(25) NOT NULL,
    includeInTaxRegister BOOLEAN DEFAULT FALSE,
    accountCode VARCHAR(25) NOT NULL,
    accountDescription VARCHAR(25) NOT NULL,
    dimension VARCHAR(25) NOT NULL,
    debit DECIMAL(10, 2) NOT NULL,
    credit DECIMAL(10, 2) NOT NULL,
    memo VARCHAR(25) NOT NULL
)   
";

mysqli_query($con, $createJournalEntriesTable) or die(mysqli_error($con));
// Close the database connection
mysqli_close($con);
echo json_encode("Tables created successfully.");
?>