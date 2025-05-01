import React from "react"
import { Link } from "react-router-dom"
import { i18n } from "@lingui/core"
import "./LanguageToggler.css"

const LanguageToggler = () => {
  return (
    <>
      <div className="lang-container border border-2 border-info rounded-pill position-relative">
        <div className="lang-btn btn-cs text-center position-absolute">
          <Link
            to={""}
            onClick={(e) => {
              e.preventDefault() // Zabrání výchozímu chování odkazu
              i18n.activate("cs") // Aktivuje češtinu
            }}
            aria-label="Switch to Czech language"
          >
            <img
              className="rounded-5 shadow-sm"
              src={`${process.env.PUBLIC_URL}/Photos/lang/czech.png`}
              alt="Czech language"
              width="35"
              height="auto"
            />
          </Link>
        </div>
        <div className="lang-btn btn-en text-center position-absolute">
          <Link
            to={""}
            onClick={(e) => {
              e.preventDefault() // Zabrání výchozímu chování odkazu
              i18n.activate("en") // Aktivuje češtinu
            }}
            aria-label="Switch to English language"
          >
            <img
              className="rounded-5 shadow-sm"
              src={`${process.env.PUBLIC_URL}/Photos/lang/english.png`}
              alt="English language"
              width="35"
              height="auto"
            />
          </Link>
        </div>
        {/*<li className="my-auto">*/}
        {/*  <a*/}
        {/*      href="#"*/}
        {/*      onClick={(e) => {*/}
        {/*        e.preventDefault() // Zabrání výchozímu chování odkazu*/}
        {/*        i18n.activate("mn") // Aktivuje češtinu*/}
        {/*      }}*/}
        {/*      aria-label="Switch to Mongolian language"*/}
        {/*  >*/}
        {/*    <img*/}
        {/*        className="border rounded-5 shadow-sm"*/}
        {/*        src={`${process.env.PUBLIC_URL}/img/lang/mongolian.png`}*/}
        {/*        alt="Mongolian language"*/}
        {/*        width="35"*/}
        {/*        height="auto"*/}
        {/*    />*/}
        {/*  </a>*/}
        {/*</li>*/}
      </div>
    </>
  )
}

export default LanguageToggler
