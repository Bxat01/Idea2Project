import React, { memo } from 'react';
import { Database, Key, Link, Shield, AlertCircle } from 'lucide-react';

const DatabaseTable = memo(({ table, index }) => {
  const getColumnTypeColor = (type) => {
    if (type.includes('INT')) return 'bg-blue-100 text-blue-800';
    if (type.includes('VARCHAR') || type.includes('TEXT')) return 'bg-emerald-100 text-emerald-800';
    if (type.includes('DATE') || type.includes('TIME')) return 'bg-purple-100 text-purple-800';
    if (type.includes('BOOL')) return 'bg-amber-100 text-amber-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Database className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              {table.table_name}
              {table.columns?.some(col => col.primary) && (
                <Key className="h-4 w-4 text-amber-500" />
              )}
            </h3>
            <p className="text-sm text-gray-500">
              {table.columns?.length || 0} columns • {table.description || 'No description'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Table #{index + 1}</span>
          {table.relationships && (
            <span className="flex items-center gap-1 text-sm text-blue-600">
              <Link className="h-4 w-4" />
              {table.relationships} relations
            </span>
          )}
        </div>
      </div>
      
      {/* Columns Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              <th className="px-5 py-3">Column</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Constraints</th>
              <th className="px-5 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.columns?.map((col, colIndex) => (
              <tr 
                key={colIndex} 
                className="hover:bg-gray-50/50 transition-colors duration-150 group"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{col.name}</span>
                    {col.primary && (
                      <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded flex items-center gap-1">
                        <Key className="h-3 w-3" />
                        PK
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-mono ${getColumnTypeColor(col.type)}`}>
                    {col.type}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1">
                    {col.primary && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded flex items-center gap-1">
                        <Key className="h-3 w-3" />
                        Primary
                      </span>
                    )}
                    {col.unique && (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Unique
                      </span>
                    )}
                    {col.nullable === false && (
                      <span className="px-2 py-1 bg-rose-100 text-rose-800 text-xs rounded flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Not Null
                      </span>
                    )}
                    {col.foreign_key && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded flex items-center gap-1">
                        <Link className="h-3 w-3" />
                        Foreign Key
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-gray-600">
                  {col.description || 'No description'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default DatabaseTable;