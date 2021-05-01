import { Test, TestingModule } from '@nestjs/testing';
import { ContentDataAccess } from './content-data-access';

describe('ContentService', () => {
  let service: ContentDataAccess;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentDataAccess],
    }).compile();

    service = module.get<ContentDataAccess>(ContentDataAccess);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
