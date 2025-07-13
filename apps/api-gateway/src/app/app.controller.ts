import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_SERVICE_RABBITMQ } from '../constants';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject(ORDER_SERVICE_RABBITMQ)
        private readonly client: ClientProxy
    ) {}

    @Get()
    getData() {
        return this.appService.getData();
    }

    @Post('order')
    createOrder(@Body() order: any) {
        this.client.emit('order-created', order);
        return { message: 'Order send to RabbitMQ', order };
    }
}
