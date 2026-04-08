const $ = id => document.getElementById(id);

const itemInput    = $('itemInput');
const priceInput   = $('priceInput');
const addBtn       = $('addBtn');
const sortBtn      = $('sortBtn');
const clearBtn     = $('clearBtn');
const shoppingList = $('shoppingList');
const totalCostEl  = $('totalCost');


let items = [];

function render() {
    shoppingList.innerHTML = '';
    let total = 0;

    items.forEach((item, index) => {
        total += item.price;
        
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button class="delete-btn" data-index="${index}">✕</button>
        `;
        shoppingList.appendChild(li);
    });

    totalCostEl.textContent = total.toFixed(2);
}

function addItem() {
    const name = itemInput.value.trim();
    const price = parseFloat(priceInput.value);

    if (!name || isNaN(price)) {
        alert("Enter a valid name and price!");
        return;
    }

    if (items.some(i => i.name.toLowerCase() === name.toLowerCase())) {
        alert("That's already on the list.");
        return;
    }

    items.push({ name, price });
    render();

    itemInput.value = '';
    priceInput.value = '';
    itemInput.focus();
}

shoppingList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        items.splice(index, 1);
        render();
    }
});

sortBtn.addEventListener('click', () => {
    items.sort((a, b) => a.price - b.price);
    render();
});

clearBtn.addEventListener('click', () => {
    if (confirm("Clear the whole list?")) {
        items = [];
        render();
    }
});

addBtn.addEventListener('click', addItem);
