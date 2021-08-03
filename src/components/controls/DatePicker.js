import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

export default function DatePicker(props) {
  const { label, name, value, onChange } = props

  const convertToDefEventPara = (value) => ({
    target: { name, value },
  })

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        // disableToolbar
        // variant="inline"
        inputVariant="outlined"
        format="MM/dd/yyyy"
        name={name}
        label={label}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(date))}
      />
    </MuiPickersUtilsProvider>
  )
}
