
//comment out the debugger if you dont want chrome to set a breakpoint automatically
debugger;
var isGmailLoaded = false;
var listPage = true;
var observer1;
var observer2;
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
			buttons[i].textContent = "NEW EMAIL";
			console.log('compose button replaced');
		//remove checkbox button	
		}else if(buttons[i].querySelector("span[role=checkbox]") != null){
			buttons[i].remove();
			console.log('checkbox button removed');
		}
	}
}
function updateNavigationBar(){
	var navItems = document.body.querySelectorAll("div[role=navigation] span");
	var i;
	for(i=1; i < navItems.length;i++){
		if(navItems[i].innerText != "inbox" && navItems[i].innerText != "Sent Mail"){
			//navItems[i].style.visibility = "hidden";
			navItems[i].remove();
		}
	}
}
//this function modifies the inbox
function updateInboxTable(){
	var table = document.body.querySelector("div[role=main] div[role=tabpanel] table");
	var className;
	//add grid lines to the table
	table.border = "1";
	var inboxTblRows = table.rows;
	var index;
	for(index = 0; index < inboxTblRows.length; index++){
		//hide the message details
		var messageSpan = inboxTblRows[index].querySelector("div[role=link] span + span");
		messageSpan.remove();
		var tds = inboxTblRows[index].querySelectorAll("td");
		className = tds.className;
		var i = 0;
		//hide everything till the subject - the star, flags, etc
		while(tds[i].innerText == ""){
			tds[i].remove();
			//tds[i].style.visibility = "hidden";
			i++;
		}		
	}

	//create a header for the table (list of emails)
	var headerRow = table.createTHead().insertRow(0);
	// for(var i = 0; i < 4; i++){
	// 	//insert a blank cell as header for the flags/unused cols.
	// 	headerRow.insertCell(0).innerHTML = "";
	// }
	var fromCol = headerRow.insertCell(0);
	fromCol.innerHTML = "From";
	//fromCol.className = className;
	var subCol = headerRow.insertCell(1);
	subCol.innerHTML = "Subject";
	//subCol.width = "50%";
	table.style.tableLayout = "auto";
}

function emailLoaded(){
	updateButtons();
}

function emailListLoaded(){
	updateButtons();
	updateNavigationBar();
	updateInboxTable();
}

$( document ).ready( function() {

	//create a mutation observer to observe any additions of nodes
	observer1 = new MutationObserver(function() {
		if(document.getElementById("loading").style.display == "none"){
			isGmailLoaded = true;
			observer1.disconnect();
			emailListLoaded();
			observer2.observe(targetNode, observerConfig);
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
	
	//create an observer to detect switch between email list and email
	observer2 =  new MutationObserver(function(){
		
		if(document.body.querySelector("div[role=main] table[role=presentation]") == null){
			if(listPage!=true){
				listPage = true;
				emailListLoaded();
			}
		}else if(listPage != false){
			listPage = false;
			emailLoaded();
		}
	})
		
	
	});



