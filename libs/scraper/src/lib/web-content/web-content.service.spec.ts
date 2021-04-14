import { Test, TestingModule } from '@nestjs/testing';
import { WebContentService } from './web-content.service';

describe('WebContentService', () => {
  let service: WebContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebContentService],
    }).compile();

    service = module.get<WebContentService>(WebContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
