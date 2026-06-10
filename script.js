//Selecting dom elements

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if(text === ""){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        id: Date.now(),
        text:text,
        status:"todo"
    });

    input.value="";
    saveTasks();
    renderTasks();
}

function updateStatus(id,status){
    const task = tasks.find(t=>t.id===id);
    task.status=status;

    saveTasks();
    renderTasks();
}
 function deletepermanently(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

function renderTasks(){

    const todo=document.getElementById("todo");
    const progress=document.getElementById("progress");
    const completed=document.getElementById("completed");
    const deleted=document.getElementById("deleted");

    todo.innerHTML="";
    progress.innerHTML="";
    completed.innerHTML="";
    deleted.innerHTML="";


    tasks.forEach((task,index)=>{

        const div=document.createElement("div");
        div.className="task";

        let buttons="";

        if(task.status==="todo"){
            buttons=`
            <button class="start" onclick="updateStatus(${task.id},'progress')">Start</button>
            <button class="delete" onclick="updateStatus(${task.id},'deleted')">Delete</button>
            `;
        }

        else if(task.status==="progress"){
            buttons=`
            <button class="complete" onclick="updateStatus(${task.id},'completed')">Complete</button>
            <button class="delete" onclick="updateStatus(${task.id},'deleted')">Delete</button>
            `;
        }

        else if(task.status==="completed"){
            buttons= `
            <button class="delete" onclick="updateStatus(${task.id},'deleted')">Delete</button>
            `;
        }

        else if(task.status==="deleted"){
            buttons=`
            <button class="restore" onclick="updateStatus(${task.id},'todo')">Restore</button>
            <button class="deletedpermanently" onclick="deletepermanently(${task.id})">Delete Permanently</button>
            `;
            
        }

        div.innerHTML=`
        <p>
            ${task.text}
        </p>
        <div class="btn-group">
            ${buttons}
        </div>
        `;

        if(task.status==="todo") todo.appendChild(div);
        if(task.status==="progress") progress.appendChild(div);
        if(task.status==="completed") completed.appendChild(div);
        if(task.status==="deleted") deleted.appendChild(div) ;
       

    });
}

renderTasks();