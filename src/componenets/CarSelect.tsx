import { CARS_LIST } from "@/config";
import React from "react";

type Car = {
  label: string;
  value: string;
};

const CarSelect: React.FC = () => {
  return (
    <select>
      {CARS_LIST.map((car) => (
        <option key={car.value} value={car.value}>{car.label}</option>
      ))}
    </select>
  );
};

export default CarSelect;