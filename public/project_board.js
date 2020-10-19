const state = {
    todo: [],
    doing: [],
    done: []
}

// instead of => { return our_html }
const view = (state) => `
    <section class="todosection">
        <h1>To-do</h1>
        <div>
            <form onsubmit="app.run('add', this);return false;">
                <input name="task" placeholder="add a task" />
                <button>Add</button>
            </form>
        </div>
        <ul>
            ${state.todo.map(task => `<li id="${task.id}" draggable="true" ondragstart="app.run('dragFromToDoTask', event)">${task.text}</li>`).join("")}
        </ul>
    </section>
    <section class="doingsection" ondragover="event.preventDefault()" ondrop="app.run('addToDoingTask', event)">
        <h1>Doing</h1>
        <ul>
            ${state.doing.map(task => `<li id="${task.id}" draggable="true" ondragstart="app.run('dragFromDoingTask', event)">${task.text}</li>`).join("")}
        </ul>
    </section>
    <section class="donesection" ondragover="event.preventDefault()" ondrop="app.run('addToDoneTask', event)">
        <h1>Done</h1>
        <ul>
            ${state.done.map(task => `<li id="${task.id}" draggable="true" ondragstart="app.run('dragFromDoneTask', event)">${task.text}</li>`).join("")}
        </ul>
    </section>
    <section class="deletesection" ondragover="event.preventDefault()" ondrop="app.run('deleteTask', event)">
        <h1>Delete</h1>
    </section>
`
// all update func return a state
const update = {
    add: (state, form) => {
        // access data in a form
        const data = new FormData(form)
        const task = {
            id: window.crypto.getRandomValues(new Uint8Array(3)).join(""),
            text: data.get('task'),
            status: 0
        }
        state.todo.push(task)
        return state
    },
    dragFromToDoTask: (state, event) => {
        event.dataTransfer.setData('text', event.target.id)
        return state
    },
    addToDoingTask: (state, event) => {
        const id = event.dataTransfer.getData('text')
        const index = state.todo.findIndex(task => task.id == id)
        const task = state.todo.find(task => task.id == id)
        state.todo.splice(index, 1)
        state.doing.push(task)
        return state
    },
    dragFromDoingTask: (state, event) => {
        event.dataTransfer.setData('text', event.target.id)
        return state
    },
    addToDoneTask: (state, event) => {
        const id = event.dataTransfer.getData('text')
        const index = state.doing.findIndex(task => task.id == id)
        const task = state.doing.find(task => task.id == id)
        state.doing.splice(index, 1)
        state.done.push(task)
        return state
    },
    dragFromDoneTask: (state, event) => {
        event.dataTransfer.setData('text', event.target.id)
        return state
    },
    deleteTask: (state, event) => {
        const id = event.dataTransfer.getData('text')
        const index = state.done.findIndex(task => task.id == id)
        if (index != -1) {
            state.done.splice(index, 1)
            return state
        }
    }
}

app.start('todoApp', state, view, update)
