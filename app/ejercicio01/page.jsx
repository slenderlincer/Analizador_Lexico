'use client'
import React, {useState} from 'react'

const Ejercicio01 = () => {
    //Declaracion de estados
    const [file, setFile] = useState();
    const [text, setText] = useState([]);
    const [mensaje, setMensaje] = useState();

     // Función para leer el archivo y analizar su contenido
    const leerArchivo = (e)=>{
        e.preventDefault();// Prevenir la recarga de la página por defecto

        //Si se ha seleccionado un archivo
        if(file){
            const filereader = new FileReader(); // Crea una nueva instancia de FileReader.
            filereader.readAsText(file);// Lee el contenido del archivo seleccionado como texto.

            filereader.onload = function(){
                const data = filereader.result; // Obtiene el resultado (contenido del archivo) del FileReader.
                setText(data)// Establece la variable de estado 'text' con el contenido del archivo seleccionado.
                setMensaje('Archivo leido correctamente')//Establece un mensaje de exito
            }
        }else{
            setMensaje('Error');  // Si 'file' es falso, establece la variable de estado 'mensaje' en 'Error'.
        }
}

//Funcion para limpiar el contenido
const Limpiar = (e) =>{
    e.preventDefault();
    setText('');
    setMensaje('')
}
  return (
    <div className = 'max-w-lg mx-auto mt-5'>
        <h1 className = 'text-center font-bold uppercase'>Lector de archivos.txt</h1>

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
        
        <p onChange = {e => setCantidad(e.target.value)}>{mensaje}</p>
    </div>
  )
}

export default Ejercicio01