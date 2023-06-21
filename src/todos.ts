export class Todos {
  private tasks = new Map<string, Task>();

  get size(): number {
    return this.tasks.size;
  }

  add(task: Task): void {
    if (this.exists(task.title)) {
      throw new Error(`Task with name "${task.title}" already exsits!`);
    }

    this.tasks.set(task.title, task);
  }

  exists(title: string): boolean {
    return this.tasks.has(title);
  }

  complete(title: string): void {
    const task = this.tasks.get(title);
    if (!task) {
      throw new Error(`No task with name ${title} was found!`);
    }

    this.tasks.delete(title);
  }

  describe(title: string): string {
    const task = this.tasks.get(title);
    if (!task) {
      throw new Error(`No task with name "${title}" was found!`);
    }

    return `The task named ${title} was created in ${task.creationTime}.
    Its description: ${task.description}.
    It must be finished by ${task.finishBy}`;
  }
}

export interface Task {
  title: string;
  creationTime: string;
  finishBy: string;
  description?: string;
}
