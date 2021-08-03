import React from 'react'
import { TextField } from '@material-ui/core'

export default function Input(props) {
  const { variant, label, name, value, error = null, onChange, ...rest } = props
  return (
    <TextField
      variant={variant || 'outlined'}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...rest}
      {...(error && { error: true, helperText: error })}
    />
  )
}
