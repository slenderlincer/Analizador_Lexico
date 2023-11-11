'use client'
import { Contrail_One } from 'next/font/google';
import React, {useState} from 'react'
import { diccionario } from '../ejercicio07/objetos';
import { procesarContenido, readAndDisplayFile, mostrarPalabrasPorCategoria} from '../ejercicio07/funciones';


const Ejercicio06 = () => {
    //Declaracion de estados
    const [file, setFile] = useState();
    const [text, setText] = useState([]);
    const [mensaje, setMensaje] = useState();
    const [resultado, setResultado] = useState('');
    const [categoriasData, setCategoriasData] = useState({});


    
  //Funcion para leer el archivo y analizar su contenido
  const leerArchivo = (e)=>{
    e.preventDefault();// Prevenir la recarga de la página por defecto
    //Si se ha seleccionado un archivo
    if(file){

      readAndDisplayFile(file, (data) => {
        const result = procesarContenido(data, setMensaje, diccionario);
        setMensaje(`Se han encontrado ${result.length} tokens`);
        mostrarPalabrasPorCategoria(result, setCategoriasData);
      });
      
    }
    setMensaje('El text area no funciona en esta version, puedes probar el ejercicio 07')
  };

//Funcion para limpiar el contenido
const Limpiar = (e) =>{
    e.preventDefault();
    setText('');
    setMensaje('')
  }
  
  return (
    <div className = 'max-w-lg mx-auto mt-5'>
        <h1 className = 'text-center font-bold uppercase'>Analizador Lexico 2.0</h1>

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
        <p id = 'mensaje' onChange = {e => setMensaje(e.target.value)}>{mensaje}</p>

        {resultado && (
        <div className="mt-5">
          <textarea value={resultado} className="border border-black px-3" cols="60" rows="10" readOnly></textarea>
        </div>
      )}

      {Object.keys(categoriasData).length > 0 && (
        <div className="mt-5">
          <h2>Categorías y Cantidades:</h2>
          <ul>
            {Object.entries(categoriasData).map(([categoria, cantidad]) => (
              <li key={categoria}>
                {`Categoría: ${categoria}, Cantidad: ${cantidad}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div> 
  )
}

export default Ejercicio06