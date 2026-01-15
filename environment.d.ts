declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API: string,
      NEXT_PUBLIC_HOST: string,
      IMAGE_URL: string,
      NEXT_PUBLIC_SUPABASE_HOST: string,
      NEXT_PUBLIC_SUPABASE_API_KEY: string,
      ENVIRONMENT: "Development" | "Production",
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