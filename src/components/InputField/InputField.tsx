import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
  showStrength?: boolean;
  showClear?: boolean;
  placeholder?: string;
}

export default function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  showPasswordToggle,
  showStrength,
  showClear,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Password Strength Calculation
  const getStrength = (val: string) => {
    if (!val) return { label: "Weak", color: "bg-red-500 w-1/4" };
    if (val.length < 6) return { label: "Weak", color: "bg-red-500 w-1/4" };
    if (val.match(/[A-Z]/) && val.match(/[0-9]/) && val.length >= 8)
      return { label: "Strong", color: "bg-green-500 w-3/4" };
    return { label: "Medium", color: "bg-yellow-500 w-2/4" };
  };

  const strength = getStrength(value);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium dark:text-white">{label}</label>
      <div className="relative">
        <input
          type={showPassword && type === "password" ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
                     placeholder-gray-500 dark:placeholder-gray-300"
        />
        {/* Password Toggle */}
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-10 top-2.5 text-gray-500 dark:text-gray-300"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {/* Clear Input */}
        {showClear && value && (
          <button
            type="button"
            onClick={() => onChange({ target: { value: "" } } as any)}
            className="absolute right-2 top-2.5 text-gray-500 dark:text-gray-300"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Strength Meter → show only when value is not empty */}
      {showStrength && type === "password" && value && (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full ${strength.color}`} />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {strength.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
