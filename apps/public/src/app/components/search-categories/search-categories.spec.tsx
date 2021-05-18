import { render } from '@testing-library/react';

import SearchCategories from './search-categories';

describe('SearchCategories', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< SearchCategories />);
    expect(baseElement).toBeTruthy();
  });
});
