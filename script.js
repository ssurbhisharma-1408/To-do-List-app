//Selecting dom elements

const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

const saved = localStorage.getItem('todos');
const todos = saved? JSON.parse(saved): [];


function saveToDos(){
    //Save current todos array to localstorage
    localStorage.setItem('todos', JSON.stringify(todos));
}


function addTodo(){
    const text= input.value.trim();
   
    if(!text){
        return
    }

    todos.push({text:text});
    input.value="";
    render();
    saveToDos();
}

addBtn.addEventListener("click",addTodo);


function createTodoNode(todo,index){
const li = document.createElement('li');


const textSpan = document.createElement("span");
textSpan.textContent = todo.text;
textSpan.style.margin = '0 8px';

const delBtn = document.createElement('button');
delBtn.textContent = "Delete";
delBtn.id = "delbtn";
delBtn.addEventListener('click', ()=>{
    todos.splice(index,1);
    render();
    saveToDos();
})

li.appendChild(textSpan);
li.appendChild(delBtn);

return li;
}


function render(){
    list.innerHTML = "";

    todos.forEach((todo,index)=> {
        const node = createTodoNode(todo,index);
        list.appendChild(node)  
    });
 console.log(todos);
}
render();

