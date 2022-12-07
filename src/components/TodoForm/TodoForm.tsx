import React, { useState } from "react";
import styled from "styled-components";
import { useAddFetchTodosMutation, useFetchTodosQuery } from "../../api";
import { Spiner } from "../Spiner/Spiner";

const ContainerFormStyled = styled.form`
  display: flex;
`;
const SubmitButtonStyled = styled.button`
  min-width: 100px;
  margin: 0 10px;
  padding: 15px;
  border-radius: 10px;
  border: 1px grey solid;
  display: flex;
  justify-content: center;
`;

const InputFormStyled = styled.input`
  padding: 15px;
  width: 70%;
  border-radius: 10px;
  border: 1px grey solid;
`;

export const TodoForm: React.FC = () => {
  const { refetch } = useFetchTodosQuery();

  const [addTodo, { isLoading }] = useAddFetchTodosMutation();

  const [value, setValue] = useState<string>("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      addTodo({
        title: value,
        completed: false,
        id: Date.now(),
      });
    }
    setValue("");
    refetch();
  };

  return (
    <ContainerFormStyled onSubmit={handleSubmit}>
      <InputFormStyled type="text" value={value} onChange={changeHandler} />
      <SubmitButtonStyled disabled={!value} type="submit">
        {!isLoading ? <>Отправить</> : <Spiner />}
      </SubmitButtonStyled>
    </ContainerFormStyled>
  );
};
