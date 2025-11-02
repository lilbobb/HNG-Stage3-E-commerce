import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-bold mb-2 text-dark">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-6 py-4 border rounded-lg font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? 'border-red-500' : 'border-light'
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;