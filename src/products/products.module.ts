import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports:[PassportModule,CategoriesModule,
    TypeOrmModule.forFeature([ProductEntity,CategoryEntity])
  ],
  controllers: [ProductsController],
  providers: [ProductsService,JwtStrategy,CategoriesService],
})
export class ProductsModule {}
