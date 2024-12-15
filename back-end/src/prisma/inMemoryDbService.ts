export class InMemoryDbService {
  private db: { [key: string]: any[] } = {
    user: [],
  };

  private getDb(model: string) {
    return this.db[model];
  }

  clearDb() {
    for (const model in this.db) {
      this.db[model] = [];
    }
  }

  create(model: string, data: any) {
    const newItem = { id: `${Date.now()}`, ...data };
    this.getDb(model).push(newItem);
    return newItem;
  }

  findMany(model: string) {
    return this.getDb(model);
  }

  findUnique(model: string, id: string) {
    return this.getDb(model).find((item) => item.id === id);
  }

  update(model: string, id: string, data: any) {
    const index = this.getDb(model).findIndex((item) => item.id === id);
    if (index === -1) return null;
    const updatedItem = { ...this.getDb(model)[index], ...data };
    this.getDb(model)[index] = updatedItem;
    return updatedItem;
  }

  delete(model: string, id: string) {
    const index = this.getDb(model).findIndex((item) => item.id === id);
    if (index === -1) return null;
    return this.getDb(model).splice(index, 1)[0];
  }
}
