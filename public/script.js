(function() {
  // Declarações Globais:
  var ul = document.getElementById('list-container');           
  var form = document.getElementById('form-add-item'); 
  var inputAddItem = document.getElementById('input-add-item'); 
  var btnRemover = document.getElementById("btn-remove-item");
  // Para identificação de cada checkbox criado
  var numberItem = 1;  

  /**
   * @description Cria e adiciona itens a lista.
   */
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
    
    spanItemDescription
      .appendChild(
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

  /** 
   * @description Evita o redirect do submit do botão.
   *
   * @param {event} - submit.
   */
  function onSubmit(event) {
    event.preventDefault();
    addItem();
  }

  form.addEventListener('submit', onSubmit);

  /**
   * @description Verifica se há algum checkbox flegado.
   *
   * @param {array} checklist - Array de checkbox.
   * @return {boolean} True - Se houver algum checkbox flegado.
   */

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
    }

    return itemCheckbox;
  }

  /**
   * @description Cria uma checkboxList e verifica se há inputs flegados e exclui o item.
   */
  function removeItem(){ 
        checkboxList = ul.querySelectorAll('input');
    var itemList = ul.querySelectorAll('li');           
    if(verificaCheckList(checkboxList) && confirm("Deseja excluir estes itens?")){  
      checkboxList.forEach(function(element,index){
        if(element.checked){
          itemList[index].remove();                   
        }
      });
      if(ul.querySelectorAll('li').length == 0){
        btnRemover.style.display = "none";           
      }   
    }
    else{
      alert("Não há itens selecionados");
    }
  }

  btnRemover.onclick = removeItem;
})();