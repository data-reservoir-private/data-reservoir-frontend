declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string,
      ENVIRONMENT: "Development" | "Production",
      CLERK_SECRET_KEY: string,
      API_KEY: string,
      DOMAIN: string,
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string,
      NEXT_PUBLIC_CLERK_SIGN_IN_URL: string,
      NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: string,
      E2E_CLERK_USER_USERNAME: string,
      E2E_CLERK_USER_PASSWORD: string,
      CI: boolean
    }
  }
}

//allows us to define custom properties for our columns
declare module '@tanstack/react-table' {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'range' | 'select' | 'search',
    classes?: {
      td?: string
    }
  }
}

export { };