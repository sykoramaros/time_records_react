import React, { useState } from "react";
import "./DualSelectTimerPicker.css";

const DualSelectTimePicker = ({ onChange, value, id }) => {
    // Extrahovat počáteční hodiny a minuty z props.value (pokud existuje)
    const parseInitialTime = () => {
        if (value && typeof value === 'string') {
            const [h, m] = value.split(':');
            return { initialHours: h || "12", initialMinutes: m || "00" };
        }
        return { initialHours: "12", initialMinutes: "00" };
    };

    const { initialHours, initialMinutes } = parseInitialTime();
    const [hours, setHours] = useState(initialHours);
    const [minutes, setMinutes] = useState(initialMinutes);

    // Generování možností pro hodiny (0-23)
    const hoursOptions = Array.from({ length: 24 }, (_, i) => {
        const value = i.toString().padStart(2, "0");
        return (
            <option key={value} value={value}>
                {value}
            </option>
        );
    });

    // Generování možností pro minuty (0-55 s krokem 5 minut)
    const minutesOptions = Array.from({ length: 12 }, (_, i) => {
        const value = (i * 5).toString().padStart(2, "0");
        return (
            <option key={value} value={value}>
                {value}
            </option>
        );
    });

    // Aktualizace času při změně
    const handleTimeChange = (type, value) => {
        let newHours = hours;
        let newMinutes = minutes;

        if (type === "hours") {
            setHours(value);
            newHours = value;
        } else {
            setMinutes(value);
            newMinutes = value;
        }

        // Formátování nové hodnoty času
        const newTime = `${newHours}:${newMinutes}`;

        // Vytvoření objektu podobného DOM události
        if (onChange) {
            const syntheticEvent = {
                target: {
                    id: id,
                    value: newTime
                }
            };
            onChange(syntheticEvent);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <select
                value={hours}
                onChange={(e) => handleTimeChange("hours", e.target.value)}
                className="timer-select py-1 px-2 fs-4 fw-normal rounded-start-5 border-success border-2 bg-secondary text-white"
            >
                {hoursOptions}
            </select>
            <span className="fs-4 mx-1 text-success">:</span>
            <select
                value={minutes}
                onChange={(e) => handleTimeChange("minutes", e.target.value)}
                className="timer-select py-1 px-2 fs-4 fw-normal rounded-end-5 border-success border-2 bg-secondary text-white"
            >
                {minutesOptions}
            </select>
            <span className="ml-3">
            </span>
        </div>
    );
};

export default DualSelectTimePicker;