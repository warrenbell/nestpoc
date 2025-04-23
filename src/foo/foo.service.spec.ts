import { Test, TestingModule } from '@nestjs/testing';
import { FooService } from './foo.service';
import { FooRepository } from './foo.repository';
import { Foo } from './foo.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateFooDto } from './dto/create-foo.dto';
import { UpdateFooDto } from './dto/update-foo.dto';

describe('FooService', () => {
  let service: FooService;
  let repository: jest.Mocked<FooRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FooService,
        {
          provide: FooRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FooService>(FooService);
    repository = module.get(FooRepository);
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
      repository.findAll.mockReturnValue(expectedFoos);

      const result = service.findAll();

      expect(repository.findAll).toHaveBeenCalled();
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
      repository.findOne.mockReturnValue(expectedFoo);

      const result = service.findOne(id);

      expect(repository.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedFoo);
    });

    it('should throw NotFoundException when foo does not exist', () => {
      const id = 999;
      repository.findOne.mockReturnValue(undefined);

      expect(() => service.findOne(id)).toThrow(NotFoundException);
      expect(() => service.findOne(id)).toThrow(`Foo with ID ${id} not found`);
    });
  });

  describe('create', () => {
    it('should create and return a new foo', () => {
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
      repository.create.mockReturnValue(expectedFoo);

      const result = service.create(createFooDto);

      expect(repository.create).toHaveBeenCalledWith(createFooDto);
      expect(result).toEqual(expectedFoo);
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
      repository.update.mockReturnValue(expectedFoo);

      const result = service.update(id, updateFooDto);

      expect(repository.update).toHaveBeenCalledWith(id, updateFooDto);
      expect(result).toEqual(expectedFoo);
    });

    it('should throw NotFoundException when foo to update does not exist', () => {
      const id = 999;
      const updateFooDto: UpdateFooDto = {
        name: 'Updated Foo',
      };
      repository.update.mockReturnValue(undefined);

      expect(() => service.update(id, updateFooDto)).toThrow(NotFoundException);
      expect(() => service.update(id, updateFooDto)).toThrow(`Foo with ID ${id} not found`);
    });
  });

  describe('remove', () => {
    it('should remove an existing foo', () => {
      const id = 1;
      repository.remove.mockReturnValue(true);

      service.remove(id);

      expect(repository.remove).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException when foo to remove does not exist', () => {
      const id = 999;
      repository.remove.mockReturnValue(false);

      expect(() => service.remove(id)).toThrow(NotFoundException);
      expect(() => service.remove(id)).toThrow(`Foo with ID ${id} not found`);
    });
  });
}); 