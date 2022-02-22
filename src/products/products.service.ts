import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
      ) {}
    
      async createOrUpdate(product: Product): Promise<Product> {
        return await this.productRepository.save(product);
      }

      async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
      }

      async findOne(id: number): Promise<Product> {
          return await this.productRepository.findOne({id: id})
      }

      async delete(id: number) : Promise<DeleteResult> {

        return await this.productRepository.delete({ id: id });
      }








}
