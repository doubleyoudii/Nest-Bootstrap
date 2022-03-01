// In this example, we will use interface but soon we will change into classes
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = <any>'OPEN',
  IN_PROGRESS = <any>'IN_PROGRESS',
  DONE = <any>'DONE',
}
