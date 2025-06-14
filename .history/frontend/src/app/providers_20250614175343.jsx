'use client';

import { Provider } from 'react-redux';
import { store}
export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
export default Providers;

//