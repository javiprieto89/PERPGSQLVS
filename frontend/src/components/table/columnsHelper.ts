type Column = Record<string, boolean>;
type ColumnsState = Record<string, Column>;

export class ColumnsSession {
  COLUMNS_SESSION_NAME = "columns-state"; // generic columns state name
  columnGroupName: string;

  constructor(columnGroupName: string) {
    this.columnGroupName = columnGroupName;
  }
  getAll() {
    const state = localStorage.getItem(this.COLUMNS_SESSION_NAME);
    if (state) {
      try {
        const data = JSON.parse(state) as ColumnsState;
        return data[this.columnGroupName];
      } catch (error) {
        // Handle malformed JSON gracefully
        return undefined;
      }
    }
    return undefined;
  }
  getAllSession() {
    // Get existing data for all groups
    const state = localStorage.getItem(this.COLUMNS_SESSION_NAME);
    let allData: ColumnsState = {};
    if (state) {
      try {
        allData = JSON.parse(state) as ColumnsState;
      } catch (error) {
        // Handle malformed JSON gracefully
        allData = {};
      }
    }
    return allData;
  }
  getState(key: string) {
    const state = this.getAll();
    if (state) {
      return state[key];
    }
    return undefined;
  }
  setColumnShow(key: string) {
    const stored = this.getAll();
    if (!stored) return;
    delete stored[key];

    // Get existing data for all groups
    const state = localStorage.getItem(this.COLUMNS_SESSION_NAME);
    let allData: ColumnsState = {};
    if (state) {
      try {
        allData = JSON.parse(state) as ColumnsState;
      } catch (error) {
        // Handle malformed JSON gracefully
        allData = {};
      }
    }

    localStorage.setItem(
      this.COLUMNS_SESSION_NAME,
      JSON.stringify({
        ...allData,
        [this.columnGroupName]: stored,
      })
    );
  }
  setColumnHidden(key: string) {
    let stored = this.getAll() || {};
    const allData = this.getAllSession();

    localStorage.setItem(
      this.COLUMNS_SESSION_NAME,
      JSON.stringify({
        ...allData,
        [this.columnGroupName]: {
          ...stored,
          [key]: false,
        },
      })
    );
  }
  resetColumns() {
    const allData = this.getAllSession();

    if (!allData) return;

    localStorage.setItem(
      this.COLUMNS_SESSION_NAME,
      JSON.stringify({
        ...allData,
        [this.columnGroupName]: {},
      })
    );
  }
}
