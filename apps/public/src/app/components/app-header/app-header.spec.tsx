import { render } from '@testing-library/react';

import AppHeader from './app-header';

describe('AppHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< AppHeader />);
    expect(baseElement).toBeTruthy();
  });
});
