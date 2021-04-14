import { Test, TestingModule } from '@nestjs/testing';
import { ScrapingController } from './scraping.controller';

describe('ScrapingController', () => {
  let controller: ScrapingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapingController],
    }).compile();

    controller = module.get<ScrapingController>(ScrapingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
