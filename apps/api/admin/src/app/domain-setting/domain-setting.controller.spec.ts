import { Test, TestingModule } from '@nestjs/testing';
import { DomainSettingController } from './domain-setting.controller';

describe('DomainSettingController', () => {
  let controller: DomainSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomainSettingController],
    }).compile();

    controller = module.get<DomainSettingController>(DomainSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
