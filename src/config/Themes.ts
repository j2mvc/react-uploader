import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// 默认主题
export const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

// 蓝色主题
export const blueTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0288d1',
    },
    secondary: {
      main: '#0288d1',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

// 红色主题
export const redTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#ff0000',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});
// import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
// import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

// import purple from '@material-ui/core/colors/purple';
// import * as colors from '@material-ui/core/colors';


// declare module '@material-ui/core/styles/createMuiTheme' {
//   interface Theme {
//     appDrawer: {
//       width: React.CSSProperties['width']
//       breakpoint: Breakpoint
//     }
//   }
//   // 使用 `createMuiTheme` 来配置
//   interface ThemeOptions {
//     appDrawer?: {
//       width?: React.CSSProperties['width']
//       breakpoint?: Breakpoint
//     }
//   }
// }
// export const defaultTheme  = ()=> createDefaultTheme({ appDrawer: { breakpoint: 'md' }})
// export const redTheme = ()=>createDefaultTheme({ appDrawer: { breakpoint: 'md' }})
// // 默认主题
// export default function createDefaultTheme(options: ThemeOptions) {
//   return createMuiTheme({
//     appDrawer: {
//       width: 225,
//       breakpoint: 'lg',
//     },
//     palette: {
//         primary: {
//             main: '#556cd6'
//         },
//         secondary: {
//             main: '#19857b'
//         },
//         error: {
//             main: colors.red[500]
//         },
//     },
//     ...options,
//   })
// }
// // 红色主题
// export function createRedTheme(options: ThemeOptions) {
//   return createMuiTheme({
//     appDrawer: {
//       width: 225,
//       breakpoint: 'lg',
//     },
//     palette: {
//         primary: {
//             light: purple[300],
//             main: purple[500],
//             dark: purple[700]
//         },
//         secondary: {
//             light: purple.A200,
//             main: purple.A400,
//             dark: purple.A700
//         },
//         error: {
//             light: colors.red[300],
//             main: colors.red[500],
//             dark: colors.red[700]
//         },
//     },
//     ...options
//   })
// }