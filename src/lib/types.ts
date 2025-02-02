export interface AirTableDefaultType {
  id: string,
  fields: {
    title: string,
    completedAt?: string,
    icon: string,
    deadline: string,
  }
}

export interface NewTodoProps {
  title: string,
  completedAt?: string,
  icon: string,
  deadline: string,
  temp?: boolean,
}

export interface TodoProps extends NewTodoProps {
  id: string,
}