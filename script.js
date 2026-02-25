//DOM Selection
let input= document.getElementById("taskinput");
let button= document.getElementById("addBtn");
let list= document.getElementById("tasklist");
let completedList= document.getElementById("completedList");
let counter= document.getElementById("taskCounter");

//Tasks Arrays (Storage ke liye)
let tasks = [];


//load saved tasks
window.addEventListener("load", function(){
    let savedtasks=
    localStorage.getItem("tasks");

    if(savedtasks){
        tasks= JSON.parse(savedtasks);

        tasks.forEach(function(task){
            if(typeof task==="string"){
                task={
                    text: task,
                    completed: false
                };
            }
           createTaskElement(task);
           updateCounter();
        });
    }
});

//COUNTER UPDATE BUTTON!
function updateCounter(){
    let total= tasks.length;
    let completed= completedList.children.length;
    let pending= total-completed;

    counter.textContent=
    "Total:"+total+
    " | Completed: " + completed+
    " | Pending: " + pending;
}

// new
function createTaskElement(task) {

    let li= document.createElement("li");
    li.textContent= task.text;
    
    //if(requestIdleCallback.completed){
       // completedList.appendChild(li);
   // } else {
      //  list.appendChild(li);
  //  }

    //toggel
    li.addEventListener("click",function(){
        task.completed=!task.completed;
        localStorage.setItem("tasks",
            JSON.stringify(tasks)
        );
        if(task.completed){
            completedList.appendChild(li);
        } else{
            list.appendChild(li);
        }
        updateCounter();

        // DOUBLE CLICK EVENT!
        li.addEventListener("dblclick",function(){
            let newText= prompt("Edit your task:",task.text);
            if(newText !== null && newText.trim() !==""){

                li.childNodes[0].textContent=newText;

                tasks=tasks.map(function(item){
                    if(item===task){
                        item.text=newText
                    }
                    return item;
                });
                localStorage.setItem("tasks",JSON.stringify(tasks));
                updateCounter();
            }
        })
    });

    // Delete Button
    let deleteBtn=
    document.createElement("button");
    deleteBtn.textContent="Remove";

    deleteBtn.addEventListener("click", function(event){
        event.stopPropagation();

        tasks=tasks.filter(function(item){
            return item !== task;
        });
    
        localStorage.setItem("tasks", JSON.stringify(tasks));
        li.remove();
        updateCounter();
    });

    li.appendChild(deleteBtn);
    if(task.completed){
        completedList.appendChild(li);
    } else{
        list.appendChild(li);
    }
}   

// button click event
button.addEventListener("click", function() {

    if(input.value ===""){
        alert("please enter a task");
    } else {

        tasks.push({
            text: input.value.trim(),
            completed: false
        });
        localStorage.setItem("tasks",JSON.stringify(tasks));

    createTaskElement(tasks[tasks.length-1]);
    
    input.value="";
    updateCounter();
    }
});
//ENTER KEY SUPPORT
input.addEventListener("keypress", function(event){
    if(event.key ==="Enter"){
        button.click();
    }
}); 