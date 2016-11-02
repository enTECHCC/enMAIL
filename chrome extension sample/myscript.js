
//comment out the debugger if you dont want chrome to set a breakpoint automatically
debugger;
console.log('script started');

//fuction that replaces the wording of compose button to 'new'
function replaceComposeButton(observer){
	console.log('trying to replace compose button..')
	//get all buttons on the page
	var buttons = document.querySelectorAll("div[role=button]");
	if(buttons.lenght == 0){
		return;
	}
	var i = 0;
	//iterate through the buttons to find the compose button
	for(i=0; i < buttons.length; i++){
		if(buttons[i].textContent === "COMPOSE"){
			//replace the text of compose button with 'new'
			buttons[i].textContent = "NEW";
			console.log('button replaced');
			//stop mutation observer
			observer.disconnect();
			break;
		}	
	}
	console.log('function complete');
}

$( document ).ready( function() {
	//create a mutation observer to observe any additions of nodes
	var observer = new MutationObserver(function() {
		replaceComposeButton(observer);    
	});
 
	// Notify only when nodes are added/deleted
	var observerConfig = {
		childList: true, 
		subtree: true
	};
	
	//start observing the body of the document for addition of nodes
	var targetNode = document.body;
	observer.observe(targetNode, observerConfig);
	});



