import { useState } from "react";

const CheckboxFilter = ({ options = ["boys", "girls", "both"], onFilterChange}) => {
    const [selected, setSelected] = useState([]);

    const handleCheckboxChange = (option) => {
        const newSelected = selected.includes(option)
            ? selected.filter((item) => item !== option) // Supprime si déjà coché
            : [...selected, option]; // Ajoute si décoché

        setSelected(newSelected);
        onFilterChange(newSelected); // Envoie les nouvelles valeurs au parent
    };

    return (
        <div className="flex flex-col gap-2">
            {options.map((option) => (
                <label key={option} className={`flex items-center gap-2 cursor-pointer capitalize`} >
                    <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="w-5 h-5 accent-primary"
                    />
                    {option}
                </label>
            ))}
        </div>
    );
};

export default CheckboxFilter;
