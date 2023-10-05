import React from 'react'
import loading from './images/loading.gif'

const Spinner = () => {

    return (
      <div className='flex justify-center'>
        <img src={loading} alt="Loading..." />
      </div>
    )
  }

  export default Spinner;