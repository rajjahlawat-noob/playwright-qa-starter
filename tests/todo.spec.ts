import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('TodoMVC', () => {
  let todo: TodoPage;

  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.open();
  });

  test('add items', async () => {
    await todo.add('Write test plan', 'Run regression');
    await todo.expectItems(['Write test plan', 'Run regression']);
    await expect(todo.counter).toHaveText('2 items left');
  });

  test('complete an item', async () => {
    await todo.add('Log bug', 'Verify fix');
    await todo.complete('Log bug');
    await expect(todo.counter).toHaveText('1 item left');
  });

  test('filter active and completed', async () => {
    await todo.add('A', 'B', 'C');
    await todo.complete('B');
    await todo.filter('Active');
    await todo.expectItems(['A', 'C']);
    await todo.filter('Completed');
    await todo.expectItems(['B']);
  });

  test('delete an item', async () => {
    await todo.add('Keep', 'Remove');
    await todo.remove('Remove');
    await todo.expectItems(['Keep']);
  });

  test('empty input is not added (negative test)', async () => {
    await todo.newTodo.press('Enter');
    await expect(todo.items).toHaveCount(0);
  });
});
