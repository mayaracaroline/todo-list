(function() {
  // Declarações Globais:
  var ul = document.getElementById('list-container');           
  var form = document.getElementById('form-add-item'); 
  var inputAddItem = document.getElementById('input-add-item'); 
  var btnRemover = document.getElementById("btn-remove-item");
  // Para identificação de cada checkbox criado
  var numberItem = 1;  

  // -------------------------- Functions ---------------------------------------//
  // Função: validateEmptyInput()

  function validateEmptyInput(inputText){
    if(document.getElementById(inputText).value == ''){
      return alert('Ops! :( \nVocê esqueceu informar o item.');
    }
  }

  // Função: addItem()
  // Descrição: Função que cria e adiciona itens a lista.
  function addItem(){
  	var label = document.createElement('label');
  	var checkbox = document.createElement('input');
  	var li = document.createElement('li');
    
  	
  	// Atribuições:
  	checkbox.setAttribute('id','checkbox-add-item-' + (numberItem));
  	checkbox.setAttribute('type','checkbox');
  	label.appendChild(checkbox);
    label.setAttribute('class','item-label');

    if(document.getElementById('input-add-item').value == ''){
      return alert('Ops! :( \nVocê esqueceu informar o item.');
    }

    var spanItemDescription = document.createElement('span');
    spanItemDescription.setAttribute('class','item-description');
    
    spanItemDescription.
        appendChild(
          document.createTextNode(
            document.getElementById("input-add-item").value
            )
          );
  	label.appendChild(spanItemDescription);
                                                              
  	// Append:
  	li.appendChild(label);
  	ul.appendChild(li);
    var checkboxList = ul.querySelectorAll('input');      

    if(checkboxList.length != 0)                           
    {
      btnRemover.style.display = "block";  
    }
  	document.getElementById("input-add-item").value ='';   
  	numberItem++;                                     
    inputAddItem.focus();                                  
  }

// --------------------------------------------------------------------//

  // Função: onSubmit()
  // Descrição: Função que evita o redirect do submit do botão
  function onSubmit(event) {
    event.preventDefault();
    addItem();
  }

  form.addEventListener('submit', onSubmit);

// --------------------------------------------------------------------//

  /* Função: verificaCheckList()
   @description Função que recebe uma lista de inputs checkbox e verifica se 
             há algum flegado
   @param    checklist - Array de checkbox
   @return {bool} True - Se houver algum checkbox flegado
                  False - Caso não encontre nenhum checkbox flegado*/
  function verificaCheckList(checkList){
    for(let i = 0; i < checkList.length; i++){
      var itemCheckbox;
      if(checkList[i].checked){
        itemCheckbox = true;
        break;
      }
      else{
        itemCheckbox = false;
      }
    }//for

    return itemCheckbox;
  }

// --------------------------------------------------------------------//

  // Função: removeItem()
  /* @description Função que cria uma checkboxList e posteriormente itera por ela
     verificando os inputs flegados, caso estejam flegados a 'li' referente aquele
     item é excluída.*/
  function removeItem(){ 
        checkboxList = ul.querySelectorAll('input');
    var liList = ul.querySelectorAll('li');
    // Verifica se há algum checkbox flegado             
    if(verificaCheckList(checkboxList)){
      if (confirm("Deseja excluir estes itens?")) {   
          checkboxList.forEach(function(element,index){
            if(element.checked){
              liList[index].remove();                   
            }
          });
          checkboxList = ul.querySelectorAll('input');  
          if(checkboxList.length == 0){
            btnRemover.style.display = "none";           
          }
      }    
    }
    else{
      alert("Não há itens selecionados");
    }
  }
  btnRemover.onclick = removeItem;
})();