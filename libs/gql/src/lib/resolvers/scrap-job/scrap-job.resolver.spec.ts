import { Test, TestingModule } from '@nestjs/testing';
import { ScrapJobResolver } from './scrap-job.resolver';

describe('ScrapJobResolver', () => {
  let resolver: ScrapJobResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapJobResolver],
    }).compile();

    resolver = module.get<ScrapJobResolver>(ScrapJobResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
