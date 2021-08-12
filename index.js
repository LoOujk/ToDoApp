


let addMessage = document.querySelector('.NewTask');
let add = document.querySelector('.addButton');
let jsList = document.querySelector('.list')
let arrayList = [];
let doneList = [];
let activeList = [];
let allButton = document.getElementById('allButton');
let doneButton = document.getElementById('doneButton');
let id = 0 ;



window.onload = function(){
    if(localStorage.getItem('todolistKey')) {
        arrayList = JSON.parse(localStorage.getItem('todolistKey'))
        displayTodos()
    }
 }
// SEARCH FUNCTION
window.onload = () => {
	let input = document.querySelector('.search');

	input.oninput = function() {
		let value = this.value.trim();
		let list = document.querySelectorAll('.list li');
        

		if (value) {
			list.forEach(elem => {
                value=value.toLowerCase()
				if (elem.innerText.toLowerCase().search(value) == -1) {
					elem.classList.add('listLiNone');
				}
			});
		} else {
			list.forEach(elem => {
				elem.classList.remove('listLiNone');
			});
		}
	};
    if(displayCorrectTab==1){
        displayTodos ()
    }
    else if(displayCorrectTab==2){
        displayActive()
    }
    else if(displayCorrectTab==3){
        displayDone()
    }
};




add.addEventListener('click',function addTask(){
    id = arrayList.length
    let newTodo = {
        todo: addMessage.value,
        check:'active',
        importance:'notImportant',
        id:id++
    }   
    if(!addMessage.value || addMessage.value=== ' ' ){  
        addMessage.style.backgroundColor = "rgba(240, 150, 150, 0.397)";
        
    }
    else {
        addMessage.style.backgroundColor = "white";  
        arrayList.push(newTodo) 
        addMessage.value = ''
        if(displayCorrectTab==1){
            displayTodos ()
        }
        else if(displayCorrectTab==2){
            displayActive()
        }
        else if(displayCorrectTab==3){
            displayDone()
        }
    
        localStorage.setItem('todolistKey',JSON.stringify(arrayList))  
        activeList=arrayList
        localStorage.setItem('activelistKey',JSON.stringify(activeList))  
        
    }   
}) 
// TABS SAVE SWITCH
let displayAllbutton = (document.getElementById("allButton"))
let displayActivebutton= (document.getElementById("actButton"))
let displayDonebutton= (document.getElementById("doneButton"))



let displayCorrectTab = 1

if(displayCorrectTab == 1){
    displayAllbutton.classList.remove('tablinks')
    displayAllbutton.classList.add('tabButtonPress')

} 
displayAllbutton.addEventListener('click', function (){
    displayCorrectTab = 1   
        

    displayActivebutton.classList.remove('tabButtonPress')
    displayDonebutton.classList.remove('tabButtonPress')
    displayActivebutton.classList.add('tablinks')
    displayDonebutton.classList.add('tablinks')

    displayAllbutton.classList.remove('tablinks')
    displayAllbutton.classList.add('tabButtonPress')
})
displayActivebutton.addEventListener('click', function (){  
    displayCorrectTab = 2 

    displayAllbutton.classList.remove('tabButtonPress')
    displayDonebutton.classList.remove('tabButtonPress')
    displayAllbutton.classList.add('tablinks')
    displayDonebutton.classList.add('tablinks')

    displayActivebutton.classList.remove('tablinks')
    displayActivebutton.classList.add('tabButtonPress')
})

displayDonebutton.addEventListener('click', function (){
    displayCorrectTab = 3

    displayAllbutton.classList.remove('tabButtonPress')
    displayActivebutton.classList.remove('tabButtonPress')
    displayAllbutton.classList.add('tablinks')
    displayActivebutton.classList.add('tablinks')

    displayDonebutton.classList.remove('tablinks')
    displayDonebutton.classList.add('tabButtonPress')
})

// IMPORTANT BUTTON FUNCTION
                                       
function clickImpButton(button) {
    
    if  ( (arrayList.find(e=>e.id == button.id).importance)=="notImportant"){

        (arrayList.find(e=>e.id == button.id).importance)="important"
        console.log(arrayList.find(e=>e.id == button.id))

        localStorage.setItem('todolistKey',JSON.stringify(arrayList)) 
        activeList=arrayList
        localStorage.setItem('activelistKey',JSON.stringify(activeList))
        if(displayCorrectTab==1){
            displayTodos ()
        }
        else if(displayCorrectTab==2){
           displayActive()
        }
      
    }
    else  {
        (arrayList.find(e=>e.id == button.id).importance)="notImportant"

        localStorage.setItem('todolistKey',JSON.stringify(arrayList))   
        localStorage.setItem('DoneListKey',JSON.stringify(doneList)) 
        activeList=arrayList
        localStorage.setItem('activelistKey',JSON.stringify(activeList)) 
        if(displayCorrectTab==1){
            displayTodos ()
        }
        else if(displayCorrectTab==2){
            displayActive()
        }
    }
}   

