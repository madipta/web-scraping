import { render } from '@testing-library/react';

import Trending from './trending';

describe('Trending', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< Trending />);
    expect(baseElement).toBeTruthy();
  });
});
