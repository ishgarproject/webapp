import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export default extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('white', '#141416')(props),
      },
    }),
  },
});
