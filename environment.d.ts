declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT: "Development" | "Production",
      API_KEY: string,
      API_URL: string,
      DOMAIN: string,
      VITE_CLERK_PUBLISHABLE_KEY: string,
      CLERK_SECRET_KEY: string
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

export { };