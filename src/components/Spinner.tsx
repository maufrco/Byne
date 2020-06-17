import React, { Fragment } from 'react'

const Spinner = () => {
  const spinnerStyle = {
    width: '10rem',
    height: '10rem'
  }
  return (
    <Fragment>
      <div className="d-flex justify-content-center">
        <div className="spinner-border my-5" style={spinnerStyle} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </Fragment>
  )
}
export default Spinner
