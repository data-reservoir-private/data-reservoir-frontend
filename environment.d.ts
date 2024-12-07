declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES: string,
      NEXT_PUBLIC_API: string,
      DATABASE_URL: string
    }
  }
}

//allows us to define custom properties for our columns
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'range' | 'select' | 'search',
    classes?: {
      td?: string
    }
  }
}

export {}