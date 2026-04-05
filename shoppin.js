const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const priceInput = document.getElementById('priceInput');
const sortBtn = document.getElementById('sortBtn');
const shoppingList = document.getElementById('shoppingList');
const totalCostEl = document.getElementById('totalCost');
const clearBtn = document.getElementById('clearBtn');

let total = 0;

function addItem() {
    const itemName = itemInput.value.trim();
    
    if (itemName === "") {
        alert("Please enter an item!");
        return;
    }

    const price = parseFloat(priceInput.value);
    
    if (isNaN(price)) {
        alert("Please enter a valid number for the price.");
        return;
    }

    const existingItems = Array.from(shoppingList.children).map(li => li.querySelector('span').textContent.split(' - ')[0]);
    if (existingItems.includes(itemName)) {
        alert("This item is already in the list!");
        return;
    }
    

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${itemName} - $${price.toFixed(2)}</span>
        <span class="delete-item">✕</span>
    `;

    li.querySelector('.delete-item').addEventListener('click', () => {
        total -= price;
        updateTotal();
        li.remove();
    });

    shoppingList.appendChild(li);
    
    total += price;
    updateTotal();

  
    itemInput.value = "";
    itemInput.focus();
}

function updateTotal() {
    totalCostEl.textContent = total.toFixed(2);
}

addBtn.addEventListener('click', addItem);



clearBtn.addEventListener('click', () => {
    shoppingList.innerHTML = "";
    total = 0;
    updateTotal();
});
sortBtn.addEventListener('click', () => {
    const items = Array.from(shoppingList.children);
    items.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('span').textContent.split(' - $')[1]);
        const priceB = parseFloat(b.querySelector('span').textContent.split(' - $')[1]);
        return priceA - priceB;
    });
    shoppingList.innerHTML = "";
    items.forEach(item => shoppingList.appendChild(item));
});
