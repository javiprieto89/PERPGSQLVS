# Advanced Filter System

A comprehensive, type-safe filtering system for React applications with GraphQL + Apollo Client integration.

## Features

- 🔄 **Dynamic Query Generation** - Automatically builds GraphQL queries based on model configuration
- 🎯 **Type-Safe** - Full TypeScript support with proper type inference
- 🔗 **Dependent Fields** - Parent-child relationships (e.g., Country → Province)
- ⚡ **Performance Optimized** - Smart caching, debouncing, and memoization
- 🎨 **Separation of Concerns** - Clean architecture with distinct layers
- 🔧 **DRY Principle** - Reusable hooks and utilities
- 📦 **Apollo Integration** - Leverages Apollo Client's caching and error handling

## Architecture

```
filter/
├── AdvancedFilter.tsx          # Main filter component
├── RenderInputs.tsx             # Input renderer with type routing
├── constants.ts                 # Constants and type mappings
├── types.ts                     # TypeScript type definitions
├── utils.ts                     # Utility functions for queries
├── hooks/
│   ├── useFilterState.ts        # Global filter state management
│   ├── useFilterOptionsLoader.ts # Dynamic option loading
│   └── useDependentFieldLoader.ts # Dependent field handling
└── inputs/
    ├── Text.tsx                 # Text input with operators
    ├── Select.tsx               # Select with dynamic options
    └── Radio.tsx                # Boolean radio input
```

## Usage

### Basic Implementation

```tsx
import AdvancedFilter from "~/components/filter/AdvancedFilter";

function MyComponent() {
  const handleFilterChange = (name: string, value: string) => {
    console.log(`Filter ${name} changed to:`, value);
    // Apply filters to your data
  };

  return (
    <AdvancedFilter 
      modelName="Client" 
      onFilterChange={handleFilterChange}
    />
  );
}
```

### With Data Filtering

```tsx
import { useMemo } from "react";
import AdvancedFilter from "~/components/filter/AdvancedFilter";
import useFilterState from "~/components/filter/hooks/useFilterState";

function ClientList() {
  const { filters } = useFilterState<string>();
  const { data: clients } = useGetClientsQuery();

  const filteredClients = useMemo(() => {
    if (!clients) return [];
    
    return clients.filter(client => {
      // Apply text filters
      if (filters.FirstName && !client.FirstName?.toLowerCase().includes(filters.FirstName.toLowerCase())) {
        return false;
      }
      
      // Apply select filters
      if (filters.CountryID && client.CountryID !== Number(filters.CountryID)) {
        return false;
      }
      
      return true;
    });
  }, [clients, filters]);

  return (
    <>
      <AdvancedFilter modelName="Client" onFilterChange={() => {}} />
      <ClientTable data={filteredClients} />
    </>
  );
}
```

## Key Components

### AdvancedFilter

Main component that orchestrates the entire filter system.

**Props:**
- `modelName` (string): The backend model to load filters for
- `onFilterChange` (function): Callback when any filter changes

**Features:**
- Automatically fetches filter field definitions from backend
- Renders appropriate input types (text, select, number, boolean)
- Displays active filters as removable badges
- Handles parent-child field relationships

### useFilterOptionsLoader

Hook for loading select options dynamically.

**Features:**
- Builds GraphQL queries at runtime based on `relationModel`
- Handles independent fields (loads immediately)
- Handles dependent fields (waits for parent value)
- Apollo Client integration with smart caching
- Automatic error handling and loading states

**Example:**
```tsx
const { loading, options, error } = useFilterOptionsLoader(filterField, parentValue);
```

### useFilterState

Global state management for filter values.

**Features:**
- Jotai-based global state
- Debounced updates (500ms)
- Automatic cleanup of empty values
- Type-safe operations

**API:**
```tsx
const { 
  filters,           // Current filter values
  setFilter,         // Set/update a filter
  removeFilter,      // Remove a filter
  clearFilters,      // Clear all filters
  getFilter,         // Get specific filter value
  setFiltersMultiple // Bulk update
} = useFilterState<string>();
```

## Backend Integration

The filter system expects the backend to provide:

### 1. Filter Fields Query

```graphql
query GetFilterFields($model: String!) {
  filterFields(model: $model) {
    field        # Field name (e.g., "CountryID")
    label        # Display label (e.g., "País")
    type         # Field type: "text" | "select" | "number" | "boolean"
    relationModel # For selects: model to load options from
    dependsOn    # For dependent fields: parent field name
  }
}
```

