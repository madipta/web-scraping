import { render } from '@testing-library/react';

import SearchResult from './search-result';

describe('SearchResult', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< SearchResult />);
    expect(baseElement).toBeTruthy();
  });
});
