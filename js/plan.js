let cards=document.querySelectorAll(".card");
let signOut=document.querySelector(".signout");
let nextbtn=document.querySelector(".next");
let clickedCard = cards[0];
console.log(clickedCard.querySelector(".bi-check-circle-fill"))
selectedCard();
cards.forEach(card=>{
    
    card.addEventListener("click",(e)=>
    {
        unSelectedCard();
        clickedCard=card;
        console.log(clickedCard)
        selectedCard();
    })
})
function selectedCard()
{
    clickedCard.querySelector(".bi-check-circle-fill").classList.remove("d-none")
    clickedCard.querySelector(".card-title").classList.add("text-white");
    clickedCard.querySelector(".card-subtitle").classList.add("text-white");
    clickedCard.querySelector(".card-subtitle").classList.remove("text-body-secondary");
   clickedCard.querySelector(".head").classList.add("gradient");
   
}
function unSelectedCard()
{
    clickedCard.querySelector(".bi-check-circle-fill").classList.add("d-none")
   clickedCard.querySelector(".head").classList.remove("gradient");
   clickedCard.querySelector(".card-title").classList.remove("text-white");
   clickedCard.querySelector(".card-subtitle").classList.remove("text-white");
   clickedCard.querySelector(".card-subtitle").classList.add("text-body-secondary");
}
signOut.addEventListener("click",()=>
{
    localStorage.removeItem("login");
    location.href="index.html";
})
nextbtn.addEventListener("click",()=>{
    location.href="signin.html"
})