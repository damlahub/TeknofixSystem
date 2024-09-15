const StockShow = () => {
    let cardsContainer = document.createElement("section");
    cardsContainer.classList.add("cardsContainer");

    let totalContainer = document.createElement("div");
    totalContainer.classList.add("totalContainer");
    totalContainer.innerHTML=`
        <h3>Total :   <span class="totalValue"></span> </h3>
    `;
    cardsContainer.appendChild(totalContainer);

    const calculateTotal = () => {
        let total = 0;
        let totalValue= document.querySelector(".totalValue");
        stockData.forEach((item) => {
            const savedValue = localStorage.getItem(`stock-${item.id}`) || item.piece;
            total += parseInt(savedValue, 10);
        });
        totalValue.innerHTML = total;
    };

    stockData.forEach((item) => {
        let card = document.createElement("div");
        card.classList.add("card");

        const savedValue = localStorage.getItem(`stock-${item.id}`) || item.piece;

        card.innerHTML = `
            <span class="itemNumber">${item.id}</span>
            <h3>${item.itemName}</h3>
            <input type="number" id="input-${item.id}" value="${savedValue}">
        `;

        cardsContainer.appendChild(card);

        const inputField = card.querySelector(`#input-${item.id}`);
        inputField.addEventListener('input', () => {
            localStorage.setItem(`stock-${item.id}`, inputField.value);
            calculateTotal();
        });
    });

    mainContent.appendChild(cardsContainer);

    calculateTotal();
}

stock.addEventListener("click", () => {
    mainContent.innerHTML = "";
    StockShow();
});