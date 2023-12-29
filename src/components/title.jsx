import React from 'react'

const TitleComp = ({ title, pos }) => {
  return (
    <h3 className={`${pos} p-3`}>{title}</h3>
  )
}

export default TitleComp