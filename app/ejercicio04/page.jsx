'use client'
import React, {useState} from 'react'

const Ejercicio04 = () => {
    //Declaracion de estados
    const [file, setFile] = useState();
    const [text, setText] = useState([]);
    const [cantidad, setCantidad] = useState('cantidad de caracteres encontrados: 0');
    const [mensaje, setMensaje] = useState();

    //Funcion para leer el archivo y analizar su contenido
    const leerArchivo = (e)=>{
        e.preventDefault();// Prevenir la recarga de la página por defecto

        //Si se ha seleccionado un archivo
        if(file){
            const filereader = new FileReader(); // Crea una nueva instancia de FileReader.
            filereader.readAsText(file);//Lee el contenido del archivo seleccionado como texto.

            //Funcion para obtener el contenido del archivo y mostrarlo en el DOM
            filereader.onload = function(){

                const data = filereader.result;//Obtener el contenido del archivo
                const nuevoContenido = data.replace(/\/\/[^\n\r]*|\/\*[\s\S]*?\*\//g, '');//Expresion regular para quitar comentarios simples y comentarios de bloque
                const contenidoFiltrado = nuevoContenido.match(/[01]+/g);//Expresion regular para filtrar secuencias de caracteres binarios '01' del contenido.
                const caracteresNoValidos = nuevoContenido.match(/[^01\s]/g);//Se buscan caracteres no válidos fuera de los comentarios.
                
                //Si se encuentrar caracteres no validos
                if(caracteresNoValidos){
                     //Se interrumpe el programama y muestra un mensaje de error con los caracteres no validos encontrados fuera de comentarios
                    setText('');
                    setCantidad('');
                    setMensaje(`Error: El archivo contiene caracteres no válidos fuera de comentarios. ${caracteresNoValidos}`);
                    return;
                    
                }else{
                    // Si no se encuentran caracteres no válidos, se establece el texto filtrado, la cantidad de caracteres y un mensaje de éxito.
                    setText(contenidoFiltrado.join('\n'))
                    setCantidad(`Se encontraron ${contenidoFiltrado.length} caracteres`)
                    setMensaje('Archivo leido correctamente')
                }
            }
        }else{
            setMensaje('Error'); // Si 'file' es falso, establece la variable de estado 'mensaje' en 'Error'.
        }
}

//Funcion para limpiar el contenido
const Limpiar = (e) =>{
    e.preventDefault();
    setText('');
    setCantidad('cantiadad de caracteres: 0')
    setMensaje('')
}
  return (
    <div className = 'max-w-lg mx-auto mt-5'>
        <h1 className = 'text-center font-bold uppercase'>Lector de archivos.txt 4</h1>

        <form id = 'formulario'>
            <div className = 'mt-5 flex'>
                <input onChange = {e => setFile(e.target.files[0])} className = 'cursor-pointer' type="file" />
            </div>

            <div className = 'mt-5'>
                <textarea value = {text} onChange = {e => setText(e.target.value)} className = 'border border-black px-3' cols = "60" rows = "10"></textarea>
            </div>

            <button className = 'mt-5 border rounded bg-gray-200 border-black cursor-pointer' onClick={leerArchivo} >Ejecutar</button>
        </form>
        
        <button onClick={Limpiar} className = 'mt-5 border rounded bg-gray-200 border-black cursor-pointer'>Limpiar</button>
        
        <p onChange = {e => setCantidad(e.target.value)}>{cantidad}</p>
        <p onChange = {e => setCantidad(e.target.value)}>{mensaje}</p>
    </div>
  )
}

export default Ejercicio04

