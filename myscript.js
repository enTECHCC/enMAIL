
//comment out the debugger if you dont want chrome to set a breakpoint automatically
debugger;
console.log('script started');

//fuction that replaces the wording of compose button to 'new'
function updateButtons(){
	//get all buttons on the page
	var buttons = document.querySelectorAll("div[role=button]");
	if(buttons.length == 0){
		return;
	}
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
		}
	}
}

function gmailLoaded(){
	updateButtons();
}

function numButtonsChanged(){
	updateButtons();
}

$( document ).ready( function() {

	var isGmailLoaded = false;
	//create a mutation observer to observe any additions of nodes
	var observer1 = new MutationObserver(function() {
		if(document.getElementById("loading").style.display == "none"){
			isGmailLoaded = true;
			observer1.disconnect();
			gmailLoaded();
		}
		    
	});

	// Notify only when nodes are added/deleted
	var observerConfig = {
		childList: true, 
		subtree: true
	};
	
	//start observing the body of the document for addition of nodes
	var targetNode = document.body;
	observer1.observe(targetNode, observerConfig);
	//after loading, check for changes when opening emails,etc
	if(isGmailLoaded == true){
		var numButtons = 0;
		//create an observer to record changes to number of buttons
		var observer2 =  new MutationObserver(function(){
			var currentNumBtns = document.querySelectorAll("div[role=button]").length;
			if(currentNumBtns != numButtons){
				//fire buttons changed event
				numButtonsChanged();
			}
		})
		observer2.observe(targetNode, observerConfig);
	}
	});



