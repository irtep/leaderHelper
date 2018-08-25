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
const sahaList = [];
const muokkausList = [];
const deletedList = [];
// here comes the old lists from dataBase
let oldListSaha; 
let oldListMuokkaus;
let oldDeletedList;

// FUNCTIONS:

// sort selected queue
function sortQueue(queue){
  let newList;
  return newList;
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

// entry deleter function
function deleteEntry() {
  
  const deleterN = document.getElementById('deleterNumber');
  let selectedList;
  let newNumber;

  if (isNaN(deleterN.value)){
    errorMSG.innerHTML = 'Jononumeroksi ei kelpaa kuin numero!';
    setTimeout(deleteMSG, 5000); 
  } else {
    if (deleterN.value === ''){
      errorMSG.innerHTML = 'Jononumeroksi ei saa olla tyhjä!';
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
            deletedList.push(forDelete);
            sahaList.splice(xx, 1);
            const forShow1 = sahaList.join('<br>');
            const forShow2 = muokkausList.join('<br>');
            const forShow3 = deletedList.join('<br>');
            refresher(forShow1, forShow2, forShow3);
            console.log("deletedList: ", deletedList);
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
          // deleterNumber.value
          console.log("newNumber, numberToDelete", newNumber, deleterN.value);
          if (newNumber == deleterN.value) {
            const forDelete = muokkausList[xx].concat([]);
            deletedList.push(forDelete);    
            muokkausList.splice(xx, 1);
            const forShow1 = sahaList.join('<br>');
            const forShow2 = muokkausList.join('<br>');
            const forShow3 = deletedList.join('<br>');
            refresher(forShow1, forShow2, forShow3);
          }
        }        
      } // muokkauslist delete ends
    }
  }  
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
    
    // also check that all are in order and without empty spaces and fix if needed.
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
        sahaList.push(forAdd);
      break;
      case 'muokkaus':
        muokkausList.push(forAdd);
      break;
      case 'sahaus ja muokkaus':
        sahaList.push(forAdd);
      break;  
      default: 
        console.log('cant find newWork.jobs value!');
        errorMSG.innerHTML = 'Valitse joko sahaus, muokkaus tai sahaus ja muokkaus!';
        setTimeout(deleteMSG, 5000);
    }
    // arrange list from 1 to last.
    console.log("sahaList/muokkausList", sahaList, muokkausList);  
    // if newWork.number overlaps with any number in oldList, modificate oldList to make space
    // can use this for that:

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
    console.log("empty fields or not numbers");
    errorMSG.innerHTML = 'Työnumero ja/tai jononumero ei saa olla tyhjä, eikä siellä voi olla kirjaimia myöskään!';
    setTimeout(deleteMSG, 5000);  
  } 

} // add new action ends

// ONLOAD:

window.onload = ()=> {
  console.log("onload!");
};
/*
Ajax to get current work list and add it to workQue.innerHTML
and also to oldListSaha and OldListMuokkaus and oldDeletedList
*/