'use client'

export const printPDF = async (blob: Blob | MediaSource) => {
  console.log("PRINTING BLOB");
  
  return new Promise<void>((resolve, reject) => {
    const url = URL.createObjectURL(blob)
    const printIframe = document.createElement('iframe')
    printIframe.style.display = 'none'
    printIframe.src = url
    printIframe.onload = () => {
      if(printIframe.contentWindow){
        try {
          printIframe.contentWindow.print()
          //TODO Ver si esto es necesario, en el modo kiosko aunque esto este comentado la ventana se cierra igual
          setTimeout(() => {
            document.body.removeChild(printIframe)
            URL.revokeObjectURL(url)
            resolve()
          }, 2000)
        } catch (error) {
          reject(new Error('Error al imprimir: ' + error))
        }
      } else {
        reject(new Error('Error al imprimir: No se pudo acceder al contentWindow'))
      }
    }
    printIframe.onerror = () => {
      document.body.removeChild(printIframe)
      URL.revokeObjectURL(url)
      reject(new Error('Error al cargar el PDF'))
    }
    document.body.appendChild(printIframe)
  })
}
