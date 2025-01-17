import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

// Reducers
import { tasks } from '../reducers/tasks';

// While adding a new task to the store, these lines put the message in a string,
// gives it an id -number and sets default status to empty checkbox = not completed.
export const AddTask = () => {
  const [text, setText] = useState('');
  const [id, setId] = useState(1);
  const isComplete = false;

  // Makes the allTasksArray find all available tasks in the store.
  const allTasksArray = useSelector((store) => store.tasks.items)

  const dispatch = useDispatch();

  // When submitbutton is clicked the dispatch makes the store pick up the information
  // and add it to the store
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(tasks.actions.addTask({ id, text, isComplete }));
    setText('');
  }

  const onChangeEvent = (value) => {
    setText(value);
    // makes the id be the next number after current number of tasks.
    // If there are no previous tasks the id will be set to 1.
    setId(allTasksArray.length === 0 ? 1 : allTasksArray[allTasksArray.length - 1].id + 1);
  }

  return (
    <FormOuterWrapper>
      <FormInnerWrapper onSubmit={handleSubmit}>
        <InputField
          type="text"
          required
          value={text}
          placeholder="Add new task..."
          onChange={(event) => onChangeEvent(event.target.value)} />
        <ButtonStyle type="submit">✕</ButtonStyle>
      </FormInnerWrapper>
    </FormOuterWrapper>
  )
}

export const FormOuterWrapper = styled.div`
background-color: #F69101;
display:flex;
justify-content: center;
border-bottom-left-radius: 200px;
margin-top: -2px;
`;

export const FormInnerWrapper = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`;

export const InputField = styled.input`
outline-color: #F69101;
border:none;
margin: 15px;
border-radius: 5px;
font-size: 16px;
font-family: 'Roboto', sans-serif;
`;

export const ButtonStyle = styled.button`
height: 40px;
width: 40px;
font-size: 20px;
font-weight: bold;
transform: rotate(-45deg); //Rotates the X-sign to +
border-radius: 25px;
border: none;
margin-bottom: 20px;
background: white;
color: #F69101;
display: flex;
align-items: center;
justify-content: center;

&:hover {
  cursor: pointer;
  background: white;
  color: black;
}
`;

/* export const ButtonStyle = styled.button`
background: white;
border-color: #F69101;
color: black;
font-size: 30px;
width: 1.5em;
height: 1.5em;
margin-bottom: 15px;
border-radius: 205px;
border: none;
outline: none;
text-align: center;
font-family: 'Roboto', sans-serif;
cursor: pointer;
`; */