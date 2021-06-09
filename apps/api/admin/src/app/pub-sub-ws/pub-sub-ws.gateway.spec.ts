import { Test, TestingModule } from '@nestjs/testing';
import { PubSubWsGateway } from './pub-sub-ws.gateway';

describe('PubSubWsGateway', () => {
  let gateway: PubSubWsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubSubWsGateway],
    }).compile();

    gateway = module.get<PubSubWsGateway>(PubSubWsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
