const formulario = document.getElementById('formulario');
const input = document.getElementById('input');
const listaTarea = document.getElementById('lista-tarea');
//Siempre colocar .content a los template
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();
let tareas = {}
//console.log(Date.now());
formulario.addEventListener('submit', e => {
    //Evita el comportamineto de las etiquest html del id formulario
    e.preventDefault();
    /*
    console.log(e.target[0].value);
    console.log(e.target.querySelector('input').value);
    console.log(inputForm.value);
    */
    //Creacion de forma dinamica
    setTarea(e);
});
const setTarea = e => {
    //validar que hay contenido en inputForm
    if(input.value.trim() === ''){
        console.log('Vacio');
        //Sale de la funcion setTarea
        return
    }
    //Al detectar algo escrito se crea la tarea
    console.log('Diste click');
    const tarea = {
        //Se usa Date.now() para crear un id aleatorio
        id: Date.now(),
        texto: input.value,
        estado: false
    }
    //Coleccion de tareas
    tareas[tarea.id] = tarea;
    //console.log(tareas);
    //Si escribio algo en input, se limpia el input
    formulario.reset();
    //Se agrega autofocus al input en html
    input.focus();
    //imprimir en html la coleccion de tareas
    pintarTareas();
};
const pintarTareas = () => {
    listaTarea.innerHTML = '';
    Object.values(tareas).forEach(tarea => {
        //Realizar clone al template
        const clone = template.cloneNode(true)
        //Se accede a p de html siguiedo la estructura y se agrega texto de la coleccion de objetos
        clone.querySelector('p').textContent = tarea.texto
        fragment.appendChild(clone)
    })
    //Se pasa el fragment ya modificado
    listaTarea.appendChild(fragment)
}