import React from 'react'

type BaseProps = React.HTMLAttributes<HTMLDivElement>

export const Card = ({ className = '', ...props }: BaseProps) => {
  // Using <section> for Card for semantic grouping
  return (
    <section
      className={`rounded-lg border border-zinc-200 bg-white shadow-sm ${className}`}
      {...props}
    />
  )
}

export const CardContent = ({ className = '', ...props }: BaseProps) => {
  // Using <article> for CardContent for semantic content
  return <article className={`p-6 ${className}`} {...props} />
}

export default Card


