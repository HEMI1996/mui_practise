export const BASE_URL = 'http://localhost:8000/'
const RESOURCE = 'employees'

const EMPLOYEE_URL = `${BASE_URL}${RESOURCE}`

export const getDepartmentCollection = () => [
  { id: '1', title: 'Development' },
  { id: '2', title: 'Marketing' },
  { id: '3', title: 'Accounting' },
  { id: '4', title: 'HR' },
]

export const saveEmployeeDetails = async (record) => {
  const url = record.id ? `${EMPLOYEE_URL}/${record.id}` : EMPLOYEE_URL
  const method = record.id ? 'PUT' : 'POST'
  try {
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    })

    return true
  } catch (error) {
    return false
  }
}

export const fetchEmployees = async () => {
  const res = await fetch(EMPLOYEE_URL)
  const employees = await res.json()

  const departments = getDepartmentCollection()

  return employees.map((employee) => {
    let department = ''
    departments.forEach((dep) => {
      if (dep.id == employee.departmentId) department = dep.title
    })
    return { ...employee, department }
  })
}

export const deleteEmployee = async (id) => {
  const url = `${EMPLOYEE_URL}/${id}`

  try {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return true
  } catch (error) {
    return false
  }
}
