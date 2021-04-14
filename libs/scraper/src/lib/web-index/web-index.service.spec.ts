import { Test, TestingModule } from '@nestjs/testing';
import { WebIndexService } from './web-index.service';

describe('WebIndexService', () => {
  let service: WebIndexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebIndexService],
    }).compile();

    service = module.get<WebIndexService>(WebIndexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