// ADD TO DONE 
function deleteLi(delButton){  
    if(delButton.id == arrayList.find(e=>e.id == delButton.id).id){
        (arrayList.find(e=>e.id == delButton.id ).check)= "done";
        doneList.push(arrayList[delButton.id])
        localStorage.setItem('todolistKey',JSON.stringify(arrayList))   
        localStorage.setItem('DoneListKey',JSON.stringify(doneList)) 
        activeList=arrayList
        localStorage.setItem('activelistKey',JSON.stringify(activeList)) 
        if(displayCorrectTab==1){
            displayTodos ()
        }
        else if(displayCorrectTab==2){
            displayActive()
        }
        else if(displayCorrectTab==3){
            displayDone()
        }
    }
    else{
        console.log("nie robie)0")
    }
}

function mouseoverF(event){
    let buttons = event.querySelectorAll('button')
    buttons.forEach(function(elem){   
        elem.style.visibility = 'visible'
    })
}
function mouseoutF(event){
    let buttons = event.querySelectorAll('button')
    buttons.forEach(function(elem){
        elem.style.visibility = 'hidden'
    })
    console.log(buttons)
}

function displayTodos (){ 
    let displayLi = ''   
    let buttonText = ''
    arrayList.forEach(function(item){
        if(item.importance === "important"){
             buttonText = "NOT IMPORTANT"
        }
        else{
            buttonText = "MAKE IMPORTANT"
        }

        let className = ""
       
        if(item.check==="done"){
            className ="listDone"
        }
        else if (item.importance==="important"){
            className= "listImportant"
        }
        if(item.check === "done" && item.importance==="important"){
            className = "importantDone"
        }
       displayLi += `
       <li onmouseover = "mouseoverF(this)" onmouseout = "mouseoutF(this)">         
            <id='${item.id}'>
            <label for = '${item.id}'  ${item.todo}  class = "${className}"  >     ${item.todo}    </label>
            <button  onclick = "clickImpButton(this)" id='${item.id}' class = "${item.importance ==="important" ?  "importantButtonPress" : "importantButton"}"   > ${buttonText}</button>
            <button class = "deleteButton" id="${item.id}" onclick = "deleteLi(this)"   ></button>
        </li>
        `    
 
        
        
        jsList.innerHTML = displayLi
    })
}
if(localStorage.getItem('todolistKey')) {
    arrayList = JSON.parse(localStorage.getItem('todolistKey'))
    displayTodos()
}


//  DONE TAB
function displayDone(){
    let dispDone = ''
    if(doneList.length>0){
        doneList.forEach(function(item){ 
            let className = ""
            if(item.check === "done" && item.importance==="important" ){
                className = "importantDone"
           }          
            dispDone += `
            <li>         
            <id='${item.id}'>
            <label for = '${item.id}'  ${item.todo}  class = "${item.importance ==="important" ?  className : "listDone"}"  >     ${item.todo}    </label>
        </li>
        `
             jsList.innerHTML = dispDone    
         })
    }
    else{
        jsList.innerHTML = dispDone   
    }

}
if(localStorage.getItem('DoneListKey')) {
   doneList = JSON.parse(localStorage.getItem('DoneListKey'))
   displayDone()
}

// ALL TAB
allButton.addEventListener("click",function displayAll() {
    if(localStorage.getItem('todolistKey')) {
        arrayList = JSON.parse(localStorage.getItem('todolistKey'))
            
        displayTodos()
    }
    
})
// ACTIVE TAB

function displayActive(){
    let dispActive = ''
    let buttonText = ''
        arrayList.forEach(function(item){  
            if( `${item.check}`=="active"){  
                    if(item.importance === "important"){
                    buttonText = "NOT IMPORTANT"     
            }
            else{
                buttonText = "MAKE IMPORTANT"
            }
                dispActive += `        
                <li onmouseover = "mouseoverF(this)" onmouseout = "mouseoutF(this)">         
                    <id='${item.id}'>
                    <label for = '${item.id}'  ${item.todo}  class = "${item.importance ==="important" ?  "listImportant" : "list"}" >     ${item.todo}    </label>
                    <button  onclick = "clickImpButton(this)" id='${item.id}' class = "${item.importance ==="important" ?  "importantButtonPress" : "importantButton"}" >${buttonText}</button>
                    <button class = "deleteButton" id="${item.id}" onclick = "deleteLi(this)"   ></button>
                </li>
                `
                jsList.innerHTML = dispActive

            }
            else{
                jsList.innerHTML = dispActive
            }
            
        })
        jsList.innerHTML = dispActive
        
}
 if(localStorage.getItem('activelistKey')) {
        activeList = JSON.parse(localStorage.getItem('activelistKey'))
        displayActive()
     }
    




    



    