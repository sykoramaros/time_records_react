import React from "react";
import { TimePicker } from "react-ios-time-picker";

const TimeSelect = ({ id, value, onChange }) => {
    // Místo vlastního stavu používáme hodnotu předanou z rodičovské komponenty

    // Zpracování změny času a volání rodičovské funkce onChange
    const handleChange = (timeValue) => {
        if (onChange) {
            onChange({
                         // Vytvoříme objekt podobný události změny v input elementu
                         target: {
                             id: id,
                             value: timeValue
                         }
                     });
        }
    };

    return (
        <div>
            <TimePicker
                id={id}
                value={value}
                onChange={handleChange}
                pickerDefaultValue={"01:00"}
                theme="#42a5f5"
            />
        </div>
    );
};

export default TimeSelect;