const formulario = document.getElementById('formulario');
const input = document.getElementById('input');
const listaTarea = document.getElementById('lista-tareas');
//Siempre debe llevar el content
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();
/*
let tareas = {
    1605990629039: {
        id: 1605990629039,
        texto: 'Tarea #1',
        estado: false
    },
    1605990682337: {
        id: 1605990682337,
        texto: 'Tarea "2',
        estado: false
    }
}
*/
//Se crea la colecion de objetos
let tareas = {}
//Toma todo el documento, guarda la coleccion de objetos 
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas();
});
listaTarea.addEventListener('click', e => {
    btnAccion(e)
});
// console.log(Date.now())
//Toma el texto ingresado en input
formulario.addEventListener('submit', e => {
    e.preventDefault()
    // console.log(e.target[0].value)
    // console.log(e.target.querySelector('input').value)
    // console.log(input.value)
    setTarea(e)
})
//Crea id, recibe el texto y define como false la coleccion de objetos
const setTarea = e => {
    if (input.value.trim() === '') {
        console.log('está vacio')
        return
    } 
    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }
    tareas[tarea.id] = tarea
    // console.log(tareas)
    formulario.reset()
    input.focus()
    pintarTareas()
}
//Imprime las tareas ingresadas de la coleccion de objetos
const pintarTareas = () => {
    //Convierte a cadena de texto la coleccion de objetos para guardarla en localstorage
    localStorage.setItem('tareas', JSON.stringify(tareas))
    //Si no hay tareas inserta este texto
    if (Object.values(tareas).length === 0) {
        listaTarea.innerHTML = `
        <div class="alert alert-dark text-center">
            No hay tareas pendientes ✔
        </div>
        `
        return
    }
    listaTarea.innerHTML = ''
    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        if (tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })
    listaTarea.appendChild(fragment)
}
//Delegar eventos a botones
const btnAccion = e => {
    // console.log(e.target.classList.contains('fa-check-circle'))
    //Cambia el estado a true en la coleccioni de objetos al completar una tarea
    if (e.target.classList.contains('fa-check-circle')) {
        // console.log(e.target.dataset.id)
        tareas[e.target.dataset.id].estado = true;
        pintarTareas();
        // console.log(tareas)
    }
    //Elimina la tarea
    if (e.target.classList.contains('fa-minus-circle')) {
        delete tareas[e.target.dataset.id]
        pintarTareas();
        // console.log(tareas)
    }
    //Revierte el estado true a false al regresar a una tarea activa
    if (e.target.classList.contains('fa-undo-alt')) {
        tareas[e.target.dataset.id].estado = false;
        pintarTareas();
    }
    //Pausar eventos desencadenados
    e.stopPropagation();
}