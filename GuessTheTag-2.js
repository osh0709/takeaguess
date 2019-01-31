// JS Guess The Tag //
console.log("hello!");

// declare:

// 1. tumblr api photo listing
// 2. the div that needs the button the be placed
// 3. array of tags
// 4. random shuffle of tags.length
// 5. what are the answers?

let list = document.getElementById("list-data");

let buttonChoices = document.getElementById("choice-select");

tags = ["japanesetea", "ramen", "sparrow", "tonkatsu", "temple"];

let shuffleTags = Math.floor(Math.random() * tags.length)

let answer = "";

// Function for random colour

function randomColor(){
    let r = Math.floor( Math.random () * 255 );
    let g = Math.floor( Math.random () * 170 );
    let b = Math.floor( Math.random () * 170 );
    return "rgb("+ r +", "+ g +", "+ b +")";  
}

// Link answer to fetched photos

    answer = tags[shuffleTags];
    taggedPhotos(answer)


// Reshuffle tags

    tags.sort(function() { return 0.5 - Math.random() });


// Tumblr API images - fetch from answer:

function taggedPhotos(answer){
    fetch("https://api.tumblr.com/v2/tagged?tag=" + answer + "&api_key=e3mJUWUXl6lH06AtPx6MFK1EtBFd2DFODLvsoVeFqEeV9ruAfs")
    .then (function(response){
        return response.json();

    })
    .then(function(result){

        if(!result){
            return;
        }
    
        list.innerHTML = "";

        let items = result.response;
        let masonry;

        for (let i = 0; i < items.length; i++){


            let item = items[i];

            if (item.photos != undefined){
            
            let altSizes = item.photos[0].alt_sizes
            let imgSrc = altSizes[altSizes.length -3].url;

            let img = document.createElement("img");
            img.src = imgSrc;

            img.onload = function(){
                masonry.layout();
            }

            let li = document.createElement("li");
            li.appendChild(img);
            // li.innerHTML = imgSrc;
            list.appendChild(li);

            }

            masonry = new Masonry(list, {
                itemSelector: "li",
                columnWidth: 210,
            });

            masonry.layout();
            
        }

        })
        .catch(function(err){
            window.alert("Sorry, Tumblr API went kapoot. Please try again later :(")
            console.log("message", err);
        })

}

// Buttons choices goes into here 
// - div append child 
// - event target needed for buttons
// - announcing right or wrong


for (let i = 0; i < tags.length; i ++ ){

    let buttons = document.createElement("button");

    buttonChoices.appendChild(buttons);
    buttons.innerHTML = tags[i];
    buttons.style.background = randomColor();
    buttons.classList.add("tags-choices");

    buttons.onclick = function (event){
        console.log(event.target);
        let buttonChoices = event.target;
        console.log(buttonChoices.innerHTML);

        if(buttonChoices.innerHTML == answer){

            document.getElementById("right-wrong").innerHTML = "Bingo! High 5!";
            setTimeout(function(){
                window.location.reload(1);
                }, 1300);

        }

        else{

            document.getElementById("right-wrong").innerHTML = "Oops! It's " + answer + ".";
            setTimeout(function(){
                window.location.reload(1);
                }, 1300);

        }
    }
}
