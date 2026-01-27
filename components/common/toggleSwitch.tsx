"use client";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`
        relative w-11 h-5.5 rounded-full transition-colors duration-300
        ${checked ? "bg-green-700" : "bg-gray-300"}
      `}
    >
      <span
        className={`
          absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow
          transform transition-transform duration-300
          ${checked ? "translate-x-5.5" : "translate-x-0"}
        `}
      />
    </button>
  );
}
