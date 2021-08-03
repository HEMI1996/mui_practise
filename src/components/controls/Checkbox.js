import { FormControlLabel, Checkbox as MuiCheckbox, FormControl } from '@material-ui/core'

export default function Checkbox(props) {
  const { label, name, value, onChange } = props

  const convertToDefEventPara = (value) => ({ target: { name, value } })

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) => onChange(convertToDefEventPara(e.target.checked))}
          />
        }
        label={label}
      />
    </FormControl>
  )
}
