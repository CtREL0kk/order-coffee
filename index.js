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
});
