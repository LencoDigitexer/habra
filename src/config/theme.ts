import { blue } from '@material-ui/core/colors'
import { darken, ThemeOptions } from '@material-ui/core/styles'
import { PaletteType } from '@material-ui/core'

const localStorageThemeType = localStorage.getItem('theme')
const type = (localStorageThemeType || 'light') as PaletteType

export const makeBackgroundColors = (
  t: PaletteType
): {
  default: string
  paper: string
} => ({
  default: t === 'dark' ? '#121212' : '#fafafa',
  paper: t === 'dark' ? '#1d1d1d' : '#fff',
})

export const makePrimaryColors = (
  t: PaletteType
): {
  main: string
  light: string
  dark: string
} => ({
  main: t === 'dark' ? blue.A100 : blue.A400,
  light: t === 'dark' ? blue.A100 : blue.A400,
  dark: t === 'dark' ? darken(blue.A100, 0.1) : blue.A700,
})

const generateTheme = (themeType?: PaletteType): ThemeOptions => ({
  palette: {
    type: themeType ? themeType : type,
    primary: makePrimaryColors(themeType ? themeType : type),
    secondary: { main: '#fff' },
    background: makeBackgroundColors(themeType ? themeType : type),
  },
  shape: { borderRadius: 4 },
  overrides: {
    MuiTab: {
      wrapper: {
        flexDirection: 'row',
      },
    },
  },
})

export default generateTheme
