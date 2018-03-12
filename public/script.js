var btnAddItem = document.getElementById("button-add-item");
var numberItem = 1;

//functions
function addItem() {
	//Declarações:
	var valueInput = document.getElementById("input-add-item").value;
	var label = document.createElement('label');
	var checkbox = document.createElement('input');
	var ul = document.getElementById('container');
	var li = document.createElement('li');
	
	//Atribuições:
	checkbox.setAttribute('id','checkbox-add-item-' + (numberItem));
	checkbox.setAttribute('type','checkbox');
	label.setAttribute('for','checkbox-add-item-' + (numberItem));
	label.innerHTML = valueInput;

	//Append:
	li.appendChild(checkbox);
	li.appendChild(label);
	ul.appendChild(li);

	document.getElementById("input-add-item").value='';
	numberItem++;
}

// on DOM ready...
var form = document.getElementById('form-add-item');
function onSubmit(event) {
    if (event) { event.preventDefault(); }
    // do AJAX stuff 
    console.log('submitted');
}

form.addEventListener('submit', onSubmit, false);
form.submit = onSubmit;
console.log(urlEncodeFormData(form));

function urlEncodeFormData(form) {
    var i, e, data = [];
    for (i = 0; i < form.elements.length; i++) {
        e = form.elements[i];
        if (e.type !== 'button' && e.type !== 'submit') {
        	data.push(encodeURIComponent(e.id) + '=' + encodeURIComponent(e.value)); 
        }
    };
    return data.join('&');
}