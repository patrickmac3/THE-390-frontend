import React, { useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Container,
  Table,
  Form,
  Accordion,
  Dropdown,
  Row,
  Col,
} from 'react-bootstrap'
import { useProperty } from '../../utils/hooks/PropertyContext'
import axiosInstance from '../../api/axios'
import LargeTitle from '../LargeTitle'

const OperationCopy = () => {
  const { companyFinances, fetchCompanyFinance } = useProperty()
  const companyID = localStorage.getItem('ID')
  const [tempUnitExpense, setTempUnitExpense] = useState(0)

  useEffect(() => {
    fetchCompanyFinance(companyID)
    console.log('Properties finances: ', companyFinances)
  }, [])

  const inputRefs = useRef({})
  const endpointMap = {
    condos: 'condo-unit',
    parkings: 'parking-unit',
    storages: 'storage-unit',
  }

  const handleSaveNewExpense = async (propertyId, type, unitId, newExpense) => {
    const endpoint = `properties/${endpointMap[type]}/${unitId}/`

    const unit = companyFinances.properties[propertyId][type].find(
      u => u.id === unitId,
    )
    const currentExpense = parseFloat(unit.expense || 0)
    const additionalExpense = parseFloat(newExpense)
    const finalExpense = currentExpense + additionalExpense

    try {
      const response = await axiosInstance.patch(endpoint, {
        operational_expense: finalExpense,
      })
      await fetchCompanyFinance(companyID)
      if (inputRefs.current[unitId]) {
        inputRefs.current[unitId].value = '' // Reset input field
      }
    } catch (error) {
      console.error('Error saving new expense:', error.message)
    }
  }

  const handleDeleteNewExpense = async (
    propertyId,
    type,
    unitId,
    newExpense,
  ) => {
    const endpoint = `properties/${endpointMap[type]}/${unitId}/`

    const unit = companyFinances.properties[propertyId][type].find(
      u => u.id === unitId,
    )
    const currentExpense = parseFloat(unit.expense || 0)
    const additionalExpense = parseFloat(newExpense)
    const finalExpense = currentExpense - additionalExpense

    try {
      const response = await axiosInstance.patch(endpoint, {
        operational_expense: finalExpense,
      })
      await fetchCompanyFinance(companyID)
      if (inputRefs.current[unitId]) {
        inputRefs.current[unitId].value = '' // Reset input field
      }
    } catch (error) {
      console.error('Error saving new expense:', error.message)
    }
  }

  return (
    <div>
      <LargeTitle title='Operation Cost' />
      {companyFinances.properties &&
        Object.entries(companyFinances.properties).map(
          ([propertyId, property]) => (
            <div key={propertyId}>
              <>
                <Row>
                  <Col>
                    <h2 className='mt-3'>{property.property_name}</h2>
                  </Col>
                  <Col>
                    <p
                      style={{ color: 'green' }}
                      data-testid={`total-fees-${property.name}`}
                    >
                      Property Fees: ${property.fee}
                    </p>
                    <p
                      style={{ color: 'red' }}
                      data-testid={`total-expenses-${property.name}`}
                    >
                      Property Expenses: ${property.expenses}
                    </p>
                  </Col>
                </Row>
              </>

              <Table
                striped
                bordered
                hover
                style={{ textAlign: 'center', width: '100%' }}
              >
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Unit Number</th>
                    <th>Current Fee</th>
                    <th>Total Expenses</th>
                    <th>Enter New Expense</th>
                    <th>Save</th>
                  </tr>
                </thead>
                {['condos', 'parkings', 'storages'].map(type => (
                  <tbody key={type} style={{ justifyContent: 'center' }}>
                    {property[type].length > 0 ? (
                      property[type].map(unit => (
                        <tr key={unit.id}>
                          <td>{type.slice(0, -1)}</td>
                          <td>{unit[type.slice(0, -1)]}</td>
                          <td>${unit.fee}</td>
                          <td
                            data-testid={`total-expenses-${unit[type.slice(0, -1)]}`}
                          >
                            ${unit.expense}
                          </td>
                          <td>
                            $
                            <input
                              type='number'
                              placeholder='Enter value'
                              ref={e1 => (inputRefs.current[unit.id] = e1)}
                              onChange={e => {
                                setTempUnitExpense(e.target.value)
                                console.log(tempUnitExpense)
                              }}
                              style={{
                                width: '100px',
                                justifyContent: 'center',
                              }}
                              data-testid={`expense-input-${unit[type.slice(0, -1)]}`}
                            />
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                handleSaveNewExpense(
                                  propertyId,
                                  type,
                                  unit.id,
                                  tempUnitExpense,
                                )
                              }
                              style={{ marginRight: '5px' }}
                              data-testid={`add-expense-${unit[type.slice(0, -1)]}`}
                            >
                              Add
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteNewExpense(
                                  propertyId,
                                  type,
                                  unit.id,
                                  tempUnitExpense,
                                )
                              }
                              data-testid={`delete-expense-${unit[type.slice(0, -1)]}`}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='6'>No {type} available</td>
                      </tr>
                    )}
                  </tbody>
                ))}
              </Table>
            </div>
          ),
        )}
      <div>
        <Row>
          <Col>
            <h3 className='mt-4'>Final Total and Expenses</h3>
          </Col>
          <Col>
            <p style={{ color: 'green' }}>Total Fees: ${companyFinances.fee}</p>
            <p style={{ color: 'red' }}>
              Total Expenses: ${companyFinances.expenses}
            </p>
            <h4>Grand Total: ${companyFinances.total}</h4>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default OperationCopy
