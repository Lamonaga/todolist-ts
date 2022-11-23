export interface ITodo {
  title: string;
  id: number;
  completed: boolean;
}

export interface IDataEdit {
  id: number;
  value: string;
}

export interface TodosState {
  todos: ITodo[];
}