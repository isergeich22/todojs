const _todo = document.querySelector('#text')
const addButton = document.querySelector('#add')
const list = document.querySelector('.list')
const lsKey = "TODOS"

const todos = getState()

addButton.addEventListener('click', () => {
    createCard(_todo.value)
    _todo.value = ''
})

function createCard(text) {
    const newToDo = {
        todo: text
    }

    _todo.value = ''

    todos.push(newToDo)
    saveState()

    init()
}

function renderCards() {
    if(todos.length == 0) {
        list.innerHTML = '<p>There is no todo here.</p>'
    } else {
        let html = ''
        for (i = 0; i <= todos.length; i++) {
            html += `<div class="item">
                        <p class="todo">${todos[i].todo}</p>
                        <button class="delete" data-do=${todos[i].todo}>DELETE ITEM</button>
                    </div>`
            list.innerHTML = html
            const remove = document.querySelectorAll('.delete')
            console.log(remove)
            remove.forEach(el => {
                el.addEventListener('click', (event) => {
                    const text = event.target.dataset.do
                    console.log(text)
                    const todo = todos.find(i => i.todo === text)
                    let index = todos.indexOf(todo)
                    todos.splice(index, 1)
                    saveState()

                    init()
                })
            })            
        }     
        init()   
    }
}

function saveState() {
    localStorage.setItem(lsKey, JSON.stringify(todos))
}

function getState() {
    const row = localStorage.getItem(lsKey)
    return row ? JSON.parse(row) : []
}

function init() {
    renderCards()
}

init()