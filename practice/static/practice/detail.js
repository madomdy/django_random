var check_result = function(id) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status==200) {
      generated_random = JSON.parse(xmlhttp.responseText)['result'];
      clock.innerHTML = "random is generated";
      document.getElementById("generated_random").innerHTML = generated_random;
    }
  }
  xmlhttp.open("GET", "ajax_result?id=" + id, true);
  xmlhttp.send();
}