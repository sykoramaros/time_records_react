import React from "react"
import { useState, useEffect } from "react"
import { getChosenMonthStatus } from "../../Services/ChosenMonthStatusService/ChosenMonthStatusService";

const ChosenMonthStatus = ({ month, year }) => {
    const [chosenMonth, setChosenMonth] = useState(0);
    const [chosenYear, setChosenYear] = useState(0);
    const [handleResult, setHandleResult] = useState(null);
    const [result, setResult] = useState(null);

    // const handleMonthChange = (date) => {
    //     setCurrentViewMonth(date.getMonth() + 1)
    //     setCurrentViewYear(date.getFullYear())
    //     console.log("Month: ", date.getMonth(), "Year: ", date.getFullYear())
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const handleData = await getChosenMonthStatus(null, chosenMonth, chosenYear);
        console.log("HandleSubmitData:", handleData);
        setHandleResult(handleData);
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if(month !== null && year !== null) {
            const fetchData = async () => {
                try {
                    const data = await getChosenMonthStatus(null, month, year);
                    console.log("Data:", data);
                    setResult(data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
            fetchData();
        }
    }, [month, year]);



    return (
        <div>
            {/*<form onSubmit={handleSubmit}>*/}
            {/*<input*/}
            {/*    type="number"*/}
            {/*    placeholder="Month"*/}
            {/*    id="month"*/}
            {/*    min="1"*/}
            {/*    max="12"*/}
            {/*    value={chosenMonth}*/}
            {/*    onChange={(e) => setChosenMonth(e.target.value)}*/}
            {/*    required*/}
            {/*/>*/}
            {/*<input*/}
            {/*    type="number"*/}
            {/*    placeholder="Year"*/}
            {/*    id="year"*/}
            {/*    min="2024"*/}
            {/*    max="2050"*/}
            {/*    value={chosenYear}*/}
            {/*    onChange={(e) => setChosenYear(e.target.value)}*/}
            {/*    required*/}
            {/*/>*/}
            {/*<button onClick={handleSubmit}>Zobrazit stav</button>*/}
                {/*</form>*/}
            {/*<p>*/}
            {/*    {result && (typeof result === 'object' ? JSON.stringify(result, null, 2) : result)}*/}
            {/*</p>*/}
            {/*<p>{handleResult?.hours || "0"} : {handleResult?.minutes || "0"}</p>*/}
            {/*<p>{month} {year}</p>*/}
            {/*<p>{result?.hours || "0"} : {result?.minutes || "0"}</p>*/}
            {/*<h2 className="text-center text-white display-3 text-shadow-primary py-4">{result?.hours || "0"} : {result?.minutes || "0"}</h2>*/}

            <h2 className="display-4 text-center fw-normal d-inline-block bg-primary text-info py-3 px-4 rounded-5">{result?.hours || "0"} : {result?.minutes || "0"}</h2>

        </div>
    );
};
export default ChosenMonthStatus