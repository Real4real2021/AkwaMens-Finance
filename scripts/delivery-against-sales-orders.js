const inputDiv = document.querySelector('.top-third');
const tableDiv = document.querySelector('.mid-third');

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

renderInputDiv();
renderTableDiv();

function renderInputDiv(){
    let html = `
    <h1>Search Outstanding Sales Order</h1>
       <label for="#">#:
        <input type="text" name="#" id="#">
       </label> 
       <label for="Ref">Ref:
        <input type="text" name="ref" id="ref">
       </label>
       <label for="location">Location:
        <select name="location" id="location">
            <option value="All Locations">All Locations</option>
            <option value="Default">Default</option>
        </select>
       </label>
       <label for="item">Item:
        <input type="text" name="item" id="item">
       </label>
       <select name="Inventory-item" id="Inventory-item">
        <option value="All Items">All Items</option>
        <option value="Item 1">Item 1</option>
        <option value="Item 2">Item 2</option>
       </select>
       <input type="button" value="Search">
       <label for="select-a-customer">Select a Customer:
        <select name="customer" id="customer">
            <option value="KK">KK</option>
            <option value="Kojo">Kojo</option>
        </select>
       </label>
    `
    inputDiv.innerHTML = html;
}

function renderTableDiv(){
    let html = `
    <table>
         <th>Order #</th>
         <th>Ref</th>
         <th>Customer</th>
         <th>Branch</th>
         <th>Cust Order Ref</th>
         <th>Order Date</th>
         <th>Required By</th>
         <th>Delivery To</th>
         <th>Order Total</th>
         <th>Currency</th>
         <tbody>
             <tr>
                 <td colspan="10">
                     No Records
                 </td>
             </tr>
         </tbody>
        </table>
    `
    tableDiv.innerHTML = html;
}