const listener1 = document.getElementById('submitLogin').addEventListener("click", submitForm);;

function submitForm() {
  
  console.log("submitForm fired");
  
  const infoboxi = document.getElementById("infoBoxi");
  const passu = document.getElementById("password");
  const password = passu.value;
  
  // clean info box.
  infoboxi.innerHTML = "";

  const http = new XMLHttpRequest();
  const url = '/checkPW';
  const params = 'MSG=' + password;
  
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = () => {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
      const response = http.responseText;
      console.log(http.responseText);
            
      if (response === "ok") {
        console.log("indeed");
        window.location.replace("/index3");
      } 
    }
  }
  http.send(params);
/*  $.ajax({  
          
    url : '/users', 
    data: {"toBeSent" : usePa},
    type: 'post',
    success : function (response) {
  */          
      
    //}
    
  //});  

}   // submit form ends