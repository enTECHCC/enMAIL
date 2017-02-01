//comment out the debugger if you dont want chrome to set a breakpoint automatically
debugger;
var isGmailLoaded = false;
var listPage = true;
var observer1;
var observer2;
console.log('script started');

function replaceImageWithText(className, newLabel) {
	var imageToDelete = document.getElementsByClassName(className);
	if (imageToDelete.length > 0) {
		var parentElem = imageToDelete[0].parentNode;
		parentElem.removeChild(imageToDelete[0]);
		parentElem.innerHTML = newLabel;
	}
}

//fuction that replaces the wording of compose button to 'new'
function updateButtons(){
	//get all buttons on the page
	var buttons = document.querySelectorAll("div[role=button]");
	if(buttons.length == 0){
		return;
	}

	// Remove archive, spam and delete button on the email view
	replaceImageWithText("ar9 T-I-J3 J-J5-Ji", "Delete");
	replaceImageWithText("asl T-I-J3 J-J5-Ji", "Mark Spam");
	replaceImageWithText("ar8 T-I-J3 J-J5-Ji", "Archive");

	var i = 0;
	//iterate through the buttons
	for(i=0; i < buttons.length; i++){
		//replace compose button with new
		if(buttons[i].textContent === "COMPOSE"){
			//replace the text of compose button with 'new'
			buttons[i].textContent = "NEW";
			console.log('compose button replaced');
		//remove checkbox button
		}else if(buttons[i].querySelector("span[role=checkbox]") != null){
			buttons[i].remove();
			console.log('checkbox button removed');
		//find newer mails button (left arrow button)
        }else if(buttons[i].getAttribute("data-tooltip") == "Newer"){
            //remove arrow image
            var img = buttons[i].querySelector("img");
            if (img != null) {
                buttons[i].querySelector("img").remove();
                //insert the word newer as a label for the button
                buttons[i].querySelector("span").textContent = "Newer";
            }
            //find older mails button (right arrow button)
        }
        else if (buttons[i].getAttribute("data-tooltip") == "Older") {
            //remove arrow image
            var img = buttons[i].querySelector("img");
            if (img != null) {
                buttons[i].querySelector("img").remove();
                //insert the word older as a label for the button
                buttons[i].querySelector("span").textContent = "Older";
            }
        }
	}
}

function emailLoaded() {
    updateButtons();
    removeSideActions();
}

function emailListLoaded() {
    updateButtons();
    //attach listeners to everything
    var buttons = document.querySelectorAll("*");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            //console.log("button clicked");
            setTimeout(updateButtons, 500);
        });
    }
    removeSideActions();
}

$(document).ready(function () {
    //create a mutation observer to observe any additions of nodes
    observer1 = new MutationObserver(function () {
        if (document.getElementById("loading").style.display == "none") {
            isGmailLoaded = true;
            observer1.disconnect();
            emailListLoaded();
            observer2.observe(targetNode, observerConfig);
        }
    });
    // Notify only when nodes are added/deleted
    var observerConfig = {
        childList: true
        , subtree: true
    };
    //start observing the body of the document for addition of nodes
    var targetNode = document.body;
    observer1.observe(targetNode, observerConfig);
    //create an observer to detect switch between email list and email
    observer2 = new MutationObserver(function () {
        if (document.body.querySelector("div[role=main] table[role=presentation]") == null) {
            if (listPage != true) {
                listPage = true;
                emailListLoaded();
            }
        }
        else if (listPage != false) {
            listPage = false;
            emailLoaded();
        }
    })
});
