import * as React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme'
import { fade, makeStyles } from '@material-ui/core/styles/'
import AppRouter from './Router'
import AppBar from './blocks/AppBar'
import {
  APP_BAR_HEIGHT,
  BOTTOM_BAR_HEIGHT,
  chromeAddressBarHeight,
  MAX_WIDTH as maxWidth,
  MIDDLE_WIDTH,
  MIN_WIDTH,
} from '../config/constants'
import { lighten, darken } from '@material-ui/core/styles'
import isMobile from 'is-mobile'
import { useRoute, useSelector } from 'src/hooks'
import ScrollRestoration from 'react-scroll-restoration'
import { SnackbarProvider } from 'notistack'
import BottomBar from './blocks/BottomBar'
import useTitleChange from 'src/hooks/useTitleChange'
import useAnalytics from 'src/hooks/useAnalytics'
import isDarkTheme from 'src/utils/isDarkTheme'
import useAutoChangeTheme from 'src/hooks/useAutoChangeTheme'
import SideNavigationDrawer from './blocks/SideNavigationDrawer'
import useUserDataFetch from 'src/hooks/useUserDataFetch'
import UpdateNotification from 'src/components/blocks/UpdateNotification'

interface StyleProps {
  theme: Theme
  shouldShowAppBar: boolean
}

const useStyles = makeStyles({
  // Needed for IconButton touch ripple tweaks
  '@global': {
    '@keyframes enter': {
      '0%': {
        opacity: 0.1,
      },
      '100%': {
        opacity: 0.15,
      },
    },
    '@keyframes exit': {
      '0%': {
        opacity: 1,
      },
      '100%': {
        opacity: 0,
      },
    },
    '.IconButton_TouchRipple-rippleVisible': {
      animation: 'enter 0ms ease',
      opacity: 0.15,
    },
    '.IconButton_TouchRipple-childLeaving': {
      animation: 'exit 255ms ease',
    },
  },
  app: ({ shouldShowAppBar, theme }: StyleProps) => ({
    display: 'flex',
    minHeight: `calc(100vh - ${APP_BAR_HEIGHT}px - ${
      isMobile() ? chromeAddressBarHeight : 0
    }px - ${shouldShowAppBar ? BOTTOM_BAR_HEIGHT : 0}px)`,
    borderRadius: 0,
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    maxWidth: maxWidth,
    margin: `${APP_BAR_HEIGHT}px auto ${
      shouldShowAppBar ? BOTTOM_BAR_HEIGHT : 0
    }px auto`,
    boxSizing: 'border-box',
    [theme.breakpoints.up(MIDDLE_WIDTH)]: {
      marginTop: 0,
    },
    [theme.breakpoints.up(MIN_WIDTH)]: {
      padding: theme.spacing(0, 2),
    },
  }),
  /** Body class */
  body: ({ theme }: StyleProps) => ({
    /** Disable blue highlight for links. Can be bad for accessibility. */
    '& a': {
      '-webkit-tap-highlight-color': fade(theme.palette.background.paper, 0.3),
    },
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif',
    lineHeight: 1.5,
    '&::-webkit-scrollbar': {
      width: 15,
      height: 10,
      background: isDarkTheme(theme)
        ? lighten(theme.palette.background.default, 0.03)
        : theme.palette.background.paper,
      border: '1px solid ' + darken(theme.palette.background.paper, 0.05),
    },
    '&::-webkit-scrollbar-thumb': {
      minHeight: 28,
      background: isDarkTheme(theme)
        ? lighten(theme.palette.background.paper, 0.08)
        : darken(theme.palette.background.paper, 0.08),
      transition: '0.1s',
      '&:hover': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.1)
          : darken(theme.palette.background.paper, 0.1),
      },
      '&:active': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.2)
          : darken(theme.palette.background.paper, 0.2),
      },
    },
    '& *::selection': {
      background: (isDarkTheme(theme) ? darken : lighten)(
        theme.palette.primary.main,
        0.5
      ),
    },
  }),
})

const App = () => {
  const storeTheme = useSelector((state) => state.settings.theme)
  const theme = React.useMemo(() => createMuiTheme(storeTheme), [storeTheme])
  const route = useRoute()
  const classes = useStyles({
    theme,
    shouldShowAppBar: route?.shouldShowAppBar,
  })

  useTitleChange()
  useAutoChangeTheme()
  useAnalytics()
  useUserDataFetch()

  // Set root classes
  document.body.className = classes.body

  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <div style={{ display: 'flex' }}>
            <SideNavigationDrawer />
            <div className={classes.app}>
              <ScrollRestoration />
              <UpdateNotification />
              <AppBar />
              <BottomBar />
              <AppRouter />
            </div>
          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  )
}

export default React.memo(App)
