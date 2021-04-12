import { Test, TestingModule } from '@nestjs/testing';
import { IndexService } from './index.service';

describe('IndexService', () => {
  let service: IndexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndexService],
    }).compile();

    service = module.get<IndexService>(IndexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
