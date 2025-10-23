"use client";

import { useLocalStorage } from "./use-local-storage";

interface TableState {
  columnVisibility: Record<string, boolean>;
  sorting: Array<{ id: string; desc: boolean }>;
  filters: Record<string, any>;
  pageSize: number;
}

export function useTablePersistence(tableId: string) {
  const [tableState, setTableState] = useLocalStorage<TableState>(
    `table-${tableId}`,
    {
      columnVisibility: {},
      sorting: [],
      filters: {},
      pageSize: 10,
    }
  );

  const updateColumnVisibility = (columnId: string, visible: boolean) => {
    setTableState((prev) => ({
      ...prev,
      columnVisibility: {
        ...prev.columnVisibility,
        [columnId]: visible,
      },
    }));
  };

  const updateSorting = (sorting: Array<{ id: string; desc: boolean }>) => {
    setTableState((prev) => ({
      ...prev,
      sorting,
    }));
  };

  const updateFilters = (filters: Record<string, any>) => {
    setTableState((prev) => ({
      ...prev,
      filters,
    }));
  };

  const updatePageSize = (pageSize: number) => {
    setTableState((prev) => ({
      ...prev,
      pageSize,
    }));
  };

  const resetTableState = () => {
    setTableState({
      columnVisibility: {},
      sorting: [],
      filters: {},
      pageSize: 10,
    });
  };

  return {
    tableState,
    updateColumnVisibility,
    updateSorting,
    updateFilters,
    updatePageSize,
    resetTableState,
  };
}
