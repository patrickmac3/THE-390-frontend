import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Table, Form, Accordion } from "react-bootstrap";

const Operation = () => {
    const [selectedValues, setSelectedValues] = useState([
        // TODO: Reformat the variables (i.e. Have 1 variable for each column). Match the variables to their respective rows
        // TODO: After reformating the variables, change the dependent handle-methods and their implementations in the return section if needed
        { 
            title: 'Property 1', 
            rows: [{ unit: '', type: '', value: '' }], 
            date: null 
        },
        { 
            title: 'Property 2', 
            rows: [{ unit: '', type: '', value: '' }],
            date: null 
        },
        { 
            title: 'Property 3', 
            rows: [{ unit: '', type: '', value: '' }],
            date: null 
        }
    ]);

    const handleDropdownSelect = (value, type, propertyIndex, rowIndex) => {
        const updatedValues = [...selectedValues];
        updatedValues[propertyIndex].rows[rowIndex][type] = value;
        setSelectedValues(updatedValues);
    };

    const handleDateChange = (date, propertyIndex) => {
        const updatedValues = [...selectedValues];
        updatedValues[propertyIndex].date = date;
        setSelectedValues(updatedValues);
    };

    const handleAddRow = (propertyIndex) => {
        const updatedValues = [...selectedValues];
        updatedValues[propertyIndex].rows.push({ type: '', value: '' });
        setSelectedValues(updatedValues);
    };

    // TODO: Add delete row handler
    // TODO: Update the variables with value in the form
    // TODO: Validate input, type checking (now or a later sprint)
    return (
        <Container className="mt-5">
            <div className="d-flex flex-column align-items-center">
                <h1 style={{ fontSize: "40px", marginBottom: "30px", fontWeight: "bold" }}>EDIT OPERATION COST</h1>
            </div>
            <Accordion defaultActiveKey="0">
                {selectedValues.map((property, propertyIndex) => (
                    <Accordion.Item key={propertyIndex} eventKey={propertyIndex.toString()}>
                        <Accordion.Header>{property.title}: $0.00</Accordion.Header>
                        <Accordion.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{ width: "16.67%" }}>Unit</th>
                                        <th style={{ width: "16.67%" }}>Operation type</th>
                                        <th style={{ width: "16.67%" }}>Operation cost</th>
                                        <th style={{ width: "16.67%" }}>Date</th>
                                        <th style={{ width: "16.67%" }}>Operation fee</th>
                                        <th style={{ width: "16.67%" }}>Net Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {property.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    value={row.unit}
                                                    onChange={(e) => handleDropdownSelect(e.target.value, 'unit', propertyIndex, rowIndex)}
                                                >
                                                    <option value="unit1">Unit 1</option>
                                                    <option value="unit2">Unit 2</option>
                                                    <option value="unit3">Unit 3</option>
                                                </Form.Select>
                                            </td>
                                            <td>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    value={row.type}
                                                    onChange={(e) => handleDropdownSelect(e.target.value, 'type', propertyIndex, rowIndex)}
                                                >
                                                    <option value="type1">Type 1</option>
                                                    <option value="type2">Type 2</option>
                                                    <option value="type3">Type 3</option>
                                                </Form.Select>
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="0.00"
                                                />
                                            </td>
                                            <td>
                                                {/**
                                                 * TODO: Make changes to the date individual to each row
                                                 */}
                                                <DatePicker
                                                    selected={property.date}
                                                    onChange={(date) => handleDateChange(date, propertyIndex)}
                                                    dateFormat="yyyy-MM-dd"
                                                    isClearable
                                                    placeholderText="Select a date"
                                                />
                                            </td>
                                            <td>
                                                0.00
                                            </td>
                                            <td>
                                                0.00
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>Total</td>
                                        <td>$0.00</td>
                                        <td></td>
                                        <td></td>
                                        <td>$0.00</td>
                                        <td>$0.00</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <button onClick={() => handleAddRow(propertyIndex)}>Add Row</button>
                            {/**
                             * TODO: Add button to delete the last row (not including the total row)
                             */}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}

export default Operation;
