import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Table, Form, Accordion, Dropdown, Row, Col } from "react-bootstrap";
import { useProperty } from "../../utils/hooks/PropertyContext";
import axiosInstance from "../../api/axios";
import LargeTitle from "../LargeTitle";

const OperationCopy = () => {

  const { companyFinances, fetchCompanyFinance } = useProperty();
  const companyID = localStorage.getItem("ID");

  useEffect(() => {
    fetchCompanyFinance(companyID);
    console.log("Properties finances: ", companyFinances);
  }, [])

  const handleSaveNewExpense = (propertyId, type, unitId, newExpense) => {
    console.log(`Saving new expense for ${type} ${unitId} in property ${propertyId}: $${newExpense}`);
    console.log(companyFinances.properties)
    //FIXME confirm with backend if it's possible to update the expense for a specific unit
    try {
      axiosInstance.get(`profiles/company-profile/${companyID}/finance-report/`,
        companyFinances
      );
    } catch (error) {
      console.error("Error saving new expense:", error.message);
    }
  };


  return (
    <div>
      <LargeTitle title="Operation Cost" />
      {companyFinances.properties && Object.entries(companyFinances.properties).map(([propertyId, property]) => (
        <div key={propertyId}>
          <>
            <Row>
              <Col>
                <h2 className="mt-3">{property.property_name}</h2>
              </Col>
              <Col>
                <p style={{ color: "green" }}>Property Fees: ${property.fee}</p>
                <p style={{ color: "red" }}>Property Expenses: ${property.expenses}</p>
              </Col>
            </Row>
          </>



          <Table striped bordered hover style={{ textAlign: 'center', width: '100%' }}>
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
              <tbody key={type} style={{ justifyContent: "center" }}>
                {property[type].length > 0 ? (
                  property[type].map(unit => (
                    <tr key={unit.id}>
                      <td>{type.slice(0, -1)}</td>
                      <td>{unit[type.slice(0, -1)]}</td>
                      <td>{unit.fee}</td>
                      <td>{unit.expense}</td>
                      <td>
                        <input type="number" placeholder="Enter value"
                          onChange={

                            (e) => {
                              unit.expense = e.target.value
                              console.log(unit.expense)
                            }
                          }
                        />
                      </td>
                      <td>
                        <button onClick={() => handleSaveNewExpense(propertyId, type, unit.id, unit.newExpense)}>
                          Save
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No {type} available</td>
                  </tr>
                )}
              </tbody>
            ))}
          </Table>
        </div>
      ))}
      <div>
        <Row>
          <Col>
            <h3 className="mt-4">Final Total and Expenses</h3>
          </Col>
          <Col>
            <p style={{ color: "green" }}>Total Fees: ${companyFinances.fee}</p>
            <p style={{ color: "red" }}>Total Expenses: ${companyFinances.expenses}</p>
            <h4>Grand Total: ${companyFinances.total}</h4>
          </Col>
        </Row>



      </div>
    </div>
  );
}

export default OperationCopy;
