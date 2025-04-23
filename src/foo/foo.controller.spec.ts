import { Test, TestingModule } from '@nestjs/testing';
import { FooController } from './foo.controller';
import { FooService } from './foo.service';
import { Foo } from './foo.entity';
import { CreateFooDto } from './dto/create-foo.dto';
import { UpdateFooDto } from './dto/update-foo.dto';
import { NotFoundException } from '@nestjs/common';

describe('FooController', () => {
  let controller: FooController;
  let service: jest.Mocked<FooService>;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FooController],
      providers: [
        {
          provide: FooService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<FooController>(FooController);
    service = module.get(FooService);
  });

  describe('create', () => {
    it('should create a new foo', () => {
      const createFooDto: CreateFooDto = {
        name: 'New Foo',
        description: 'New Description',
      };
      const expectedFoo: Foo = {
        id: 1,
        ...createFooDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.create.mockReturnValue(expectedFoo);

      const result = controller.create(createFooDto);

      expect(service.create).toHaveBeenCalledWith(createFooDto);
      expect(result).toEqual(expectedFoo);
    });
  });

  describe('findAll', () => {
    it('should return an array of foos', () => {
      const expectedFoos: Foo[] = [
        {
          id: 1,
          name: 'Test Foo 1',
          description: 'Test Description 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Test Foo 2',
          description: 'Test Description 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      service.findAll.mockReturnValue(expectedFoos);

      const result = controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedFoos);
    });
  });

  describe('findOne', () => {
    it('should return a foo when it exists', () => {
      const id = 1;
      const expectedFoo: Foo = {
        id,
        name: 'Test Foo',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.findOne.mockReturnValue(expectedFoo);

      const result = controller.findOne(id.toString());

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedFoo);
    });

    it('should throw NotFoundException when foo does not exist', () => {
      const id = 999;
      service.findOne.mockImplementation(() => {
        throw new NotFoundException(`Foo with ID ${id} not found`);
      });

      expect(() => controller.findOne(id.toString())).toThrow(NotFoundException);
      expect(() => controller.findOne(id.toString())).toThrow(`Foo with ID ${id} not found`);
    });
  });

  describe('update', () => {
    it('should update and return an existing foo', () => {
      const id = 1;
      const updateFooDto: UpdateFooDto = {
        name: 'Updated Foo',
      };
      const expectedFoo: Foo = {
        id,
        name: 'Updated Foo',
        description: 'Original Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.update.mockReturnValue(expectedFoo);

      const result = controller.update(id.toString(), updateFooDto);

      expect(service.update).toHaveBeenCalledWith(id, updateFooDto);
      expect(result).toEqual(expectedFoo);
    });

    it('should throw NotFoundException when foo to update does not exist', () => {
      const id = 999;
      const updateFooDto: UpdateFooDto = {
        name: 'Updated Foo',
      };
      service.update.mockImplementation(() => {
        throw new NotFoundException(`Foo with ID ${id} not found`);
      });

      expect(() => controller.update(id.toString(), updateFooDto)).toThrow(NotFoundException);
      expect(() => controller.update(id.toString(), updateFooDto)).toThrow(`Foo with ID ${id} not found`);
    });
  });

  describe('remove', () => {
    it('should remove an existing foo', () => {
      const id = 1;
      service.remove.mockImplementation(() => {});

      controller.remove(id.toString());

      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException when foo to remove does not exist', () => {
      const id = 999;
      service.remove.mockImplementation(() => {
        throw new NotFoundException(`Foo with ID ${id} not found`);
      });

      expect(() => controller.remove(id.toString())).toThrow(NotFoundException);
      expect(() => controller.remove(id.toString())).toThrow(`Foo with ID ${id} not found`);
    });
  });
}); 