import type { Metadata } from 'next';
import './globals.css';
import { Provider } from '@/app/Provider';

export const metadata: Metadata = {
  title: 'Simple Modal Test',
  description: 'Hello World!!!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
          <div id="my-modal" />
          <div id="my-alert" />
        </Provider>
      </body>
    </html>
  );
}
