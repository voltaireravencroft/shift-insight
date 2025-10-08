'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider(
  props: React.ComponentProps<typeof NextThemesProvider>
) {
  // Forward all props so you can pass attribute="class" defaultTheme="system" enableSystem, etc.
  return <NextThemesProvider {...props} />;
}
