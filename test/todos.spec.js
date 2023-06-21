"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todos_1 = require("../src/todos");
const DISHES = {
    title: "Do the dishes",
    creationTime: "Sunday",
    finishBy: "Sunday",
    description: "Clean all the dishes",
};
describe("TodoList", () => {
    let todos;
    let urgencyCheckerMock = { isUrgent: jest.fn() };
    beforeEach(() => {
        todos = new todos_1.Todos(urgencyCheckerMock);
    });
    it("should be created", () => {
        expect(todos).toBeTruthy();
    });
    it("should be empty by default", () => {
        expect(todos.size).toEqual(0);
    });
    describe("add", () => {
        it("should add a task", () => {
            todos.add(DISHES);
            expect(todos.exists(DISHES.title)).toBeTruthy();
        });
        it("should throw an error when adding same task twice", () => {
            todos.add(DISHES);
            expect(() => todos.add(DISHES)).toThrow();
        });
    });
    describe("complete", () => {
        it("should complete a task", () => {
            todos.add(DISHES);
            todos.complete(DISHES.title);
            expect(todos.exists(DISHES.title)).toBeFalsy();
        });
        it("should throw an error when trying to complete a non existing task", () => {
            expect(() => todos.complete(DISHES.title)).toThrow();
        });
    });
    describe("describe", () => {
        it("should describe a task", () => {
            todos.add(DISHES);
            expect(todos.describe(DISHES.title)).toMatchInlineSnapshot(`
"The task named Do the dishes was created in Sunday.
    Its description: Clean all the dishes.
    It must be finished by Sunday"
`);
        });
    });
    describe("can postpone", () => {
        it("should return false if the task is urgent", () => {
            todos.add(DISHES);
            urgencyCheckerMock.isUrgent.mockReturnValueOnce(true);
            expect(todos.canPostpone(DISHES.title)).toBeFalsy();
        });
    });
});
