import { Injectable } from '@nestjs/common';
import { Foo } from './foo.entity';
import { CreateFooDto } from './dto/create-foo.dto';
import { UpdateFooDto } from './dto/update-foo.dto';

@Injectable()
export class FooRepository {
  private foos: Foo[] = [];
  private idCounter = 1;

  findAll(): Foo[] {
    return this.foos;
  }

  findOne(id: number): Foo | undefined {
    return this.foos.find(foo => foo.id === id);
  }

  create(createFooDto: CreateFooDto): Foo {
    const foo: Foo = {
      id: this.idCounter++,
      ...createFooDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.foos.push(foo);
    return foo;
  }

  update(id: number, updateFooDto: UpdateFooDto): Foo | undefined {
    const index = this.foos.findIndex(foo => foo.id === id);
    if (index === -1) {
      return undefined;
    }
    
    this.foos[index] = {
      ...this.foos[index],
      ...updateFooDto,
      updatedAt: new Date(),
    };
    
    return this.foos[index];
  }

  remove(id: number): boolean {
    const initialLength = this.foos.length;
    this.foos = this.foos.filter(foo => foo.id !== id);
    return this.foos.length < initialLength;
  }
} 