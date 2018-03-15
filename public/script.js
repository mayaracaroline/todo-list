(function() {
  var btnAddItem = document.getElementById("button-add-item");
  var numberItem = 1;

  //functions
  function addItem() {
  	//Declarações:
  	var label = document.createElement('label');
  	var checkbox = document.createElement('input');
  	var ul = document.getElementById('container');
  	var li = document.createElement('li');
  	
  	//Atribuições:
  	checkbox.setAttribute('id','checkbox-add-item-' + (numberItem));
  	checkbox.setAttribute('type','checkbox');
  	label.appendChild(checkbox);
  	label.appendChild(document.createTextNode(document.getElementById("input-add-item").value));

  	//Append:
  	//li.appendChild(checkbox);
  	li.appendChild(label);
  	ul.appendChild(li);

  	document.getElementById("input-add-item").value='';
  	numberItem++;
  }

  // on DOM ready...
  var form = document.getElementById('form-add-item');
  function onSubmit(event) {
    event.preventDefault();
    addItem();
  }

  form.addEventListener('submit', onSubmit);
})();

