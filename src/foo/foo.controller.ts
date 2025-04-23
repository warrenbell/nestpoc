import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { FooService } from './foo.service';
import { CreateFooDto } from './dto/create-foo.dto';
import { UpdateFooDto } from './dto/update-foo.dto';
import { Foo } from './foo.entity';

@Controller('foos')
export class FooController {
  constructor(private readonly fooService: FooService) {}

  @Post()
  create(@Body() createFooDto: CreateFooDto): Foo {
    return this.fooService.create(createFooDto);
  }

  @Get()
  findAll(): Foo[] {
    return this.fooService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Foo {
    return this.fooService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFooDto: UpdateFooDto): Foo {
    return this.fooService.update(+id, updateFooDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.fooService.remove(+id);
  }
} 