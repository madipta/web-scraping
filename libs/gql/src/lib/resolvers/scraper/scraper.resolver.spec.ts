import { Test, TestingModule } from '@nestjs/testing';
import { ScraperResolver } from './scraper.resolver';

describe('ScraperResolver', () => {
  let resolver: ScraperResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScraperResolver],
    }).compile();

    resolver = module.get<ScraperResolver>(ScraperResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
