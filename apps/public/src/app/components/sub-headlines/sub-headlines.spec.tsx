import { render } from '@testing-library/react';

import SubHeadlines from './sub-headlines';

describe('SubHeadlines', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< SubHeadlines />);
    expect(baseElement).toBeTruthy();
  });
});
