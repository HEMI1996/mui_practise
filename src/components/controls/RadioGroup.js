import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from '@material-ui/core'

export default function RadioGroup(props) {
  const { label, name, value, items, onChange } = props
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            label={item.title}
            control={<Radio />}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  )
}
