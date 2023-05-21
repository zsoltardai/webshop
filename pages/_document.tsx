import {Html, Head, Main, NextScript} from 'next/document';

import {If, Splash} from '@webshop/components';


const Document: React.FC = () => {
  const loading: boolean = typeof window === undefined;
  return (
    <Html lang="en">
      <Head />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>
        <If condition={loading}>
          <Splash />
        </If>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
