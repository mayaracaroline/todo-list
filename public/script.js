(() => {
  /**
   * @description Cria um item.
   */
  function createItem(itemText, id) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const li = document.createElement('li');
    const span = document.createElement('span');

    // Atribuições:
    checkbox.setAttribute('id', `checkbox-add-item-${id}`);
    checkbox.setAttribute('type', 'checkbox');
    label.setAttribute('class', 'item-label');
    span.setAttribute('class', 'item-description');

    // Append:
    label.appendChild(checkbox);
    span.appendChild(document.createTextNode(itemText));
    label.appendChild(span);
    li.appendChild(label);

    return li;
  }

  /**
   * @description Adiciona itens a lista.
   *
   *@param {li}
   */
  function addItem(item) {
    ul.appendChild(item);
  }

  /**
   * @description Mostra ou esconde o botão de remoção.
   */
  function updateRemoveButton() {
    const checkboxList = ul.querySelectorAll('input');

    if (checkboxList.length !== 0) {
      buttonRemove.style.display = 'block';
    } else {
      buttonRemove.style.display = 'none';
    }
  }

  function clearTextInput() {
    inputAddItem.value = '';
    inputAddItem.focus();
  }

  /**
   * @description Evita o redirect do submit do botão,
   * verifica se o input está vazio.
   *
   * @param {event} - submit.
   */

  function onSubmit(event) {
    event.preventDefault();

    if (inputAddItem.value === '') {
      alert('Ops! :( \nVocê esqueceu informar o item.');
      return;
    }

    addItem(createItem(inputAddItem.value));
    updateRemoveButton();
    clearTextInput();
  }

  /**
   * @description Verifica se há algum checkbox flegado.
   *
   * @param {array} checklist - Array de checkbox.
   * @return {boolean} True - Se houver algum checkbox flegado.
   */

  function verifyCheckList(checkList, options) {
    let itemCheckbox;
    for (let i = 0; i < checkList.length; i += 1) {
      if (checkList[i].checked) {
        itemCheckbox = true;
        break;
      } else {
        itemCheckbox = false;
      }
    }

    return itemCheckbox;
  }

  /**
   * @description Cria uma checkboxList e verifica se há inputs flegados e exclui o item.
   */
  function removeItem() {
    const checkboxList = ul.querySelectorAll('input');
    const itemList = ul.querySelectorAll('li');
    // eslint-disable-next-line
    if (verifyCheckList(checkboxList) && confirm('Deseja excluir estes itens?')) {
      checkboxList.forEach((element, index) => {
        if (element.checked) {
          itemList[index].remove();
        }
      });
      updateRemoveButton();
    } else {
      alert('Não há itens selecionados');
    }
  }

  function getActiveItems(){
    fetch('/todo', {
    //method: 'POST'
    }).then(response => {
       response.json().then(parsedResponse => {
        parsedResponse.forEach((element) => {
          addItem(createItem(element.description,element.item_id));
        });
      });
    }).catch(error => {});
  }


  // Declarações Globais:
  const ul = document.getElementById('list-container');
  const form = document.getElementById('form-add-item');
  const inputAddItem = document.getElementById('input-add-item');
  const buttonRemove = document.getElementById('btn-remove-item');
  // Para identificação de cada checkbox criado
  let numberItem = 1;

  buttonRemove.addEventListener('click', removeItem);
  form.addEventListener('submit', onSubmit);

  getActiveItems();
})();
