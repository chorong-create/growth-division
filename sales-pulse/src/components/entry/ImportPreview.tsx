'use client';

interface ImportPreviewProps {
  headers: string[];
  rows: string[][];
}

export default function ImportPreview({ headers, rows }: ImportPreviewProps) {
  const preview = rows.slice(0, 5);

  return (
    <div className="overflow-x-auto">
      <div className="text-xs text-gray-500 mb-2">
        Total rows: <strong>{rows.length}</strong> | Columns: <strong>{headers.length}</strong>
      </div>
      <table className="w-full text-xs border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((h, i) => (
              <th key={i} className="px-2 py-1.5 text-left font-medium text-gray-600 border-b border-gray-200">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {preview.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100">
              {headers.map((_, ci) => (
                <td key={ci} className="px-2 py-1.5 text-gray-700">{String(row[ci] || '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
