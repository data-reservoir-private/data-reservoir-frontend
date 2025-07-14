export interface IQuickLink {
  name: string,
  image?: string | (() => React.ReactNode),
  link: string,
  notReady?: boolean
}