### 2. Relation Queries

For each `relationModel`, the backend should provide a query like:

```graphql
query {
  allCountries {
    CountryID
    Name
  }
}
```

### 3. Dependent Queries

For parent-child relationships:

```graphql
query GetProvincesByCountry($countryID: Int!) {
  provincesByCountry(countryID: $countryID) {
    ProvinceID
    Name
  }
}
```

## Supported Field Types

### Text Fields
- Operators: Contains, Starts With, Ends With, Equals, Not Equals, Not Contains
- Debounced input
- Case-insensitive matching

### Select Fields
- Dynamic option loading via GraphQL
- Support for dependent selects
- Custom display formatting (e.g., Client names)

### Number Fields
- Numeric input validation
- Exact match filtering

### Boolean Fields
- Radio button group (Yes/No/All)
- Clear null/undefined handling

## Parent-Child Relationships

The system automatically handles common dependencies:

- **Country → Province**
- **CarBrand → CarModel**
- **ItemCategory → ItemSubcategory**
- **Company → Branch**

To add new relationships, update `getDependentQueryInfo()` in `utils.ts`:

```typescript
export function getDependentQueryInfo(
  relationModel: string,
  dependsOn: string
): { queryName: string; variableName: string } | null {
  const dependencyMap = {
    Province: {
      CountryID: { 
        queryName: "provincesByCountry", 
        variableName: "countryID" 
      }
    },
    // Add new relationships here
  };

  return dependencyMap[relationModel]?.[dependsOn] || null;
}
```

## Best Practices

### 1. Use Apollo Client Cache
The system uses `cache-first` policy by default for better performance. Options are cached and reused across components.

### 2. Debounce Filter Changes
Filter changes are automatically debounced (500ms) to avoid excessive re-renders and API calls.

### 3. Memoize Filtered Data
Always use `useMemo` when filtering data to avoid unnecessary computations:

```tsx
const filteredData = useMemo(() => 
  applyFilters(data, filters),
  [data, filters]
);
```

### 4. Type Safety
Use TypeScript generics for type-safe filter operations:

```tsx
const { filters } = useFilterState<string>();
const options = useFilterOptionsLoader<ClientType>(filterField);
```

### 5. Error Handling
The hooks include built-in error handling. Always check for errors in production:

```tsx
const { loading, options, error } = useFilterOptionsLoader(filterField);

if (error) {
  console.error("Failed to load options:", error);
  // Show user-friendly error message
}
```

## Performance Optimization

1. **Query Caching** - Uses Apollo's cache for repeated queries
2. **Debouncing** - 500ms debounce on filter changes
3. **Memoization** - Heavy computations are memoized
4. **Lazy Loading** - Dependent fields only load when needed
5. **Parallel Loading** - Independent fields load concurrently

## Troubleshooting

### Options not loading

Check:
1. Is `relationModel` correctly set in backend filter definition?
2. Does the GraphQL query exist for that model?
3. Check browser console for GraphQL errors

### Dependent field not working

Verify:
1. `dependsOn` field is correctly set
2. Parent-child relationship is registered in `getDependentQueryInfo()`
3. Parent field has a value selected

### Filters not applying

Ensure:
1. `onFilterChange` callback is properly implemented
2. Filter state is being read correctly
3. Filter logic matches the operator selected

## Migration from TableFilters.jsx

The new `AdvancedFilter` component improves upon the old `TableFilters.jsx`:

✅ **Type Safety** - Full TypeScript support  
✅ **Better Structure** - Separation of concerns  
✅ **DRY** - Reusable hooks instead of duplicated code  
✅ **Apollo Integration** - Proper cache management  
✅ **Performance** - Better memoization and debouncing  
✅ **Maintainability** - Clear, documented code  

To migrate:
```tsx
// Old
<TableFilters modelName="Client" data={data} onFilterChange={setFiltered} />

// New
<AdvancedFilter modelName="Client" onFilterChange={handleFilterChange} />
```

## Contributing

When adding new filter features:

1. Add types to `types.ts`
2. Add constants to `constants.ts`
3. Create reusable hooks in `hooks/`
4. Document with JSDoc comments
5. Update this README

## License

Part of the ERP Lubricentro system.
