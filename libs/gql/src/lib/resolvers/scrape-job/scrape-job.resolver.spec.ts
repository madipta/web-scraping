import { Test, TestingModule } from '@nestjs/testing';
import { ScrapeJobResolver } from './scrape-job.resolver';

describe('ScrapeJobResolver', () => {
  let resolver: ScrapeJobResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapeJobResolver],
    }).compile();

    resolver = module.get<ScrapeJobResolver>(ScrapeJobResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
