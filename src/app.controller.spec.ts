import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: jest.Mocked<AppService>;

  beforeEach(async () => {
    const mockAppService = {
      getWelcome: jest.fn(),
      getHealth: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get(AppService);
  });

  describe('getWelcome', () => {
    it('should return welcome message', () => {
      const expectedResponse = { message: 'Welcome to the NestJS API!' };
      appService.getWelcome.mockReturnValue(expectedResponse);

      const result = appController.getWelcome();

      expect(appService.getWelcome).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getHealth', () => {
    it('should return health status', () => {
      const expectedResponse = { status: 'ok' };
      appService.getHealth.mockReturnValue(expectedResponse);

      const result = appController.getHealth();

      expect(appService.getHealth).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });
  });
});
