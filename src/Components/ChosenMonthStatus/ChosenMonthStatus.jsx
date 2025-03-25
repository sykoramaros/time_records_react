import React from "react"
import { useState, useEffect } from "react"
import { getUserFromLocalStorage } from "../../Services/GoogleService/GoogleService";
import { getChosenMonthStatus } from "../../Services/ChosenMonthStatusService/ChosenMonthStatusService";
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min";

const ChosenMonthStatus = ({ month, year }) => {
    const [chosenMonth, setChosenMonth] = useState(0);
    const [chosenYear, setChosenYear] = useState(0);
    const [handleResult, setHandleResult] = useState(null);
    const [result, setResult] = useState(null);

    const userLocal = getUserFromLocalStorage();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const handleData = await getChosenMonthStatus(userLocal.id, chosenMonth, chosenYear);
        console.log("HandleSubmitData:", handleData);
        setHandleResult(handleData);
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {

    }, []);

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
            <h2
                className="display-4 text-center fw-normal d-inline-block bg-primary text-info py-3 px-4 rounded-5"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-html="true"
                data-bs-title="<strong>Time</strong> records during <strong>chosen</strong> month"
                style={{ cursor: "pointer" }}
            >
                {result?.hours || "0"} : {result?.minutes || "0"}
            </h2>

        </div>
    );
};
export default ChosenMonthStatus