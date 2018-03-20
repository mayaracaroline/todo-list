(function() {
  //Declarações Globais:
  var ul = document.getElementById('ul-container');             // ul principal que contém todos itens da lista
  var form = document.getElementById('form-add-item');  
  var inputAddItem = document.getElementById('input-add-item'); // input text que recebe valor para inserção na lista
  var btnRemover = document.getElementById("btn-remove-item");  // botão para remoção de itens
  var numberItem = 1;                                           // Para identificação de cada checkbox criado

// -------------------------- Functions ---------------------------------------//
//Função: addItem()
//Descrição: Função que cria e adiciona itens a lista.
  function addItem(){
  	var label = document.createElement('label');
  	var checkbox = document.createElement('input');
  	var li = document.createElement('li');
  	
  	//Atribuições:
  	checkbox.setAttribute('id','checkbox-add-item-' + (numberItem));
  	checkbox.setAttribute('type','checkbox'); 
  	label.appendChild(checkbox); // Insere o input checkbox dentro de uma label
  	label.appendChild(document.createTextNode(
                        document.getElementById("input-add-item").value))
                                                            // Cria um texto com o valor capturado do input text e insere
                                                            // em uma label, tornando a clicável.
  	//Append:
  	li.appendChild(label);
  	ul.appendChild(li);
    var checkboxList = ul.querySelectorAll('input');       // Cria uma lista com todos os checkbox dentro da ul

    
    if(checkboxList.length != 0)                           // Verifica se há algum item na lista, caso não exista o botão de remoção é ocultado 
    {
      btnRemover.style.display = "block"; //Oculta o botão de remoção. 
    }

  	document.getElementById("input-add-item").value ='';   // Remove o valor o input text
  	numberItem++;                                          // Incrementa para concatenação ao id do próximo checkbox criado
    inputAddItem.focus();                                  // Mantém o focus no input após o submit.
  }

// --------------------------------------------------------------------//

//Função: onSubmit()
//Descrição: Função que evita o redirect do submit do botão
  function onSubmit(event) {
    event.preventDefault();
    addItem();
  }

  form.addEventListener('submit', onSubmit);

// --------------------------------------------------------------------//

//Função: verificaCheckList()
//Descrição: Função que recebe uma lista de inputs checkbox e verifica se 
//           há algum flegado
//Parâmetros: checklist - Array de checkbox
//Retornos: True - Se houver algum checkbox flegado
//          False - Caso não encontre nenhum checkbox flegado
  function verificaCheckList(checkList){
    for(let i = 0; i < checkList.length; i++)
    {
      var itemCheckbox;
      if(checkList[i].checked)
      {
        itemCheckbox = true;
        break;                                            // Encerra o loop no primeiro checkbox flegado encontrado. 
      }
      else
      {
        itemCheckbox = false;
      }
    }//for

    return itemCheckbox;
  }

// --------------------------------------------------------------------//

//Função: removeItem()
//Descrição: Função que cria uma checkboxList e posteriormente itera por ela
//verificando os inputs flegados, caso estejam flegados a 'li' referente aquele
//item é excluída.
  function removeItem(){ 
    checkboxList = ul.querySelectorAll('input');
    var liList = ul.querySelectorAll('li');             // Cria uma lista com todos as "li's" existentes nesta 'ul'
    if(verificaCheckList(checkboxList))                 // Verifica se há algum checkbox flegado
    {
      if (confirm("Deseja excluir estes itens?")) 
      {   
          checkboxList.forEach(function(element,index)  
          {
            if(element.checked)
            {
              liList[index].remove();                   //Remove a 'li' referente ao checkbox clicado.
            }
          });

          checkboxList = ul.querySelectorAll('input');  // Cria uma lista com todos os checkbox dentro da ul
        
          if(checkboxList.length == 0)                  //Verifica se há algum item na lista
          {
            btnRemover.style.display = "none";          // Oculta o botão de remoção caso não haja itens 
          }
      }    
    }
    else
    {
      alert("Não há itens selecionados");
    }
  }

btnRemover.onclick = removeItem;                        //Adiciona a função removeItem() ao botão de remoção.

})();

