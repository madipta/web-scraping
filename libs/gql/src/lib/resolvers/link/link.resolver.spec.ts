import { Test, TestingModule } from '@nestjs/testing';
import { LinkResolver } from './link.resolver';

describe('LinkResolver', () => {
  let resolver: LinkResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkResolver],
    }).compile();

    resolver = module.get<LinkResolver>(LinkResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
