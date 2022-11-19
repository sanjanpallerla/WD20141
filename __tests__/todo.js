/* eslint-disable no-undef */

const todoList = require("../todo");
const { all, markAsComplete, add, dueToday, dueLater, overdue } = todoList();

const today = new Date();
const oneDay = 60 * 60 * 24 * 1000;
const yesterday = new Date(today.getTime() - 1 * oneDay);
const tomorrow = new Date(today.getTime() + 1 * oneDay);

today.toLocaleDateString("en-CA");
tomorrow.toLocaleDateString("en-CA");
yesterday.toLocaleDateString("en-CA");

describe("Todolist test suite", () => {
  beforeAll(() => {
    add({ title: "Submit assessment", dueDate: yesterday, completed: false });
    add({ title: "Visit Jack", dueDate: today, completed: true });
    add({ title: "Refuel Vehicle", dueDate: today, completed: true });
    add({ title: "Apply Scholarship", dueDate: yesterday, completed: true });
    add({ title: "Pay dth bill", dueDate: tomorrow, completed: false });
  });

  test("creating a new todo", () => {
    const todoItemsCount = all.length;
    expect(all.length).toBe(todoItemsCount);
    add({ title: "Aniesh home work", dueDate: today, completed: false });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("todo as completed.", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("overdue items.", () => {
    const Overdue = overdue().every((item) => item.dueDate < today);
    expect(Overdue).toEqual(true);
  });

  test("due today items.", () => {
    const duetoday = dueToday().every((item) => item.duetoday === today);
    expect(duetoday).toEqual(true);
  });

  test("due later items.", () => {
    const duelater = dueLater().every((item) => item.dueDate > today);
    expect(duelater).toEqual(true);
  });
});
