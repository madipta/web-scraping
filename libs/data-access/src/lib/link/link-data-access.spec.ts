import { Test, TestingModule } from '@nestjs/testing';
import { LinkDataAccess } from './link-data-access';

describe('LinkDataAccess', () => {
  let service: LinkDataAccess;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkDataAccess],
    }).compile();

    service = module.get<LinkDataAccess>(LinkDataAccess);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
