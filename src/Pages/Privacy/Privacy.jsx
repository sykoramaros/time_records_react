import React from "react"
import "./Privacy.css"
import { Trans } from "@lingui/react"

const Privacy = () => {
    return (
        <div>
            <div className="container">
                <h1 className="text-center text-white display-3 text-shadow-primary py-4">
                    <Trans id="privacy.h1">Privacy</Trans>
                </h1>
                <div className="privacy-container text-info text-center bg-primary p-5 w-75 mx-auto">
                    <h2><Trans id="privacy.intro_h2">Introduction</Trans></h2>
                    <p>
                        <Trans id="privacy.intro_p">
                            We value your privacy and are committed to protecting your personal data.
                        </Trans>
                    </p>

                    <h2><Trans id="privacy.data_h2">Data Collection</Trans></h2>
                    <p>
                        <Trans id="privacy.data_p">
                            We collect personal information to provide and improve our services.
                        </Trans>
                    </p>

                    <h2><Trans id="privacy.usage_h2">How We Use Your Data</Trans></h2>
                    <p>
                        <Trans id="privacy.usage_p">
                            Your data is used to enhance user experience, ensure security, and comply with legal obligations.
                        </Trans>
                    </p>
                    <h2><Trans id="privacy.free_h2">Service is free</Trans></h2>
                    <p>
                        <Trans id="privacy.free_p">
                            If you have any questions about our privacy policy, feel free to contact us.
                        </Trans>
                    </p>
                    <h2><Trans id="privacy.contact_h2">Contact Us</Trans></h2>
                    <p>
                        <Trans id="privacy.contact_p">
                            If you have any questions about our privacy policy, feel free to contact us.
                        </Trans>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Privacy