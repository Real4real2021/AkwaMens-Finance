const inputDiv = document.querySelector('.input-div');

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

function renderInputs(){
    let html = `
    <div class="customer-info">
            <label for="customer">Customer:
                <select name="customer-selector" id="customer-selector">
                    
                </select>
            </label><br>
            <label for="branch">Branch:
                <select name="branch" id="branch">
                    <option value="branch-1">Branch 1</option>
                    <option value="branch-2">Branch 2</option>
                    <option value="branch-3">Branch 3</option>
                </select>
            </label><br>
            <label for="reference">Reference:
                <input type="text">
            </label>
        </div>
        <div class="customer-info">
            <label for="sales-type">Sales Type:
                <select name="sales-type" id="sales-type">
                    <option value="retail">Retail</option>
                    <option value="wholesale">Wholesale</option>
                </select>
            </label><br>
            <label for="shipping-company">Shipping Company:
                <select name="shipping-company" id="shipping-company">
                    <option value="default">Default</option>
                </select>
            </label><br>
            <label for="customer-discount">Customer Discount:
                0%
            </label>
        </div>
        <div class="customer-info">
            <label for="date">Date:
                <input type="date" name="" id="">
            </label><br>
            <label for="dimensions">Dimensions:
                <select name="" id=""></select>
            </label>
        </div>
    `
    inputDiv.innerHTML = html;
}

