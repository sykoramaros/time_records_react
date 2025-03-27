import React from "react"
import { NavLink } from "react-router-dom";
import { Trans } from "@lingui/react"

const Footer = () => {
  return (
    <div>
          <div className="row mx-auto">
            <div className="col mx-4">
              <NavLink to="/privacy " className="text-info text-shadow fw-semibold fs-5">
                <Trans id="footer.privacy">Privacy</Trans>
              </NavLink>
            </div>
          </div>
    </div>
  )
}

export default Footer
