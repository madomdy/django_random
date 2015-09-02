
function onmouseenter_create(){
    document.getElementById("create").style.backgroundColor ="#4C7A34";
};
function onmousout_create(){
    document.getElementById("create").style.backgroundColor ="#92D36E";
};
function onmouseenter_history(){
    document.getElementById("history").style.backgroundColor ="#4C7A34";
};
function onmousout_history(){
    document.getElementById("history").style.backgroundColor ="#92D36E";
};
function onmouseenter_about(){
    document.getElementById("about").style.backgroundColor ="#4C7A34";
};
function onmousout_about(){
    document.getElementById("about").style.backgroundColor ="#92D36E";
};
function pressed_string(){
 var p1 = document.getElementById("p1");
 p1.innerHTML='<p class = "query_info"><textarea name="string_form" cols="60" rows="5" id="string_form" maxlength="1900"></textarea></p>';
 document.getElementById("p2").innerHTML = "Here you need to enter a few lines of the text. You will randomly get one of the lines. Foe examle,<br> test1<br>test2<br>test3<br> it will choose one of them with the same probability.";
  document.getElementById("string_from").style.backgroundColor="green";
   document.getElementById("integer").style.backgroundColor="#92D36E";
    document.getElementById("real_number").style.backgroundColor="#92D36E";
     document.getElementById("true_or_false").style.backgroundColor="#92D36E";

};
function pressed_real(){
 var p1 = document.getElementById("p1");
 p1.innerHTML='<p class="query_info">from<input type="number" step="any" name="real_from_number" value="1" id="real_from_number" /><br>to&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="number" step="any" name="real_to_number" value="100" id="real_to_number"/></br>with accuracy<input type="number" name="real_accur" value="2" id="real_accur" min="0" max="10"/></p>';
 

 document.getElementById("p2").innerHTML = "Real number - is a number that has the fractional part. for example, if you type in 'from 1 to 3 with accuracy 3' you will get a number with 3  signs after fractional point: 2,001 or something like this";
  document.getElementById("real_number").style.backgroundColor="green";
  document.getElementById("integer").style.backgroundColor="#92D36E";
  document.getElementById("string_from").style.backgroundColor="#92D36E";
  document.getElementById("true_or_false").style.backgroundColor="#92D36E";
};
function pressed_int(){

  var p1 = document.getElementById("p1");
  p1.innerHTML='	<p class = "query_info" id="p1">from<input type="number" name="integer_from_number" value="1" id="integer_from_number" />to <input type="number" name="integer_to_number" value="100" id="integer_to_number" /></p>';
    var p2 = document.getElementById("p2").innerHTML = "	An integer is a number that can be written without a fractional component. For example, if you type in 'from 1 to 3' you will get 1, 2 or 3 with the same probability for each. You can enter the numbers or you can use arrows to choose the number that you need .";
    document.getElementById("integer").style.backgroundColor="green";
    document.getElementById("string_from").style.backgroundColor="#92D36E";
    document.getElementById("real_number").style.backgroundColor="#92D36E";
    document.getElementById("true_or_false").style.backgroundColor="#92D36E";
};
function pressed_tf(){
var filling = document.getElementById("filling1");
var p1 = document.getElementById("p1");
 p1.innerHTML = '<p id = "for_tf"> You do not need to enter anything in this section. As the button says, you can get only two values: true (that equals to yes) and false(that equals to no) with the same probability<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></p> ';
  document.getElementById("true_or_false").style.backgroundColor="green";
  document.getElementById("integer").style.backgroundColor="#92D36E";
  document.getElementById("string_from").style.backgroundColor="#92D36E";
  document.getElementById("real_number").style.backgroundColor="#92D36E";
};