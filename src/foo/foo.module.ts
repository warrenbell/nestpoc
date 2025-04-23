import { Module } from '@nestjs/common';
import { FooController } from './foo.controller';
import { FooService } from './foo.service';
import { FooRepository } from './foo.repository';

@Module({
  controllers: [FooController],
  providers: [FooService, FooRepository],
  exports: [FooService],
})
export class FooModule {} 