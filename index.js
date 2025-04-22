document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-button');
    const form = document.querySelector('form');
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
        form.insertBefore(newBeverage, addButton.parentElement);
    });

    submitButton = document.querySelector('.submit-button')
    modal = document.querySelector('.modal')
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        const beverages = document.querySelectorAll('.beverage');
        const count = beverages.length;

        const drinkCountText = getDrinkCountText(count);
        document.getElementById('drink-count').textContent = `Вы заказали ${drinkCountText}`;

        const tbody = document.querySelector('#order-table tbody');
        tbody.innerHTML = '';

        beverages.forEach(beverage => {
            const drink = beverage.querySelector('select').selectedOptions[0].textContent;

            const milkInput = beverage.querySelector('input[type="radio"]:checked');
            const milk = milkInput ? milkInput.nextElementSibling.textContent : '';

            const extras = [...beverage.querySelectorAll('input[type="checkbox"]:checked')]
                .map(el => el.nextElementSibling.textContent)
                .join(', ');

            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${drink}</td>
              <td>${milk}</td>
              <td>${extras}</td>
            `;
            tbody.appendChild(row);
        });

        modal.classList.remove('hidden');
    });

    function getDrinkCountText(count) {
        const lastDigit = count % 10;
        const lastTwo = count % 100;
        if (lastDigit === 1 && lastTwo !== 11) return `${count} напиток`;
        if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwo)) return `${count} напитка`;
        return `${count} напитков`;
    }
    closeModal = document.querySelector('.modal-close')
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        location.reload();
    });
});



