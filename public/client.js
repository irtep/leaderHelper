// event listener for sender button
const liztenerAdd = document.getElementById("sendNew").addEventListener("click", addNew);
const liztenerDelete = document.getElementById("deleterButton").addEventListener("click", deleteEntry);
const sahaQue = document.getElementById('sahaQueue');
const muokkausQue = document.getElementById('muokkausQueue');
const sahaList = [];
const muokkausList = [];
let oldListSaha; // here comes the old lists from dataBase
let oldListMuokkaus;

function deleteEntry() {
  const deleterN = document.getElementById('deleterNumber');
  let selectedList;
  let newNumber;
  if (isNaN(deleterN.value)){
    console.log("is not number")
  } else {
    if (deleterN.value === ''){
      console.log("is empty");
    } else {
      console.log("number");
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
          // deleterNumber.value
          console.log("newNumber, numberToDelete", newNumber, deleterN.value);
          if (newNumber == deleterN.value) {
            console.log("same value ok");    
            sahaList.splice(xx, 1);
          }
        }
      }
      if (document.getElementById('deleterChoose2').checked) {
        selectedList = 'muokkaus';    
      }
      // delete action here
      /*
      for (let xx = 0; xx < sahaList.length; xx++){
        console.log("checking sahaList: ", sahaList[xx][0]);
        let newNumber = parseInt(sahaList[xx][0]);
        console.log("original array: ", sahaList[xx]);
        let newArray = sahaList[xx].substring(1);
        console.log("newNumber: ", newNumber, "newArray: ", newArray);
        newArray = newNumber + newArray;
        console.log("newArray now: ", newArray);
      }
      */      
    }
  }  
}

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
      default: console.log('cant find newWork.jobs value!');  
    }
    // arrange list from 1 to last.
  
    // if newWork.number overlaps with any number in oldList, modificate oldList to make space
    // can use this for that:
    /*
    for (let xx = 0; xx < sahaList.length; xx++){
      console.log("checking sahaList: ", sahaList[xx][0]);
      let newNumber = parseInt(sahaList[xx][0]);
      newNumber++;
      console.log("original array: ", sahaList[xx]);
      let newArray = sahaList[xx].substring(1);
      console.log("newNumber: ", newNumber, "newArray: ", newArray);
      newArray = newNumber + newArray;
      console.log("newArray now: ", newArray);
    }
    */
    const forShow1 = sahaList.join('<br>');
    const forShow2 = muokkausList.join('<br>');
    // add to elements
    sahaQue.innerHTML = forShow1;
    muokkausQue.innerHTML = forShow2;
    console.log('lists: ', sahaList, muokkausList);
    
    // clear values from form
    document.getElementById('workNumber').value = '';
    document.getElementById('queueNumber').value = '';
    document.getElementById('extraNotes').value = '';
    document.getElementById('workNumber').value = '';
    document.getElementById('choise1').checked = false;
    document.getElementById('choise2').checked = false;
    document.getElementById('choise3').checked = false;

    // save to database.  
    
  } else { console.log("empty fields or not numbers");} 

} // add new action ends

// Onload:
/*
Ajax to get current work list and add it to workQue.innerHTML
and also to oldListSaha and OldListMuokkaus
*/