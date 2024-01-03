import React from 'react';

interface CheckboxFilterProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
    </div>
  );
};

export default CheckboxFilter;