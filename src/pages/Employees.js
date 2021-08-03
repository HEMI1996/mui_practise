import React, { useEffect, useState } from 'react'
import EmployeeForm from './EmployeeForm'
import PageHeader from '../components/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from '@material-ui/core'
import useTable from '../components/useTable'
import * as employeeService from '../services/employeeService'
import Controls from '../components/controls/Controls'
import Popup from '../components/Popup'
import { EditOutlined, Search, Add, DeleteOutline } from '@material-ui/icons'
import Notification from '../components/Notification'
import ConfirmDialog from '../components/ConfirmDialog'

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  },
}))

const headCells = [
  { id: 'fullName', label: 'Employee Name' },
  { id: 'email', label: 'Email Address (Personal)' },
  { id: 'mobile', label: 'Mobile Number' },
  { id: 'department', label: 'Department' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

export default function Employees() {
  const classes = useStyles()
  const [records, setRecords] = useState([])
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [filterFn, setFilterFn] = useState({ fn: (items) => items })
  const [openPopup, setOpenPopup] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  })

  async function getRecords() {
    setRecords(await employeeService.fetchEmployees())
  }

  useEffect(() => {
    getRecords()
  }, [])

  const { TblContainer, TblHead, TblPagination, recordsAfterPaginationandSorting } =
    useTable(records, headCells, filterFn)

  const handleSearch = (e) => {
    let target = e.target
    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items
        else
          return items.filter((item) =>
            item.fullName.toLowerCase().includes(target.value)
          )
      },
    })
  }

  const addOrEdit = async (employee, resetForm) => {
    if (await employeeService.saveEmployeeDetails(employee)) {
      setOpenPopup(false)
      setRecordForEdit(null)
      setNotify({ isOpen: true, message: 'Submitted Successfully', type: 'success' })
      resetForm()
      getRecords()
    }
  }

  const handleEditPopup = (employee) => {
    setRecordForEdit(employee)
    setOpenPopup(true)
  }

  const handleClosePopup = () => {
    setRecordForEdit(null)
    setOpenPopup(false)
  }

  const handleOnDelete = async (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false })
    await employeeService.deleteEmployee(id)
    setNotify({ isOpen: true, message: 'Deleted Successfully', type: 'error' })
    setRecords(await employeeService.fetchEmployees())
  }

  return (
    <>
      <PageHeader
        title="New Employee"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Employees"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<Add />}
            className={classes.newButton}
            onClick={() => setOpenPopup(true)}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPaginationandSorting().map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.fullName}</TableCell>
                <TableCell>{record.email}</TableCell>
                <TableCell>{record.mobile}</TableCell>
                <TableCell>{record.department}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => handleEditPopup(record)}
                  >
                    <EditOutlined fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() =>
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => handleOnDelete(record.id),
                      })
                    }
                  >
                    <DeleteOutline fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        onClickClose={handleClosePopup}
        title="Employee Form"
      >
        <EmployeeForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  )
}
