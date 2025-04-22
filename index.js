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

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.classList.add('remove-button');
        removeButton.innerHTML = '&#10006;';
        newBeverage.appendChild(removeButton);

        form.insertBefore(newBeverage, addButton.parentElement);
        updateRemoveButtonState();
    });

    form.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-button')) {
            const beverageFieldset = e.target.closest('fieldset');
            if (document.querySelectorAll('.beverage').length > 1) {
                beverageFieldset.remove();
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

    updateRemoveButtonState();
});
