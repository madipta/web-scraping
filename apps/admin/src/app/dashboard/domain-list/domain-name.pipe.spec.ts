import { DomainNamePipe } from './domain-name.pipe';

describe('DomainNamePipe', () => {
  it('create an instance', () => {
    const pipe = new DomainNamePipe();
    expect(pipe).toBeTruthy();
  });
});
