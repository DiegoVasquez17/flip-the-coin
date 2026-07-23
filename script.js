// Declaration of the HTML elements we'll use in the script
const coin = document.querySelector(".img-container"); 
const heads = coin.children[0]; // img with class "heads"
const tails = coin.children[1]; // img with class "tails"
const txtResult = document.querySelector(".result")
const shadow = document.querySelector(".shadow");
const btnFlip = document.getElementById("flip-button");

let spins; // it will store the random spins calculated every button click
let isHeads = true;
// since it is a boolean variable, its function will be to determine the state 
// of the coin.
// -    heads = true
// -    tails = false
// And we initiate it with heads;

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Main method to calculate the duration and spins, and start the
// coin spinning animation.
function flipCoin(){

    // Condition that must be met to execute the whole funtion block.
    // It will prevent the animation to trigger while the coin is
    // already spinning.
    if (!btnFlip.disabled){

        let duration = randomBetween(2, 4);
        spins = randomBetween(20, 50);
        // spins has a different scope to duration, since spins needs
        // to be used outside of this function too.
        coin.style.setProperty("--spins", spins)
        shadow.style.setProperty("--spins", spins)

        heads.style.animationDuration = `${duration}s`;
        tails.style.animationDuration = `${duration}s`;
        shadow.style.animationDuration = `${duration}s`;

        // In the style.css file, a nonexistent class named 'animate' is styled 
        // and assigned with a css keyframe animation. The following lines add 
        // this class to the heads and tails <img>s. when this happens, the 
        // animation starts.
        heads.classList.add("animate");
        tails.classList.add("animate");        
        shadow.classList.add("animate");
    }

}

// The coin and button elements get an event listener to execute the
// function previously explained when clicked.
coin.addEventListener("click", flipCoin);
btnFlip.addEventListener("click", flipCoin);

// the heads img is assigned with an event listener that disables the button 
// and sets the text of the <h3> to and undefined value when the animation starts,
// and it will remain that way until we indicate it not to.
heads.addEventListener("animationstart", ()=> {
    btnFlip.setAttribute("disabled", "")
    txtResult.innerHTML = "...";
})

// When the animation finishes, the button starts working again and the .animate
// class from the heads and tails <img>s gets removed, so that the animation can 
// be triggered again. If we don't remove it, it will trigger once the button is 
// clicked but only one time per page load.
heads.addEventListener("animationend", ()=> {
    btnFlip.removeAttribute("disabled")
    heads.classList.remove("animate");
    tails.classList.remove("animate");  
    shadow.classList.remove("animate");

    // This condition evaluates if the number of spins were even or not
    if (spins % 2 != 0){
        // If the spins were uneven, the coin will show the face opposite to the 
        // one shown at the start of the animation. This is done to ensure that
        // the coin stays in the same rotation in which the animation ended, since 
        // once the .animate class is removed, the coin returns to its original 
        // rotation and doesn't stay in the one resulting of the spin animation.
        if (isHeads){
            console.log("switch heads to tails");       
            heads.style.setProperty("--rotation", "180deg");
            tails.style.setProperty("--rotation", "360deg"); 
        }
        else{
            console.log("switch tails to heads");
            heads.style.setProperty("--rotation", "0deg");
            tails.style.setProperty("--rotation", "180deg");
        }
        isHeads = !isHeads; // switches the coin side
    }
    console.log("isHeads = " + isHeads);

    // Shows the result in the <h3>
    if (isHeads){
        txtResult.innerHTML = "Heads";
    }
    else{
        txtResult.innerHTML = "Tails";
    }

})


