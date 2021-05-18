import { render } from '@testing-library/react';

import SideAds from './side-ads';

describe('SideAds', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< SideAds />);
    expect(baseElement).toBeTruthy();
  });
});
