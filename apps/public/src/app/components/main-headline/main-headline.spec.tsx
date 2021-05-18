import { render } from '@testing-library/react';

import MainHeadline from './main-headline';

describe('MainHeadline', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< MainHeadline />);
    expect(baseElement).toBeTruthy();
  });
});
