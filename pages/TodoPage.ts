import { type Page, type Locator, expect } from '@playwright/test';

// Page Object: keeps selectors in one place so tests stay readable.
export class TodoPage {
  readonly page: Page;
  readonly newTodo: Locator;
  readonly items: Locator;
  readonly counter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodo = page.getByPlaceholder('What needs to be done?');
    this.items = page.getByTestId('todo-item');
    this.counter = page.getByTestId('todo-count');
  }

  async open() {
    await this.page.goto('');
  }

  async add(...titles: string[]) {
    for (const t of titles) {
      await this.newTodo.fill(t);
      await this.newTodo.press('Enter');
    }
  }

  async complete(title: string) {
    await this.items.filter({ hasText: title }).getByRole('checkbox').check();
  }

  async remove(title: string) {
    const item = this.items.filter({ hasText: title });
    await item.hover();
    await item.getByRole('button', { name: 'Delete' }).click();
  }

  async filter(name: 'All' | 'Active' | 'Completed') {
    await this.page.getByRole('link', { name }).click();
  }

  async expectItems(titles: string[]) {
    await expect(this.items).toHaveText(titles);
  }
}
