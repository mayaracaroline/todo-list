(() => {
  // Declarações Globais:
  const ul = document.getElementById('list-container');
  const form = document.getElementById('form-add-item');
  const inputAddItem = document.getElementById('input-add-item');
  const buttonRemove = document.getElementById('btn-remove-item');
  const buttonClose = document.getElementById('close');


  /**
   * @description Mostra notificação de dados salvos.
   *
   */
  function showNotification() {
    document.getElementById('text-notification').style.display = 'inline-block';
    document.getElementById('notification').style.display = 'block';
    document.getElementById('close').style.display = 'flex';
  }

  /**
    * @description Atualiza status de um item marcado no banco de dados
    */

  function updateCompletionStatus(id, checked) {
    fetch(`/todo/update/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        checked,
      }),
    }).then((response) => {
      if (response.status === 200) {
        showNotification();
      }
    });
  }

  /**
   * @description Busca id e status_completion dos itens concluídos
   */

  function updateItems(e) {
    const itemId = e.target.id;
    const isChecked = e.target.checked ? 'true' : 'false';
    updateCompletionStatus(itemId, isChecked);
  }

  /**
   * @description Cria um item.
   */
  function createItem(itemText, id) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const li = document.createElement('li');
    const span = document.createElement('span');

    // Atribuições:
    checkbox.setAttribute('id', id);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'item');
    checkbox.addEventListener('click', updateItems);
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
   *@param {li} item - <li>
   */
  function addItem(item) {
    ul.appendChild(item);
  }

  /**
   * @description Mostra ou esconde o botão de remoção.
   */
  function updateRemoveButton() {
    const checkboxList = ul.querySelectorAll('.item');
    if (checkboxList.length !== 0) {
      buttonRemove.style.display = 'block';
    } else {
      buttonRemove.style.display = 'none';
    }
  }

  /**
   * @description Insere dados referente a um item criado no banco de dados
   */

  function insertItem() {
    fetch('/todo/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: inputAddItem.value,
      }),
    }).then((response) => {
      response.json().then((res) => {
        addItem(createItem(res.description, res.item_id));
        updateRemoveButton();
      });
    });
  }

  /**
   * @description Esconde a notificação
   *
   */
  function hideNotification() {
    document.getElementById('text-notification').style.display = 'none';
    document.getElementById('notification').style.display = 'none';
    document.getElementById('close').style.display = 'none';
  }

  /**
   * @description Atualiza status de um item excluído no banco de dados
   *
   *@param {num} id - Número positivo referente ao id de um item
   *       {boolean} checked - Valor booleano que indica se um item está marcado ou não.
   */
  function updateArchievedStatus(id, checked) {
    fetch(`/todo/archiv/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        checked,
      }),
    }).then((response) => {
      if (response.status === 200) {
        hideNotification();
      }
    });
  }

  /**
   * @description Limpa o campo de texto.
   *
   */
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
    insertItem();
    clearTextInput();
  }

  /**
   * @description Verifica se há algum checkbox flegado.
   *
   * @param {array} checklist - Array de checkbox.
   * @return {boolean} True - Se houver algum checkbox flegado.
   */

  function verifyCheckList(checkList) {
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
    const checkboxList = ul.querySelectorAll('.item');
    const itemList = ul.querySelectorAll('li');
    // eslint-disable-next-line
    if (verifyCheckList(checkboxList) && confirm('Deseja excluir estes itens?')) {
      checkboxList.forEach((element, index) => {
        if (element.checked) {
          const item = {
            item_id: element.id,
            checked: element.checked,
          };
          updateArchievedStatus(item.item_id, item.checked);
          itemList[index].remove();
        }
      });
      updateRemoveButton();
    } else {
      alert('Não há itens selecionados');
    }
  }

  /**
   * @description Busca e cria itens ativos no banco de dados.
   */
  function showActiveItems() {
    fetch('/todo', {
    }).then((response) => {
      response.json().then((parsedResponse) => {
        parsedResponse.forEach((element) => {
          addItem(createItem(element.description, element.item_id));
          if (element.completion_status) {
            document.getElementById(element.item_id).checked = true;
          }
          updateRemoveButton();
        });
      });
    });
  }

  // EventListeners

  buttonClose.addEventListener('click', hideNotification);
  buttonRemove.addEventListener('click', removeItem);
  form.addEventListener('submit', onSubmit);

  // Init functions
  showActiveItems();
  updateRemoveButton();
})();
