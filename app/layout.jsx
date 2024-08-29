import '@styles/global.css';
import Head from 'next/head';
import Nav from '@components/Nav';

// Define metadata for the document
export const metadata = {
  title: 'FoolStack',
  description: 'For funsies!',
};

// Define the RootLayout component
export default function RootLayout({ children }) {
  return (
    <>
        <html lang='en'>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <body>
                <main className="app">
                    <Nav />
                    {children}
                </main>
            </body>
        </html>
    </>
  );
}
