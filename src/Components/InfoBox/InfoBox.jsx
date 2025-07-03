import React from "react"
import "./InfoBox.css"
import { Trans } from "@lingui/react"

const InfoBox = ({ chosenMonthRecord }) => {
  return (
    <>
      <fieldset className="info-box border border-3 border-white rounded-4">
        <legend className="text-info fs-3">
          <Trans id="infoBox.legend">Info</Trans>
        </legend>
        <div className="fs-4 ms-3">
          <p className="text-info fw-normal">
            <Trans id="infoBox.hours">Hours:</Trans>:{" "}
            <span className="text-white fw-semibold">
              {chosenMonthRecord?.recordTime?.substring(0, 5)}
              {/* {timeResult?.hours.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
              })}{" "}
              :{" "}
              {timeResult?.minutes.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
              })} */}
            </span>
          </p>
          <p className="text-info fw-normal">
            <Trans id="infoBox.credit">Credit:</Trans>:{" "}
            <span className="text-white fw-semibold">
              {chosenMonthRecord?.recordCreditTime?.substring(0, 5)}
            </span>
          </p>
          <p className="text-info fw-normal">
            <Trans id="infoBox.studies">Studies:</Trans>:{" "}
            <span className="text-white fw-semibold">
              {chosenMonthRecord?.recordStudy}
            </span>
          </p>
        </div>
      </fieldset>
    </>
  )
}

export default InfoBox
