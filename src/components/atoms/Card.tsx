import React from 'react'

type BaseProps = React.HTMLAttributes<HTMLDivElement>

export const Card = ({ className = '', ...props }: BaseProps) => {
  return (
    <div
      className={`rounded-lg border border-zinc-200 bg-white shadow-sm ${className}`}
      {...props}
    />
  )
}

export const CardContent = ({ className = '', ...props }: BaseProps) => {
  return <div className={`p-6 ${className}`} {...props} />
}

export default Card


