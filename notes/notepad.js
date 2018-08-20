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