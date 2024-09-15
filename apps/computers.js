const computersShow = () => {
    let cardsContainer = document.createElement("section");
    cardsContainer.classList.add("cardsContainer");

    let totalContainer = document.createElement("div");
    totalContainer.classList.add("totalContainer");
    totalContainer.innerHTML=`
        <h3>Total :  <span class="totalValue"></span> </h3>
    `;

    cardsContainer.appendChild(totalContainer);

    const calculateTotal = () => {
        let total = 0;
        let totalValue= document.querySelector(".totalValue");
        computersData.forEach((item) => {
            const savedValue = localStorage.getItem(`computers-${item.id}`) || item.piece;
            total += parseInt(savedValue, 10);
        });
        totalValue.innerHTML = total;
    };

    computersData.forEach((item) => {
        let card = document.createElement("div");
        card.classList.add("card");

        const savedValue = localStorage.getItem(`computers-${item.id}`) || item.piece;

        card.innerHTML = `
            <span class="itemNumber">${item.id}</span>
            <h3>${item.itemName}</h3>
            <input type="number" id="input-${item.id}" value="${savedValue}">
        `;

        cardsContainer.appendChild(card);

        const inputField = card.querySelector(`#input-${item.id}`);
        inputField.addEventListener('input', () => {
            localStorage.setItem(`computers-${item.id}`, inputField.value);
            calculateTotal();
        });
    });

    mainContent.appendChild(cardsContainer);

    calculateTotal();
}

computers.addEventListener("click", () => {
    mainContent.innerHTML = "";
    computersShow();
});
