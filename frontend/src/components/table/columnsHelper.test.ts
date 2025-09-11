import { ColumnsSession } from "./columnsHelper";

// Get the mocked localStorage from global setup
const mockLocalStorage = (globalThis as any).localStorage;

describe("ColumnsHelper", () => {
  let columnsHelper: ColumnsSession;
  const testGroupName = "clients";

  beforeEach(() => {
    // Clear sessionStorage before each test
    mockLocalStorage.clear();
    columnsHelper = new ColumnsSession(testGroupName);
  });

  describe("Constructor", () => {
    it("should initialize with correct column group name", () => {
      const helper = new ColumnsSession("test-group");
      expect(helper.columnGroupName).toBe("test-group");
      expect(helper.COLUMNS_SESSION_NAME).toBe("columns-state");
    });
  });

  describe("getAll", () => {
    it("should return undefined when no data exists in sessionStorage", () => {
      const result = columnsHelper.getAll();
      expect(result).toBeUndefined();
    });

    it("should return undefined when data exists but not for this group", () => {
      const testData = {
        "other-group": {
          column1: true,
        },
      };
      mockLocalStorage.setItem("columns-state", JSON.stringify(testData));

      const result = columnsHelper.getAll();
      expect(result).toBeUndefined();
    });

    it("should return correct data for this group", () => {
      const testData = {
        [testGroupName]: {
          Address: false,
          Name: true,
        },
        "other-group": {
          column1: true,
        },
      };
      mockLocalStorage.setItem("columns-state", JSON.stringify(testData));

      const result = columnsHelper.getAll();
      expect(result).toEqual({
        Address: false,
        Name: true,
      });
    });

    it("should handle malformed JSON gracefully", () => {
      mockLocalStorage.setItem("columns-state", "invalid-json");

      const result = columnsHelper.getAll();
      expect(result).toBeUndefined();
    });
  });

  describe("getState", () => {
    it("should return undefined when no data exists", () => {
      const result = columnsHelper.getState("Address");
      expect(result).toBeUndefined();
    });

    it("should return undefined when key does not exist", () => {
      const testData = {
        [testGroupName]: {
          Name: true,
        },
      };
      mockLocalStorage.setItem("columns-state", JSON.stringify(testData));

      const result = columnsHelper.getState("Address");
      expect(result).toBeUndefined();
    });

    it("should return correct value for existing key", () => {
      const testData = {
        [testGroupName]: {
          Address: false,
          Name: true,
        },
      };
      mockLocalStorage.setItem("columns-state", JSON.stringify(testData));

      const result = columnsHelper.getState("Address");
      expect(result).toBe(false);

      const result2 = columnsHelper.getState("Name");
      expect(result2).toBe(true);
    });
  });

  describe("setState", () => {
    it("should set state for new key when no data exists", () => {
      columnsHelper.setColumnHidden("Address");

      const stored = mockLocalStorage.getItem("columns-state");
      const parsed = JSON.parse(stored!);
      expect(parsed).toEqual({
        [testGroupName]: {
          Address: true,
        },
      });
    });

    it("should add new key to existing data", () => {
      const initialData = {
        [testGroupName]: {
          Name: true,
        },
      };
      mockLocalStorage.setItem("columns-state", JSON.stringify(initialData));

      columnsHelper.setColumnHidden("Address");

      const stored = mockLocalStorage.getItem("columns-state");
      const parsed = JSON.parse(stored!);
      expect(parsed).toEqual({
        [testGroupName]: {
          Name: true,
          Address: true,
        },
      });
    });

    it("should update existing key", () => {
      const initialData = {
        [testGroupName]: {
          Address: false,
          Name: true,
        },
      };
      mockLocalStorage.setItem("columns-state", JSON.stringify(initialData));

      columnsHelper.setColumnHidden("Address");

      const stored = mockLocalStorage.getItem("columns-state");
      const parsed = JSON.parse(stored!);
      expect(parsed).toEqual({
        [testGroupName]: {
          Address: true,
          Name: true,
        },
      });
    });

    it("should preserve other groups when updating", () => {
      const initialData = {
        [testGroupName]: {
          Address: false,
        },
        "other-group": {
          column1: true,
        },
      };
      mockLocalStorage.setItem("columns-state", JSON.stringify(initialData));

      columnsHelper.setColumnHidden("Address");

      const stored = mockLocalStorage.getItem("columns-state");
      const parsed = JSON.parse(stored!);
      expect(parsed).toEqual({
        [testGroupName]: {
          Address: true,
        },
        "other-group": {
          column1: true,
        },
      });
    });
  });

  describe("removeState", () => {
    it("should do nothing when no data exists", () => {
      columnsHelper.setColumnShow("Address");

      const stored = mockLocalStorage.getItem("columns-state");
      expect(stored).toBeNull();
    });

    it("should do nothing when key does not exist", () => {
      const initialData = {
        [testGroupName]: {
          Name: true,
        },
      };
      mockLocalStorage.setItem("columns-state", JSON.stringify(initialData));

      columnsHelper.setColumnShow("Address");

      const stored = mockLocalStorage.getItem("columns-state");
      const parsed = JSON.parse(stored!);
      expect(parsed).toEqual(initialData);
    });

    it("should remove existing key", () => {
      const initialData = {
        [testGroupName]: {
          Address: false,
          Name: true,
        },
      };
      mockLocalStorage.setItem("columns-state", JSON.stringify(initialData));

      columnsHelper.setColumnShow("Address");

      const stored = mockLocalStorage.getItem("columns-state");
      const parsed = JSON.parse(stored!);
      expect(parsed).toEqual({
        [testGroupName]: {
          Name: true,
        },
      });
    });

    it("should preserve other groups when removing", () => {
      const initialData = {
        [testGroupName]: {
          Address: false,
          Name: true,
        },
        "other-group": {
          column1: true,
        },
      };
      mockLocalStorage.setItem("columns-state", JSON.stringify(initialData));

      columnsHelper.setColumnShow("Address");

      const stored = mockLocalStorage.getItem("columns-state");
      const parsed = JSON.parse(stored!);
      expect(parsed).toEqual({
        [testGroupName]: {
          Name: true,
        },
        "other-group": {
          column1: true,
        },
      });
    });
  });

  describe("Integration Tests", () => {
    it("should handle complete CRUD operations", () => {
      // Create - set initial state
      columnsHelper.setColumnHidden("Address");
      expect(columnsHelper.getState("Address")).toBe(true);

      // Read - get all data
      const allData = columnsHelper.getAll();
      expect(allData).toEqual({ Address: true });

      // Update - set existing key to new value
      columnsHelper.setColumnHidden("Name");
      expect(columnsHelper.getState("Name")).toBe(true);
      expect(columnsHelper.getAll()).toEqual({
        Address: true,
        Name: true,
      });

      // Delete - remove a key
      columnsHelper.setColumnShow("Address");
      expect(columnsHelper.getState("Address")).toBeUndefined();
      expect(columnsHelper.getAll()).toEqual({ Name: true });
    });

    it("should work with the example data structure", () => {
      const testData = {
        clients: {
          Address: false,
        },
      };
      mockLocalStorage.setItem("columns-state", JSON.stringify(testData));

      const helper = new ColumnsSession("clients");

      // Test getState
      expect(helper.getState("Address")).toBe(false);

      // Test getAll
      expect(helper.getAll()).toEqual({ Address: false });

      // Test setState (update)
      helper.setColumnHidden("Address");
      expect(helper.getState("Address")).toBe(true);

      // Test removeState
      helper.setColumnShow("Address");
      expect(helper.getState("Address")).toBeUndefined();
    });

    it("should handle multiple column groups independently", () => {
      const clientsHelper = new ColumnsSession("clients");
      const ordersHelper = new ColumnsSession("orders");

      // Set data for clients
      clientsHelper.setColumnHidden("Address");
      clientsHelper.setColumnHidden("Name");

      // Set data for orders
      ordersHelper.setColumnHidden("OrderDate");
      ordersHelper.setColumnHidden("Total");

      // Verify clients data
      expect(clientsHelper.getAll()).toEqual({
        Address: true,
        Name: true,
      });

      // Verify orders data
      expect(ordersHelper.getAll()).toEqual({
        OrderDate: true,
        Total: true,
      });

      // Verify they don't interfere with each other
      expect(clientsHelper.getState("OrderDate")).toBeUndefined();
      expect(ordersHelper.getState("Address")).toBeUndefined();
    });
  });
});
