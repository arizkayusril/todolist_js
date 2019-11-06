// Declare All 
let DOMStrings = {
    input: document.getElementById('todo-input'),
    btnAdd: document.getElementById('todo-btn-add'),
    btnDel: document.getElementById('todo-btn-del'),
    listItems: document.getElementById('todo-list-items'),
    alert: document.getElementById('alert'),
    countTodoCompleted: document.getElementById('number'),
}


let renderItems = () => {
    DOMStrings.listItems.innerHTML = '';
    var ac;
    items.data.map((item, index) => {
        if (item.check) {
            ac = `
            <li class="list-group-item" index="${index}">
            <div class="form-check">
            <input type="checkbox" class="form-check-input" checked onchange="onChecked(this);">
            <label class="form-check-label"><strike>${item.name}</strike></label>
            </div>
            <span onclick="btnDel(this);">X</span>
            </li>
            `
        } else {
            ac = `
            <li class="list-group-item" index="${index}">
            <div class="form-check">
            <input type="checkbox" class="form-check-input" onchange="onChecked(this);">
            <label class="form-check-label">${item.name}</label>
            </div>
            <span id="btnDelete" value="1" onclick="btnDel(this);">X</span>
            </li>`
        }
        DOMStrings.listItems.innerHTML += ac;
    })
}

let count = () => {
    var number = 0;
    for (index in items.data) {
        if (items.data[index].check) {
            number++;
        } 
    }        
    items.completed = number;
    DOMStrings.countTodoCompleted.innerHTML = number;
}


// Create a "close" button and append it to each list item
var btnDel = (e) => {
    const index = e.parentElement.getAttribute("index");

    // remove ui
    e.parentElement.remove();

    // remove data
    items.data.splice(index, 1);

    // set ulang localstorage
    localStorage.setItem('items', JSON.stringify(items));
    
    count();
    
}



// Add a "checked" symbol when clicking on a list item
let onChecked = (e) => {
    const index = e.parentElement.parentElement.getAttribute("index");
    if (!items.data[index].check) {
        items.data[index].check = true;
    } else {
        items.data[index].check = false;
    }
    count();
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
}


// Create a new list item when clicking on the "Add" button
let items;
if (localStorage.getItem('items')) {
    items = JSON.parse(localStorage.getItem('items'))
} else {
    items = {
        completed: 0,
        data: [
            {
                name: 'Dolanan Coding',
                check: false
            },
            {
                name: "Tilawah Al-Qur'an",
                check: false
            },
            {
                name: 'Kajian Aqidah',
                check: false
            },
            {
                name: 'Kajian Fikih',
                check: false
            }
        ]
    };
}

renderItems();
count();
DOMStrings.btnAdd.addEventListener('click', () => {
    if (DOMStrings.input.value) {
        DOMStrings.alert.classList.add('d-none');
        items.data.push({
            name: DOMStrings.input.value,
            check: false
        });
        localStorage.setItem('items', JSON.stringify(items));
        DOMStrings.input.value = '';
        renderItems();
    } else {
        alert("You must write something!");
    }
});



