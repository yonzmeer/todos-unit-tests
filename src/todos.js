"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todos = void 0;
class Todos {
    constructor(urgencyChecker) {
        this.urgencyChecker = urgencyChecker;
        this.tasks = new Map();
    }
    get size() {
        return this.tasks.size;
    }
    add(task) {
        if (this.exists(task.title)) {
            throw new Error(`Task with name "${task.title}" already exsits!`);
        }
        this.tasks.set(task.title, task);
    }
    exists(title) {
        return this.tasks.has(title);
    }
    complete(title) {
        const task = this.tasks.get(title);
        if (!task) {
            throw new Error(`No task with name ${title} was found!`);
        }
        this.tasks.delete(title);
    }
    describe(title) {
        const task = this.tasks.get(title);
        if (!task) {
            throw new Error(`No task with name "${title}" was found!`);
        }
        return `The task named ${title} was created in ${task.creationTime}.
    Its description: ${task.description}.
    It must be finished by ${task.finishBy}`;
    }
    canPostpone(title) {
        const task = this.tasks.get(title);
        if (!task) {
            throw new Error(`No task with name "${title}" was found!`);
        }
        return !this.urgencyChecker.isUrgent(task);
    }
}
exports.Todos = Todos;
