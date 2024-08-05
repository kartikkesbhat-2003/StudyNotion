import React from 'react'

export const HighlightText = ({text, gradient}) => {

  return (
    <span className={`font-bold gradient-${gradient}`}>{` ${text} `}</span>
  )

}
