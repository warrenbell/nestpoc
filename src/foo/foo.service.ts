import { Injectable, NotFoundException } from '@nestjs/common';
import { FooRepository } from './foo.repository';
import { Foo } from './foo.entity';
import { CreateFooDto } from './dto/create-foo.dto';
import { UpdateFooDto } from './dto/update-foo.dto';

@Injectable()
export class FooService {
  constructor(private readonly fooRepository: FooRepository) {}

  findAll(): Foo[] {
    return this.fooRepository.findAll();
  }

  findOne(id: number): Foo {
    const foo = this.fooRepository.findOne(id);
    if (!foo) {
      throw new NotFoundException(`Foo with ID ${id} not found`);
    }
    return foo;
  }

  create(createFooDto: CreateFooDto): Foo {
    return this.fooRepository.create(createFooDto);
  }

  update(id: number, updateFooDto: UpdateFooDto): Foo {
    const updatedFoo = this.fooRepository.update(id, updateFooDto);
    if (!updatedFoo) {
      throw new NotFoundException(`Foo with ID ${id} not found`);
    }
    return updatedFoo;
  }

  remove(id: number): void {
    const removed = this.fooRepository.remove(id);
    if (!removed) {
      throw new NotFoundException(`Foo with ID ${id} not found`);
    }
  }
} 