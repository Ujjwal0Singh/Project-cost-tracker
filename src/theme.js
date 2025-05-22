import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e0f2ff',
      100: '#bae1ff',
      200: '#7fc8ff',
      300: '#3aadff',
      400: '#0091ff',
      500: '#0077dd',
      600: '#0060b7',
      700: '#004b91',
      800: '#00376b',
      900: '#002445',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;