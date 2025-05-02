import React from "react"
import "./InfoBox.css"
import { Trans } from "@lingui/react"

const InfoBox = ({ result, studies }) => {
  return (
    <>
      <fieldset className="info-box border border-3 border-white rounded-4">
        <legend className="text-info fs-3">
          <Trans id="infoBox.legend">Info</Trans>
        </legend>
        <div className="text-white fs-4 ms-3">
          <p>
            <Trans id="infoBox.hours">Hours:</Trans>:{" "}
            <span>
              {result?.hours.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
              })}{" "}
              :{" "}
              {result?.minutes.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
              })}
            </span>
          </p>
          <p>
            <Trans id="infoBox.studies">Studies:</Trans>: <span>{studies}</span>
          </p>
        </div>
      </fieldset>
    </>
  )
}

export default InfoBox
