import React from "react"

const Settings = () => {
  return (
    <div>
      <div className="container">
        <h1 className="text-center py-4">Settings</h1>
        <div className="mx-auto">
          <div class="input-group mb-3 d-flex justify-content-center">
            <span class="input-group-text">Monthly time goal</span>
            <input
              type="text"
              class="form-control text-center"
              placeholder="0 h"
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              style={{ maxWidth: "7ch" }}
            />
            <button
              class="btn btn-outline-success"
              type="button"
              id="button-addon1"
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
