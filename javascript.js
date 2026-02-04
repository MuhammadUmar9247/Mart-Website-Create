var isEnglish = true;

setInterval(function () {
    var name = document.getElementById("storeName");

    if (isEnglish) {
        name.innerText = "پرائم مارٹ";
        isEnglish = false;
    } else {
        name.innerText = "Prime Mart";
        isEnglish = true;
    }
}, 1000);


const likeButtons = document.querySelectorAll('.like-btn');
likeButtons.forEach((btn)=>{
let count = 0;
const likeCount = btn.nextElementSibling;
btn.addEventListener('click', ()=>{
count++;
likeCount.innerText = `Likes: ${count}`;
});
});

function searchProduct() {

    let input = document.getElementById("searchInput").value.toLowerCase().trim();
    let cards = document.querySelectorAll(".card");
    let message = document.getElementById("notFoundMessage");

    let found = false;

    cards.forEach(function(card) {

        let title = card.querySelector("h2").textContent.toLowerCase();

        if (title.includes(input) && input !== "") {
            card.style.display = "block";
            found = true;
        } else {
            card.style.display = "none";
        }

    });

    if (!found) {
        message.style.display = "block";
    } else {
        message.style.display = "none";
    }
}

/* Search when pressing Enter key */
document.getElementById("searchInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searchProduct();
    }
});
 
// product list
document.getElementById("addBtn").addEventListener("click", function(){

    let name = document.getElementById("name").value;
    let price = Number(document.getElementById("price").value);
    let qty = Number(document.getElementById("qty").value);

    if(!name || !price || !qty){
        alert("Fill all fields");
        return;
    }

    let total = price * qty;

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${price}</td>
        <td>${qty}</td>
        <td>${total}</td>
        <td><button class="remove">X</button></td>
    `;

    document.getElementById("billBody").appendChild(row);

    updateGrandTotal();

    row.querySelector(".remove").addEventListener("click", function(){
        row.remove();
        updateGrandTotal();
    });

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("qty").value = "";
});

function updateGrandTotal(){
    let rows = document.querySelectorAll("#billBody tr");
    let grand = 0;

    rows.forEach(row => {
        grand += Number(row.children[3].innerText);
    });

    document.getElementById("grandTotal").innerText = grand;
}
