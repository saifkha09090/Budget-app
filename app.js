const mon = document.getElementById("month");
const dt = document.getElementById("dt");
const year = document.getElementById("year");
function dateFormat() {
  let date = new Date();
  let months = date.getMonth();
  let datenum = date.getDate();
  let fullYear = date.getFullYear();
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  mon.innerHTML = monthNames[months];
  dt.innerHTML = datenum;
  year.innerHTML = fullYear;
}
dateFormat();




const budInp = document.getElementById("bud-inp");
const addBudBtn = document.getElementById("bud-form");
const totalBud = document.getElementById("bud-total");
const description = document.getElementById("description");
const expNumInp = document.getElementById("exp-num-inp");
const expDateInp = document.getElementById("exp-date-inp");
const budError = document.getElementById("bud-error");
const expError = document.getElementById("exp-error");
const addExpBtn = document.getElementById("exp-form");
const expTotal = document.getElementById("exp-total");
const balance = document.getElementById("balance");
const list = document.getElementById("list");

const localStorages = JSON.parse(localStorage.getItem("sum"));
let sum = (localStorage.getItem("sum") !== null) ? localStorages :0;


function addBud() {
  if (budInp.value === "") {
    budError.classList.remove("hide");
  }else {
    budError.classList.add("hide");
    let num = +budInp.value;
    sum += num;
    totalBud.innerHTML = `$${sum.toFixed(2)}`;
    localStorage.setItem("sum",JSON.stringify(sum));
    updateValue();
    budInp.value = "";
  }
  
}
addBudBtn.addEventListener("click", addBud);

const localStorageTransactions = JSON.parse(localStorage.getItem("transactionlist"));

let transactionlist = localStorage.getItem("transactionlist") !== null ? localStorageTransactions : [];

let expPlus = 0;

function addTransactions() {
  if (!expNumInp.value || !description.value || !expDateInp.value) {
    expError.classList.remove("hide");
  } else {
    expError.classList.add("hide");

    const listObj = {
      id: generateId(),
      description: description.value,
      expNumInp: +expNumInp.value,
      expDateInp: expDateInp.value,
    };
    transactionlist.push(listObj);
    addExplist(listObj);
    updateLocalStorage();
    updateValue();
    description.value = "";
    expNumInp.value = "";
    expDateInp.value = "";
  }
}

function generateId() {
  return Math.floor(Math.random() * 10000000000);
}


function addExplist(transaction) {
  const expItems = document.createElement("li");
  expItems.id = "exp-item";
    expItems.className = "list-box";
  expItems.innerHTML = `<span class="descrip">${
    transaction.description
  }</span><span class="expnum">$${transaction.expNumInp.toFixed(2)}</span><span>${
    transaction.expDateInp
  }</span
    ><button class="fa-solid fa-trash-can" onclick="deleteBtn(${
        transaction.id
      })"></button
    >`;
  list.appendChild(expItems);
  
}


function updateValue() {
  const amounts = transactionlist.map((transaction) => transaction.expNumInp);

  const expense = amounts
    .filter((expItems) => expItems > 0)
    .reduce((val, expItems) => (val += expItems), 0);
  expTotal.innerText = `$${expense.toFixed(2)}`;
  let expBud = sum - expense;
  balance.innerHTML = `$${expBud.toFixed(2)}`;
}

function deleteBtn(id) {
  transactionlist = transactionlist.filter(
    (transaction) => transaction.id !== id
  );
  updateLocalStorage();
  insertList();
}


function updateLocalStorage(){
  localStorage.setItem("transactionlist",JSON.stringify(transactionlist));
}

function insertList() {
  list.innerHTML = "";
  transactionlist.forEach(addExplist);
  updateValue();
}
insertList();

addExpBtn.addEventListener("click", addTransactions);
