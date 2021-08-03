import { useState } from 'react'
import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      color: theme.palette.primary.main,
      fontWeight: '600',
      backgroundColor: theme.palette.primary.light,
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}))

export default function useTable(records, headCells, filterFn) {
  const classes = useStyles()

  const recordsPerPage = [5, 10, 20]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(recordsPerPage[0])
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()

  const TblContainer = (props) => {
    return <Table className={classes.table}>{props.children}</Table>
  }

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(cellId)
  }

  const TblHead = (props) => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => handleSortRequest(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  const handlePageChange = (_, page) => {
    setPage(page)
  }

  const handleRecordsPerPageChange = (event) => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  const recordsAfterPaginationandSorting = () => {
    return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(
      rowsPerPage * page,
      (page + 1) * rowsPerPage
    )
  }

  const TblPagination = (props) => (
    <TablePagination
      component="div"
      count={records.length}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={recordsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRecordsPerPageChange}
    />
  )

  return { TblContainer, TblHead, TblPagination, recordsAfterPaginationandSorting }
}
