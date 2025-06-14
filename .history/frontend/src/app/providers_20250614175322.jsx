'use client';

import { Provider } from 'react-redux';

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
export default Providers;

//