// GLOBAL VARIABLES:

// event listeners 
const liztenerAdd = document.getElementById("sendNew").addEventListener("click", addNew);
const liztenerDelete = document.getElementById("deleterButton").addEventListener("click", deleteEntry);
// nicks
const sahaQue = document.getElementById('sahaQueue');
const muokkausQue = document.getElementById('muokkausQueue');
const deletedQue = document.getElementById('deletedQueue');
const errorMSG = document.getElementById('errorMessage');
// arrays for lists
let sahaList = [];
let muokkausList = [];
let deletedList = [];
// here comes the old lists from dataBase
let oldListSaha; 
let oldListMuokkaus;
let oldDeletedList;

// FUNCTIONS:

// set first of list as 1 and rest to follow:
function numberEqualizer(queue){
  for (let i = 0; i < queue.length; i++){
    let newNumber = i + 1;
    let newElement;
    if (queue[i][1] == '.'){
      newElement = queue[i].substring(1);
    } else {
      newElement = queue[i].substring(2);
    }
    newElement = newNumber + newElement;
    queue[i] = newElement;
  }
  return queue;
}

// sort double digit numbers:
function doubleDigsSort(queue){
  for (let index = 0; index < queue.length; index++){
    if (queue[index][1] != '.'){
      queue.push(queue.splice(index, 1)[0]);    
    }
  }  
  return queue;
}

// to avoid dublicated values:
function fixDublicates(queue, qNumber){
  
  const stringed = qNumber.toString();
  const forCompare = stringed + ".";
  let newElement;
  
  for (let i= 0; i < queue.length; i++){
    if (queue[i][0] == forCompare[0] && queue[i][1] == forCompare[1]) {
      
      let newNumber;
      let oneDigit = true;
      
      for (let xx = i; xx < queue.length; xx++){
        // if 0-9
        if (queue[xx][1] === '.'){
          newNumber = parseInt(queue[xx][0]);
          newNumber++;
        } else { 
          // if 10-99
          newNumber = parseInt(queue[xx][0] + queue[xx][1]);
          newNumber++;
          oneDigit = false;
        }
        if (oneDigit === true) {
          newElement = queue[xx].substring(1); 
          newElement = newNumber + newElement; 
        } else {
          newElement = queue[xx].substring(2);   
          newElement = newNumber + newElement; 
          newElement = newElement.toString(); 
          oneDigit = true; // reset
        }
        // replace with updated number:
        queue[xx] = newElement;
      }
    }    
  }
  return queue;
}

// screen refresher
function refresher(list1, list2, list3) {
  // add to elements
  sahaQue.innerHTML = list1;
  muokkausQue.innerHTML = list2;
  deletedQue.innerHTML = list3;
}

// error message deleter:
function deleteMSG(){
  errorMSG.innerHTML = '';
}

