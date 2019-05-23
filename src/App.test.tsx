import 'react-testing-library/cleanup-after-each'
import React from 'react';
import App from './App';
import TimeInput from './TimeInput';
import {cleanup, fireEvent, render, within, getByLabelText, getByPlaceholderText} from 'react-testing-library'


const timeInputs = ["1230", "123", "980", "9911", "0989", "9999", "1 11", ]

afterEach(cleanup)

test('a normal input test', () => {
    const { getByTestId } = render(<TimeInput />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: "1232"}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("1232")
})

test('that the code will insert a colon appropriately with 3 inputs', () => {
    const { getByTestId } = render(<App  />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: timeInputs[1]}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("0123")
})

test('3 inputs but the minutes is bigger than 59', () => {
    const { getByTestId } = render(<App />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: '980'}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

test('an hour input that is bigger than 23 hours', () => { // Works in TimeInput but for some reason it the value does not go through the right conditional statement
    const { getByTestId } = render(<App />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: '9911'}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

test('a minute input that is bigger than 59 minutes', () => {
    const { getByTestId } = render(<App />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: '0989'}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

test('a minute and hour input that are both bigger than 59 minutes and 23 hours', () => {
    const { getByTestId } = render(<App />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: '9999'}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

test("there's a space in the user's input", () => {
    const { getByTestId } = render(<App  />)
    // fireEvent.blur(getByTestId('TimeInputID'), {target: {value: '1 11'}}) //the change method does call the handleChange in the TimeInput component
    // fireEvent.blur(getByTestId('TimeInputID'), {target: {value: '1  1'}}) //the change method does call the handleChange in the TimeInput component
    let temp = "11 1";
    console.log("printing", parseInt(temp.slice(2, 3)));
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: temp}}) //the change method does call the handleChange in the TimeInput component
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

test('testing the handleChange function in TimeInput', () => {
    const { getByTestId } = render(<TimeInput />)
    fireEvent.change(getByTestId('TimeInputID'), {target: {value: '1111'}}) //the change method does call the handleChange in the TimeInput component
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("1111")
})
