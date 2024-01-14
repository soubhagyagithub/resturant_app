const tableMapping = {
    table1: 'list1',
    table2: 'list2',
    table3: 'list3',
};

function displayOrderData(orderDetails, targetTable) {
    const ul = document.getElementById(tableMapping[targetTable]);
    const li = document.createElement('li');

    li.textContent = orderDetails.price + "-" + orderDetails.dish + "- " + orderDetails.table;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        axios.delete(`https://crudcrud.com/api/64b436d153d343ec9b459a50e8e061e8/OrderData/${orderDetails._id}`)
            .then(() => {
                ul.removeChild(li);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    li.appendChild(deleteButton);
    ul.appendChild(li);
}

document.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/64b436d153d343ec9b459a50e8e061e8/OrderData")
        .then((res) => {
            console.log(res);
            for (let i = 0; i < res.data.length; i++) {
                displayOrderData(res.data[i], res.data[i].table);
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

function handlerFormSubmit(event) {
    event.preventDefault();

    const price = event.target.price.value;
    const dish = event.target.dish.value;
    const table = event.target.table.value;

    const orderDetails = {
        price: price,
        dish: dish,
        table: table,
    }

    axios.post("https://crudcrud.com/api/64b436d153d343ec9b459a50e8e061e8/OrderData", orderDetails)
        .then((res) => {
            displayOrderData(res.data, table);
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong</h4>';
            console.log(err);
        });
}
