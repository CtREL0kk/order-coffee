document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-button');
    const form = document.querySelector('form');
    const submitButton = document.querySelector('.submit-button')
    const modal = document.querySelector('.modal')
    const closeModal = document.querySelector('.modal-close')
    let drinkCount = 1;

    addButton.addEventListener('click', () => {
        drinkCount++;

        const firstBeverage = document.querySelector('.beverage');
        const newBeverage = firstBeverage.cloneNode(true);
        newBeverage.querySelector('.beverage-count').textContent = `Напиток №${drinkCount}`;

        const radioGroups = newBeverage.querySelectorAll('input[type="radio"]');
        const milkName = `milk${drinkCount}`;
        radioGroups.forEach(radio => {
            radio.name = milkName;
            radio.checked = false;
        });
        if (radioGroups.length > 0) radioGroups[0].checked = true;

        const checkboxes = newBeverage.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);

        const textAreas = newBeverage.querySelectorAll('textarea');
        textAreas.forEach(textArea => textArea.value = '');

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.classList.add('remove-button');
        removeButton.innerHTML = '&#10006;';
        newBeverage.appendChild(removeButton);

        form.insertBefore(newBeverage, addButton.parentElement);

        const newTextArea = newBeverage.querySelector('textarea');
        const output = newBeverage.querySelector('.output');
        output.innerHTML = 'Текст пользователя: ';
        handleTextAreaInput(newTextArea, output);

        updateRemoveButtonState();
    });

    form.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-button')) {
            const beverageFieldset = e.target.closest('fieldset');
            if (document.querySelectorAll('.beverage').length > 1) {
                beverageFieldset.remove();
                updateRemoveButtonState()
            }
        }
    });

    function updateRemoveButtonState() {
        const beverages = document.querySelectorAll('.beverage');
        beverages.forEach(beverage => {
            const removeButton = beverage.querySelector('.remove-button');
            if (beverages.length === 1) {
                removeButton.style.display = 'none';
            } else {
                removeButton.style.display = 'block';
            }
        });
    }

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const beverages = document.querySelectorAll('.beverage');
        const count = beverages.length;

        document.getElementById('drink-count').textContent = `Вы заказали ${count} напиток`;

        const tbody = document.querySelector('#order-table tbody');
        tbody.innerHTML = '';

        beverages.forEach(beverage => {
            const drink = beverage.querySelector('select').selectedOptions[0].textContent;
            const milk = beverage.querySelector('input[type="radio"]:checked').nextElementSibling.textContent;

            const extras = [...beverage.querySelectorAll('input[type="checkbox"]:checked')]
                .map(el => el.nextElementSibling.textContent)
                .join(', ');

            const additions = beverage.querySelector('textarea').value;

            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${drink}</td>
              <td>${milk}</td>
              <td>${extras}</td>
              <td>${additions}</td>
            `;
            tbody.appendChild(row);
        });

        modal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        location.reload();
    });

    function handleTextAreaInput(textArea, output) {
        const urgentWords = ['срочно', 'побыстрее', 'быстрее', 'скорее', 'поскорее', 'очень нужно'];

        function highlightUrgentWords(text) {
            let updatedText = text;
            urgentWords.forEach(word => {
                const regex = new RegExp(`(${word})`, 'gi');
                updatedText = updatedText.replace(regex, '<b>$1</b>');
            });
            return updatedText;
        }

        textArea.addEventListener('input', function () {
            const userInput = textArea.value;
            const highlightedText = highlightUrgentWords(userInput);
            output.innerHTML = 'Текст пользователя: ' + highlightedText;
        });
    }

    const firstTextArea = document.querySelector('.beverage textarea');
    const firstOutput = document.querySelector('.beverage .output');

    handleTextAreaInput(firstTextArea, firstOutput);
});