// ------------------- entry deleter function ----------------------
// Maybe should add something that after delete others that are left
// get -1 so that all looks nice
function deleteEntry() {
  
  const deleterN = document.getElementById('deleterNumber');
  const onlySahaus = /sahaus./;
  const both = /sahaus ja muokkaus/;
  let selectedList;
  let newNumber;

  if (isNaN(deleterN.value)){
    errorMSG.innerHTML = 'Jononumeroksi ei kelpaa kuin numero!';
    setTimeout(deleteMSG, 5000); 
  } else {
    if (deleterN.value === ''){
      errorMSG.innerHTML = 'Jononumeroruutu ei saa olla tyhjä!';
      setTimeout(deleteMSG, 5000); 
    } else {
      // if sahaList chosen:
      if (document.getElementById('deleterChoose').checked) {
        selectedList = 'sahaus';    
        for (let xx = 0; xx < sahaList.length; xx++){
          // if 0-9
          if (parseInt(sahaList[xx][1]) === NaN){
            newNumber = parseInt(sahaList[xx][0]);
          } else { 
            // if 10-99
            newNumber = parseInt(sahaList[xx][0] + sahaList[xx][1]);
          }
          let newArray = sahaList[xx].substring(1);  
          newArray = newNumber + newArray;
          if (newNumber == deleterN.value) {
            const forDelete = sahaList[xx].concat([]);
            // sahaus and muokkaus: 
            if (sahaList[xx].search('sahaus ja muokkaus') >= 0){
              const numberGrab = forDelete[0] + forDelete[1]
              fixDublicates(muokkausList, numberGrab);
              muokkausList.sort();
              muokkausList.push(forDelete);
              muokkausList.sort();
              doubleDigsSort(muokkausList);
              sahaList.splice(xx, 1);
              numberEqualizer(sahaList);
              numberEqualizer(muokkausList);
              const forShow1 = sahaList.join('<br>');
              const forShow2 = muokkausList.join('<br>');
              const forShow3 = deletedList.join('<br>');
              refresher(forShow1, forShow2, forShow3);
            } else { // sahaus:
              deletedList.push(forDelete);
              sahaList.splice(xx, 1);
              numberEqualizer(sahaList);
              const forShow1 = sahaList.join('<br>');
              const forShow2 = muokkausList.join('<br>');
              const forShow3 = deletedList.join('<br>');
              refresher(forShow1, forShow2, forShow3);
            } 
          }
        }
      }
      // if muokkausList chosen:
      if (document.getElementById('deleterChoose2').checked) {
        selectedList = 'muokkaus'; 
          for (let xx = 0; xx < muokkausList.length; xx++){
          // if 0-9
          if (parseInt(muokkausList[xx][1]) === NaN){
            newNumber = parseInt(muokkausList[xx][0]);
          } else { 
            // if 10-99
            newNumber = parseInt(muokkausList[xx][0] + muokkausList[xx][1]);
          }
          
          let newArray = muokkausList[xx].substring(1);
          newArray = newNumber + newArray;
          if (newNumber == deleterN.value) {
            const forDelete = muokkausList[xx].concat([]);
            deletedList.push(forDelete);    
            muokkausList.splice(xx, 1);
            numberEqualizer(muokkausList);
            const forShow1 = sahaList.join('<br>');
            const forShow2 = muokkausList.join('<br>');
            const forShow3 = deletedList.join('<br>');
            refresher(forShow1, forShow2, forShow3);
          }
        }        
      } // muokkauslist delete ends
    }
  }  
  updateListsInDB();
} // deletelist function ends

