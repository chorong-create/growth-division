'use client';

import { useRef, useState } from 'react';
import { parseCSV, parseXLSX } from '@/lib/utils/fileImport';

interface FileUploadZoneProps {
  onFileLoaded: (headers: string[], rows: string[][]) => void;
  onError: (msg: string) => void;
}

export default function FileUploadZone({ onFileLoaded, onError }: FileUploadZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function processFile(file: File) {
    const ext = file.name.split('.').pop()?.toLowerCase();
    const reader = new FileReader();

    if (ext === 'csv') {
      reader.onload = e => {
        const result = parseCSV(e.target?.result as string);
        if (result.headers.length === 0) { onError('File is empty'); return; }
        onFileLoaded(result.headers, result.rows);
      };
      reader.readAsText(file, 'UTF-8');
    } else if (ext === 'xlsx' || ext === 'xls') {
      reader.onload = e => {
        const result = parseXLSX(e.target?.result as ArrayBuffer);
        if (result.headers.length === 0) { onError('File is empty'); return; }
        onFileLoaded(result.headers, result.rows);
      };
      reader.readAsArrayBuffer(file);
    } else {
      onError('Unsupported format. Use .csv or .xlsx');
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        className="hidden"
        onChange={handleFileSelect}
      />
      <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
      <p className="text-sm text-gray-500">
        Drop CSV or Excel file here, or <span className="text-indigo-600 font-medium">click to browse</span>
      </p>
    </div>
  );
}
