import * as React from 'react';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

interface Props {
  path: string;
  height: number;
}

export default function PdfViewer({ path, height }: Props ) {

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const zoomPluginInstance = zoomPlugin();

  //TODO descargar el pdf worker para publicarlo en nuestro server
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
        <div style={{ height: `${height}px` }}>
            <Viewer
                fileUrl={ path }
            />
        </div>
    </Worker>
  )
}