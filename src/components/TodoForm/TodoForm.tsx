import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../hook";
import { addTodo } from "../../store/todoSlice";

const ContainerFormStyled = styled.form`
  display: flex;
`;
const SubmitButtonStyled = styled.button`
  margin: 0 10px;
  padding: 15px;
  border-radius: 10px;
  border: 1px grey solid;
`;

const InputFormStyled = styled.input`
  padding: 15px;
  width: 70%;
  border-radius: 10px;
  border: 1px grey solid;
`;

export const TodoForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      dispatch(addTodo(value));
    }
    setValue("");
  };

  return (
    <ContainerFormStyled onSubmit={handleSubmit}>
      <InputFormStyled type="text" value={value} onChange={changeHandler} />
      <SubmitButtonStyled disabled={!value} type="submit">
        Отправить
      </SubmitButtonStyled>
    </ContainerFormStyled>
  );
};
