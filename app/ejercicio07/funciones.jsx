import React from "react";
import {useState} from 'react'



//Funcion para procesar el contenido
export const procesarContenido = (contenido, setMensaje, diccionario) => {
    //Array de palabras vacio que se llenara despues
    let palabrasEncontradas = []

    // Objeto para llevar el registro de palabras por categoría
    const palabrasPorCategoria = {};
    // Comprobar si el contenido de la entrada es una cadena
    if (typeof contenido !== 'string') {
        setMensaje('Error: El contenido no es una cadena de texto válida');
        return;
    }
    
    const nuevoContenido = contenido.replace(/\/\/[^\n\r]*|\/\*[\s\S]*?\*\//g, '');
    const contenidoFiltrado = nuevoContenido.match(/[\(\)\{\}\[\]]|\w+|\S/g);
      
    // Este código procesa un array de palabras llamado "contenidoFiltrado"
    if (contenidoFiltrado) {
       
        palabrasEncontradas = contenidoFiltrado.map((palabra) => {  // El resultado se almacena en un nuevo array llamado "palabrasEncontradas".
           
            if (/^\d+$/.test(palabra)) { 
                return `${palabra} = NUM`;  // Si una palabra es un número, se etiqueta como "NUM". 
            }
            
            const categorias = diccionario // Definimos un arreglo llamado 'categorias'
        
            .map((conjunto) => conjunto.nombre.find((item) => item.lexema === palabra)) // Para cada conjunto en el diccionario, buscamos un item que tenga el mismo lexema que la palabra
            
            .filter(Boolean) // Filtramos los resultados para eliminar valores nulos o indefinidos
            .map((categoria) => categoria.categoria);  // Luego, mapeamos los resultados para obtener la propiedad 'categoria' de cada objeto encontrado

            // Finalmente, creamos una cadena de texto que muestra la palabra y sus categorías, o 'ID' si no se encontraron categorías
            return `${palabra} = ${categorias.length > 0 ? categorias.join(', ') : 'ID'}`;
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
        return palabrasEncontradas;
};

//Funcion para leerunArchivo
export function readAndDisplayFile(file, callback) {
    const filereader = new FileReader(); // Crea una nueva instancia de FileReader.
    filereader.readAsText(file); // lee el contenido del archivo de texto

    // Funcion para obtener el contenido del fill y se la pasa un callback
    filereader.onload = function () {
        const data = filereader.result; // se obtiene el conetenido del archivo
        callback(data); // Llama a la devolución de llamada proporcionada con los datos.
    };
};

//Funcion para obtener las palabras por categorias
export const mostrarPalabrasPorCategoria = (result, setCategoriasData) => {
    const categorias = {};

    result.forEach((token) => {
      const [, categoria] = token.split(' = ');
      if (categoria in categorias) {
        categorias[categoria] += 1;
      } else {
        categorias[categoria] = 1;
      }
    });
    
    setCategoriasData(categorias);
  };



