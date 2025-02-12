export interface AirTableDefaultType {
  id: string,
  fields: {
    title: string,
    description?: string,
    completedAt?: string,
    icon: string,
    deadline: string,
  }
}

export interface NewTodoProps {
  title: string,
  description?: string,
  completedAt?: string,
  icon: string,
  deadline: string,
  temp?: boolean,
}

export interface TodoProps extends NewTodoProps {
  id: string,
}