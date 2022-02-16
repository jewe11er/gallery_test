import 'styled-components'
import { ITheme } from '@/types/themeStyled'

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
