import { render } from '@testing-library/react';

import Latest from './latest';

describe('Latest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< Latest />);
    expect(baseElement).toBeTruthy();
  });
});
