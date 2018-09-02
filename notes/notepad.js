        /*
const xmlhttp = new XMLHttpRequest();
const url = '/showAll';

xmlhttp.onreadystatechange = () => {
    if (this.readyState == 4 && this.status == 200) {
        const myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    }
};
xmlhttp.open("POST", url, true);
xmlhttp.send();

function myFunction(arr) {
    const out = "";
    const i;
    for(i = 0; i < arr.length; i++) {
        out += '<a href="' + arr[i].url + '">' + 
        arr[i].display + '</a><br>';
    }
    document.getElementById("id01").innerHTML = out;
}
        */

// database save:

/*
// for save:

    var newSahaList = new sahaListModel({ sahaList: ['1. <span class= \"orders\">Työnumero: </span>21333.'+ 
    '<span class= orders>Tehtävät: </span>sahaus. <span class= \"orders\">Määräyksen antaja: </span>keke.'+
    '<span class= \"orders\">Lisätietoja: </span>testi1","2. <span class= \"orders\">Työnumero: </span>2341.'+ 
    '<span class= orders>Tehtävät: </span>sahaus ja muokkaus. <span class= \"orders\">Määräyksen antaja:'+
    '</span>keke. <span class= \"orders\">Lisätietoja: </span>","3. <span class= \"orders\">Työnumero:'+
    '</span>431431. <span class= orders>Tehtävät: </span>sahaus ja muokkaus. <span class= \"orders\">'+
    'Määräyksen antaja: </span>keke. <span class= \"orders\">Lisätietoja: </span>'] });

    newSahaList.save(function (err) {
      console.log("db save function fires");         
        if (err) console.log(err);
    }); 
    var newMuokkausList = new muokkausModel({ muokkausList: ['1. <span class= \"orders\">Työnumero: </span>231431.'+ 
    '<span class= orders>Tehtävät: </span>muokkaus. <span class= \"orders\">Määräyksen antaja: </span>keke.'+ 
    '<span class= \"orders\">Lisätietoja: </span>","2. <span class= \"orders\">Työnumero: </span>431341.' +
    '<span class= orders>Tehtävät: </span>muokkaus. <span class= \"orders\">Määräyksen antaja: </span>keke.'+ 
    '<span class= \"orders\">Lisätietoja: </span>","3. <span class= \"orders\">Työnumero: </span>341432.' +
    '<span class= orders>Tehtävät: </span>muokkaus. <span class= \"orders\">Määräyksen antaja: </span>keke.'+ 
    '<span class= \"orders\">Lisätietoja: </span>","4. <span class= \"orders\">Työnumero: </span>32143.'+ 
    '<span class= orders>Tehtävät: </span>muokkaus. <span class= \"orders\">Määräyksen antaja: </span>keke.'+ 
    '<span class= \"orders\">Lisätietoja: </span>","5. <span class= \"orders\">Työnumero: </span>34121.'+ 
    '<span class= orders>Tehtävät: </span>muokkaus. <span class= \"orders\">Määräyksen antaja: </span>keke.'+ 
    '<span class= \"orders\">Lisätietoja: </span>'] });

    newMuokkausList.save(function (err) {
      console.log("db save function fires");         
        if (err) console.log(err);
    }); 
    var newDeletedList = new deletedModel({ deletedList: ['1. <span class= \"orders\">Työnumero: </span>231431.'+ 
    '<span class= orders>Tehtävät: </span>muokkaus. <span class= \"orders\">Määräyksen antaja: </span>keke.'+
    '<span class= \"orders\">Lisätietoja: </span>'] });

    newDeletedList.save(function (err) {
      console.log("db save function fires");         
        if (err) console.log(err);
    });     

*/