// add new job function
function addNew() {
  console.log('addNew fired');
  const newWork = {number: null, queue: null, jobs: null, whoAdded: null, extraNotes: null};
  
  // get values:
  newWork.number = document.getElementById('workNumber').value;
  newWork.queue = document.getElementById('queueNumber').value;
  newWork.notes = document.getElementById('extraNotes').value
  newWork.whoAdded = document.getElementById('sender').value;
  
  if (document.getElementById('choise1').checked) {
    newWork.jobs = document.getElementById('choise1').value;
  }
  if (document.getElementById('choise2').checked) {
    newWork.jobs = document.getElementById('choise2').value;
  }
  if (document.getElementById('choise3').checked) {
    newWork.jobs = document.getElementById('choise3').value;
  }  
  
  // if number and queue are numbers and not empty we continue:
  if (newWork.number > 0 && isNaN(newWork.number) === false &&
      newWork.queue > 0 && isNaN(newWork.queue) === false ) {

    if (newWork.jobs === null) {
      newWork.jobs = 'ei määritelty';
    }
    // make string from information  
    const forAdd = newWork.queue + '. <span class= "orders">Työnumero: </span>' + newWork.number + 
    '. <span class= orders>Tehtävät: </span>' + newWork.jobs +
    '. <span class= "orders">Määräyksen antaja: </span>' + newWork.whoAdded + '. <span class= "orders">Lisätietoja: </span>' 
    + newWork.notes;

    // push to relevant list
    switch (newWork.jobs){
      case 'sahaus':
        sahaList.sort();
        doubleDigsSort(sahaList);
        sahaList = fixDublicates(sahaList, newWork.queue);
        sahaList.sort();
        doubleDigsSort(sahaList);
        sahaList.push(forAdd);
        sahaList.sort();
        doubleDigsSort(sahaList);
        numberEqualizer(sahaList);
      break;
      case 'muokkaus':
        muokkausList.sort();
        doubleDigsSort(muokkausList);
        muokkausList = fixDublicates(muokkausList, newWork.queue);
        muokkausList.sort();
        doubleDigsSort(muokkausList);
        muokkausList.push(forAdd);
        muokkausList.sort();
        doubleDigsSort(muokkausList);
        numberEqualizer(muokkausList);
      break;
      case 'sahaus ja muokkaus':
        sahaList.sort();
        doubleDigsSort(sahaList);
        sahaList = fixDublicates(sahaList, newWork.queue);
        sahaList.sort();
        doubleDigsSort(sahaList);
        sahaList.push(forAdd);
        sahaList.sort();
        doubleDigsSort(sahaList);
        numberEqualizer(sahaList);
      break;  
      default: 
        errorMSG.innerHTML = 'Valitse joko sahaus, muokkaus tai sahaus ja muokkaus!';
        setTimeout(deleteMSG, 5000);
    }
    // arrange list from 1 to last.

    const forShow1 = sahaList.join('<br>');
    const forShow2 = muokkausList.join('<br>');
    const forShow3 = deletedList.join('<br>');
    // add to elements
    refresher(forShow1, forShow2, forShow3);
    //sahaQue.innerHTML = forShow1;
    //muokkausQue.innerHTML = forShow2;
    // clear values from form
    document.getElementById('workNumber').value = '';
    document.getElementById('queueNumber').value = '';
    document.getElementById('extraNotes').value = '';
    document.getElementById('workNumber').value = '';
    document.getElementById('choise1').checked = false;
    document.getElementById('choise2').checked = false;
    document.getElementById('choise3').checked = false;

    // save to database.  
    
  } else { 
    errorMSG.innerHTML = 'Työnumero ja/tai jononumero ei saa olla tyhjä, eikä siellä voi olla kirjaimia myöskään!';
    setTimeout(deleteMSG, 5000);  
  } 
  updateListsInDB();
} // add new action ends

// ---- Ajax request functions: ----------

// update all from database:
function updateListsFromDB(){
  
  const allLists = JSON.stringify({saha: sahaList, muokkaus: muokkausList, deleted: deletedList});
  const http = new XMLHttpRequest();
  const url = '/showAll';
  const params = 'MSG=show';
  // const params = 'MSG=' + allList;
  // console.log("params, allLists: ", params, allLists);
  
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = () => {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
      const newLists = JSON.parse(http.responseText);
      console.log(newLists);
      console.log("sahalist: ", newLists[0][0].sahaList);
      console.log("mlist: ", newLists[1][0].muokkausList);
      console.log("dlist: ", newLists[2][0].deletedList);
      sahaList = newLists[0][0].sahaList;
      muokkausList = newLists[1][0].muokkausList;
      deletedList = newLists[2][0].deletedList;
      const forShow1 = sahaList.join('<br>');
      const forShow2 = muokkausList.join('<br>');
      const forShow3 = deletedList.join('<br>');
      refresher(forShow1, forShow2, forShow3)
    }
  }
  http.send(params);
  // update lists here
}
// update lists of database:
function updateListsInDB(){
  
  const allLists = JSON.stringify({saha: sahaList, muokkaus: muokkausList, deleted: deletedList});
  const http = new XMLHttpRequest();
  const url = '/updateAll';
  const params = 'MSG=' + allLists;
  // console.log("params, allLists: ", params, allLists);
  
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = () => {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
      console.log(http.responseText);
    }
  }
  http.send(params);
}

// ONLOAD:
window.onload = ()=> {
  console.log("onload!");  
  updateListsFromDB();
  if (deletedList.length < 10) {
    deletedList.splice(10, 1);
  }
};
