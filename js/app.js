'use strict';

function getRandomSalary(min,max){
  return Math.floor(Math.random()*(max-min +1)+min);
}
// console.log(getRandomSalary(5,6));

let totalSalary=0;
const totalSpan=document.getElementById('total');
totalSpan.textContent=JSON.parse(localStorage.getItem('total'));

const table=document.getElementById('table');
const submitButton=document.getElementById('submit');
const form=document.getElementById('form');
const empName=document.getElementById('empName');
const empEmail=document.getElementById('empEmail');
const department=document.getElementById('department');

function Employee(name,email,department){
  this.name=name;
  this.email=email;
  this.salary=0;
  this.department=department;

  Employee.all.push(this);
}
Employee.all=[];

if(localStorage.length!==0){
  let pastData=JSON.parse(localStorage.getItem('employee'));
  for (let i = 0; i < pastData.length; i++) {
    Employee.all.push(pastData[i]);
    totalSalary+=pastData[i].salary;
  }
}

submitButton.addEventListener('click',renderData);
function renderData(event){
  event.preventDefault();

  let newEmployee=new Employee();
  newEmployee.name=empName.value;
  newEmployee.email=empEmail.value;
  newEmployee.salary=getRandomSalary(100,500);
  newEmployee.department=department.value;

  // console.log(Employee.all);
  localStorage.setItem('employee',JSON.stringify(Employee.all));

  let trEl=document.createElement('tr');
  table.appendChild(trEl);

  let tdEl1=document.createElement('td');
  trEl.appendChild(tdEl1);
  tdEl1.textContent=newEmployee.name;

  let tdEl2=document.createElement('td');
  trEl.appendChild(tdEl2);
  tdEl2.textContent=newEmployee.email;

  let tdEl3=document.createElement('td');
  trEl.appendChild(tdEl3);
  tdEl3.textContent=newEmployee.department;

  let tdEl4=document.createElement('td');
  trEl.appendChild(tdEl4);
  tdEl4.textContent=newEmployee.salary;
  totalSalary+=newEmployee.salary;

  console.log(totalSalary);
  totalSpan.textContent=totalSalary;
  localStorage.setItem('total',totalSalary);
  form.reset();
}

function getStorageData(){
  if(localStorage.length!==0){
    let storageData=JSON.parse(localStorage.getItem('employee'));
    for (let i = 0; i < storageData.length; i++) {
      let trEl=document.createElement('tr');
      table.appendChild(trEl);

      let tdEl1=document.createElement('td');
      trEl.appendChild(tdEl1);
      tdEl1.textContent=storageData[i].name;

      let tdEl2=document.createElement('td');
      trEl.appendChild(tdEl2);
      tdEl2.textContent=storageData[i].email;

      let tdEl3=document.createElement('td');
      trEl.appendChild(tdEl3);
      tdEl3.textContent=storageData[i].department;

      let tdEl4=document.createElement('td');
      trEl.appendChild(tdEl4);
      tdEl4.textContent=storageData[i].salary;

    }
  }
}

getStorageData();


const clearDataButton=document.getElementById('clearData');
clearDataButton.addEventListener('click',clearAllData);
function clearAllData(){
  localStorage.clear();
  location.reload();
}
