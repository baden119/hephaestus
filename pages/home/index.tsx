import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { Container } from '@/components/styled/Container.styled';
import GlobalStyles from '@/components/styled/Global';
import Header from '@/components/Header/Header';
import { Flex } from '@/components/styled/Flex.styled';
import ShowSelect from '@/components/ShowSelect/ShowSelect';
import Hammer from '@/components/Hammer/Hammer';
import Revenge from '@/components/Revenge/Revenge';

import { Exo } from 'next/font/google';

const exo = Exo({ weight: ['400', '700'], subsets: ['latin'] });

const theme = {
  colours: {
    header: 'plum ',
    body: 'Linen',
    footer: 'grey ',
  },
  mobile: '768px',
};

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Head>
          <title>Hephaestus app</title>
          <link
            rel='icon'
            href='/hephaestusIcon.svg'
            type='image/svg'
            sizes='200x200'
          />
        </Head>
        <GlobalStyles />
        <Header />
        <Container role='blacksmith'>
          <ShowSelect />
          <Flex>
            <Hammer />
            <Revenge />
          </Flex>
        </Container>
      </>
    </ThemeProvider>
  );
}
