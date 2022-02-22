import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    HttpStatus,
    HttpCode,
    Delete,
    Put,
    Req,
    Res,
  } from '@nestjs/common';
  import { ProductsService } from './products.service';
  import { CreateProductDto } from './dto/create-product.dto';
  import { Product } from './entity/product.entity';
  import { Response, Request } from 'express';



@Controller('products')
export class ProductsController {

    constructor(private readonly productsservice: ProductsService) {}
  
    @Post() 
    @HttpCode(HttpStatus.CREATED)
    async createProduct(@Body() newProduct:CreateProductDto, @Res() res:Response) {

        const product = new Product();
        product.product_name = newProduct.product_name;
        product.price = newProduct.price;
        product.quantity = newProduct.quantity;
        const create =  await this.productsservice.createOrUpdate(product);

        res.json({create , message:`This product has been created`})

    }

    @Get()
    async findProducts(@Res() res:Response){

        const product = await this .productsservice.findAll();

        res.status(HttpStatus.OK).json({product})
        
    }

    @Get(':id')
    async findProduct(@Param('id') id: number, @Res() res:Response): Promise<any> {

        const product =  await this.productsservice.findOne(id);

        if(!product){
            res.status(HttpStatus.NOT_FOUND).json({message:`No product with that id`})
        }

        res.status(HttpStatus.OK).json({product})

    }

    @Put('sell/:id')
    async sellProduct(
        @Param('id') id: number,
        @Body() newProduct: CreateProductDto,
        @Res() res:Response,
        @Req() req:Request
    ) {

        const product =  await this.productsservice.findOne(id);

        if(!product){
            res.status(HttpStatus.NOT_FOUND).json({message:`No product with that id`})
        }

        const amount: number = parseInt(req.query.amount as any);

        const newQuantity = product.quantity - amount;

        if(newQuantity < 0){
            res.json({message:`No stock left`})
        } else {


            product.product_name = product.product_name;
            product.price =  product.price;
            product.quantity = product.quantity - amount;


            const price = product.price;
            const total = product.price * amount;
            const update =  await this.productsservice.createOrUpdate(product);
            res.status(HttpStatus.OK).json({
                update ,
                price,
                total,
                message:`This product has been updated`})
        }


    }

    @Put('add/:id')
    async addProduct(
        @Param('id') id: number,
        @Body() newProduct: CreateProductDto,
        @Res() res:Response,
        @Req() req:Request
    ) {

        const product =  await this.productsservice.findOne(id);

        if(!product){
            res.status(HttpStatus.NOT_FOUND).json({message:`No product with that id`})
        }

        const amount: number = parseInt(req.query.amount as any);

        product.product_name = product.product_name;
        product.price =  product.price;
        product.quantity = product.quantity + amount;
        const update =  await this.productsservice.createOrUpdate(product);

        res.status(HttpStatus.OK).json({update , message:`This product has been updated`})

    }

    @Put('add/v1/:id')
    async addProductV1(
        @Param('id') id: number,
        @Body() newProduct: CreateProductDto,
        @Res() res:Response,
        @Req() req:Request
    ) {

        const product =  await this.productsservice.findOne(id);

        if(!product){
            res.status(HttpStatus.NOT_FOUND).json({message:`No product with that id`})
        }

        const amount = newProduct.amount;

        product.product_name = product.product_name;
        product.price =  product.price;
        product.quantity = product.quantity + amount;
        const update =  await this.productsservice.createOrUpdate(product);

        res.status(HttpStatus.OK).json({update , message:`This product has been updated`})

    }


    @Put('sell/v1/:id')
    async sellProductV1(
        @Param('id') id: number,
        @Body() newProduct: CreateProductDto,
        @Res() res:Response,
        @Req() req:Request
    ) {

        const product =  await this.productsservice.findOne(id);

        if(!product){
            res.status(HttpStatus.NOT_FOUND).json({message:`No product with that id`})
        }

        const amount = newProduct.amount;

        const newQuantity = product.quantity - amount;

        if(newQuantity < 0){
            res.json({message:`No stock left`})
        } else {

            product.product_name = product.product_name;
            product.price =  product.price;
            product.quantity = product.quantity - amount;
            const price = product.price;
            const total = product.price * amount;
            const update =  await this.productsservice.createOrUpdate(product);
            res.status(HttpStatus.OK).json({
                update ,
                price,
                total,
                message:`This product has been updated`});
        
        }


    }



    @Put(':id')
    async updateProduct(
        @Param('id') id: number,
        @Body() newProduct: CreateProductDto,
        @Res() res:Response,
        @Req() req:Request
    ) {

        const product =  await this.productsservice.findOne(id);

        if(!product){
            res.status(HttpStatus.NOT_FOUND).json({message:`No product with that id`})
        }

     
        product.product_name = newProduct.product_name;
        product.price =  newProduct.price;
        product.quantity = newProduct.quantity ;
        const update =  await this.productsservice.createOrUpdate(product);

        res.status(HttpStatus.OK).json({update , message:`This product has been updated`})

    }

    @Delete(':id')  
    async deleteAlbum(@Param('id') id: number ,@Res() res: Response): Promise<any> {

      const album = await this.productsservice.findOne(id);

      if(album){
        await this.productsservice.delete(id);
        res.status(HttpStatus.OK).json({ success: true , message:'this album has been deleted'});
      }else {
        res.status(HttpStatus.NOT_FOUND).json({message:`No product with that id`})
    }

    }



}
