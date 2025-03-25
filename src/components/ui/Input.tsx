import React from 'react';

interface InputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder, multiline, rows }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange as any}
          placeholder={placeholder}
          rows={rows || 3}
          className="w-full border rounded p-2"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border rounded p-2"
        />
      )}
    </div>
  );
};