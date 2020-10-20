<<<<<<< HEAD
=======
function getProjectId () {
    var rx = /.*project_board\/(\d*).*/;
    var arr = rx.exec(window.location.href);
    return arr[1]
}

>>>>>>> 519428c43e360bd9001be21f7bfda15f49b0227a
const state = {
    todo: [],
    doing: [],
    done: []
}

// instead of => { return our_html }
const view = (state) => `
    <section class="ProjectColumnGrid">
            <section class="todosection ProjectColumns">
                <h3>To-do</h3>
<<<<<<< HEAD
                <div>
                ${state.todo.map(task => `<li id="${task.id}" draggable="true" ondragstart="app.run('dragFromToDoTask', event)">${task.text}</li>`).join("")}
                </div>
=======
>>>>>>> 519428c43e360bd9001be21f7bfda15f49b0227a
                <div class="task">
                <form onsubmit="app.run('add', this);return false;" style="text-align: center">
                    <input name="task" placeholder="add a task" />
                    <button class="plus-button">+</button>
                </form>
                </div>
<<<<<<< HEAD
=======
                <div>
                    <ul>
                    ${state.todo.map(task => `<li id="${task.id}" draggable="true" ondragstart="app.run('dragFromToDoTask', event)">${task.name}</li>`).join("")}
                    </ul>
                </div>
>>>>>>> 519428c43e360bd9001be21f7bfda15f49b0227a
            </section>

            <section class="doingsection ProjectColumns" ondragover="event.preventDefault()" ondrop="app.run('addToDoingTask', event)">
                <h3>Doing</h3>
                    <ul>
<<<<<<< HEAD
                    ${state.doing.map(task => `<li id="${task.id}" draggable="true" ondragstart="app.run('dragFromDoingTask', event)">${task.text}</li>`).join("")}
=======
                    ${state.doing.map(task => `<li id="${task.id}" draggable="true" ondragstart="app.run('dragFromDoingTask', event)">${task.name}</li>`).join("")}
>>>>>>> 519428c43e360bd9001be21f7bfda15f49b0227a
                    </ul>
            </section>

            <section class="donesection ProjectColumns" ondragover="event.preventDefault()" ondrop="app.run('addToDoneTask', event)">
                <h3>Done</h3>
                <ul>
<<<<<<< HEAD
                    ${state.done.map(task => `<li id="${task.id}" draggable="true" ondragstart="app.run('dragFromDoneTask', event)">${task.text}</li>`).join("")}
=======
                    ${state.done.map(task => `<li id="${task.id}" draggable="true" ondragstart="app.run('dragFromDoneTask', event)">${task.name}</li>`).join("")}
>>>>>>> 519428c43e360bd9001be21f7bfda15f49b0227a
                </ul>
            </section>
    </section>

    <section class="deletesection" ondragover="event.preventDefault()" ondrop="app.run('deleteTask', event)">
        <h1>♻</h1>
    </section>
`
<<<<<<< HEAD
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
=======
const update = {
    add: (state, form) => {
        const data = new FormData(form)
        if (data.get('task').length > 0) {
            const task = {
                id: window.crypto.getRandomValues(new Uint8Array(3)).join(""),
                name: data.get('task'),
                ProjectId: getProjectId(),
                status: 0
            }
            const postRequest = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            }
            fetch('/tasks', postRequest).then(() => app.run('getTasks'))
            return state
        }
>>>>>>> 519428c43e360bd9001be21f7bfda15f49b0227a
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
<<<<<<< HEAD
    }
}

app.start('todoApp', state, view, update)
=======
    },
    getTasks: async (state) => {
        // either add more arrays or replace with 'state.tasks' for doing and done persistence
        state.todo = await fetch('/tasks/' + getProjectId()).then(res => res.json())
        return state
    },
}

app.start('todoApp', state, view, update)
app.run('getTasks')
>>>>>>> 519428c43e360bd9001be21f7bfda15f49b0227a
