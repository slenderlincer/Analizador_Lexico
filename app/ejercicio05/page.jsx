'use client'
import { Contrail_One } from 'next/font/google';
import React, {useState} from 'react'

const Ejercicio05 = () => {
    //Declaracion de estados
    const [file, setFile] = useState();
    const [text, setText] = useState([]);
    const [mensaje, setMensaje] = useState();

    //Array palabras reservadas
    const palabrasReservadas = ['main','auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extern',
    'float', 'for', 'goto', 'if', 'int', 'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static', 
    'static', 'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while'];

    const palabrasEncontradas = [];

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
                const contenidoFiltrado = nuevoContenido.match(/[a-zA-Z]+/g);//Expresion regular para filtrar secuencias de caracteres binarios '01' del contenido.
    
                if(contenidoFiltrado){
                  contenidoFiltrado.forEach(palabra => {
                    if(palabrasReservadas.includes(palabra)){
                        palabrasEncontradas.push(`${palabra} = pr`);
                    }else{
                        palabrasEncontradas.push(`${palabra} = id`);
                    }
                  });
                  setMensaje('Archivo Creado Correctamente')
                  const contenidoFinal = palabrasEncontradas.join('\n');

                  //crea un objeto Blob que contendrá el contenido de 'contenidoFinal' y estableciendo su tipo como 'text/plain'.
                  const blob = new Blob([contenidoFinal], {type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  
                  // Luego, crea un enlace para descargar el archivo.
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'result.txt'; // Nombre del archivo
                  a.click();
                  
                } 
            }
            setMensaje('No se encontraron caracteres validos')
        }
            setMensaje('Error: no se ha seleccionado ningun archivo'); // Si 'file' es falso, establece la variable de estado 'mensaje' en 'Error'.
}

//Funcion para limpiar el contenido
const Limpiar = (e) =>{
    e.preventDefault();
    setText('');
    setMensaje('')
}
  return (
    <div className = 'max-w-lg mx-auto mt-5'>
        <h1 className = 'text-center font-bold uppercase'>Analizador Lexico</h1>

        <form id = 'formulario'>
            <div className = 'mt-5 flex'>
                <input onChange = {e => setFile(e.target.files[0])} className = 'cursor-pointer' type="file" />
            </div>

            <div className = 'mt-5'>
                <textarea value = {text} onChange = {e => setText(e.target.value)} className = 'border border-black px-3' cols = "60" rows = "10"></textarea>
            </div>

            <button onClick={leerArchivo} className = 'mt-5 border rounded bg-gray-200 border-black cursor-pointer'>Ejecutar</button>
        </form>
        
        <button onClick={Limpiar} className = 'mt-5 border rounded bg-gray-200 border-black cursor-pointer'>Limpiar</button>
        <p onChange = {e => setMensaje(e.target.value)}>{mensaje}</p>
    </div>
  )
}

export default Ejercicio05