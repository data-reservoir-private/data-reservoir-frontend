declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string,
      ENVIRONMENT: "Development" | "Production",
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string,
      CLERK_SECRET_KEY: string,
      API_KEY: string,
      DOMAIN: string
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