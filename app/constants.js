import {DefaultTheme, DarkTheme} from 'react-native-paper';

export const theme = [
  [
    {
      name: 'Blue',
      ...DefaultTheme,
      roundness: 2,
      dark: false,
      colors: {
        primary: 'hsla(224,75%,61%,1)',
        accent: 'hsla(224,75%,71%,.5)',
        background: 'hsl(0,0%,95%)',
        surface: 'hsl(0,0%,100%)',
        text: 'hsl(0,0%,25%)',
        error: 'hsl(360,100%,40%)',
        disabled: 'hsl(224,70%,85%)',
        placeholder: 'hsl(0,0%,50%)',
        backdrop: 'hsla(0,0%,0%,.3)',
      },
    },
    {
      name: 'Blue',
      ...DarkTheme,
      roundness: 2,
      mode: 'adaptive',
      colors: {
        primary: 'hsla(235,55%,63%,.8)',
        accent: 'hsla(0,0%,100%,.2)',
        background: 'hsl(0,0%,15%)',
        surface: 'hsl(0,0%,30%)',
        text: 'hsl(0,0%,90%)',
        error: 'hsl(360,50%,45%)',
        disabled: 'hsl(224,70%,85%)',
        placeholder: 'hsl(0,0%,50%)',
        backdrop: 'hsla(0,0%,0%,.6)',
      },
    },
  ],
  [
    {
      name: 'Green',
      ...DefaultTheme,
      roundness: 2,
      dark: false,
      colors: {
        primary: 'hsla(135,55%,41%,1)',
        accent: 'hsla(135,55%,61%,.5)',
        background: 'hsl(0,0%,95%)',
        surface: 'hsl(0,0%,100%)',
        text: 'hsl(0,0%,25%)',
        error: 'hsl(360,100%,40%)',
        disabled: 'hsl(135,85%,81%)',
        placeholder: 'hsl(0,0%,50%)',
        backdrop: 'hsla(0,0%,0%,.3)',
      },
    },
    {
      name: 'Green',
      ...DarkTheme,
      roundness: 2,
      mode: 'adaptive',
      colors: {
        primary: 'hsla(135,55%,63%,.8)',
        accent: 'hsla(0,0%,100%,.2)',
        background: 'hsl(0,0%,15%)',
        surface: 'hsl(0,0%,30%)',
        text: 'hsl(0,0%,90%)',
        error: 'hsl(360,50%,45%)',
        disabled: 'hsl(135,85%,81%)',
        placeholder: 'hsl(0,0%,50%)',
        backdrop: 'hsla(0,0%,0%,.6)',
      },
    },
  ],
  [
    {
      name: 'Purple',
      ...DefaultTheme,
      roundness: 2,
      dark: false,
      colors: {
        primary: 'hsla(260,75%,61%,1)',
        accent: 'hsla(260,75%,71%,.5)',
        background: 'hsl(0,0%,95%)',
        surface: 'hsl(0,0%,100%)',
        text: 'hsl(0,0%,25%)',
        error: 'hsl(360,100%,40%)',
        disabled: 'hsl(260,85%,81%)',
        placeholder: 'hsl(0,0%,50%)',
        backdrop: 'hsla(0,0%,0%,.3)',
      },
    },
    {
      name: 'Purple',
      ...DarkTheme,
      roundness: 2,
      mode: 'adaptive',
      colors: {
        primary: 'hsla(260,55%,63%,.8)',
        accent: 'hsla(0,0%,100%,.2)',
        background: 'hsl(0,0%,15%)',
        surface: 'hsl(0,0%,30%)',
        text: 'hsl(0,0%,90%)',
        error: 'hsl(360,50%,45%)',
        disabled: 'hsl(260,85%,81%)',
        placeholder: 'hsl(0,0%,50%)',
        backdrop: 'hsla(0,0%,0%,.6)',
      },
    },
  ],
];