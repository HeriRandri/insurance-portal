import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Param,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Role } from '../generated/prisma/client.js';
import { ClientsService } from './clients.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { UpdateClientDto } from './dto/update-client.dto.js';

@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
@Roles(Role.ADMIN)
findAll() {
  return this.clientsService.findAll();
}

@Get('me')
findMe(@Req() request: any) {
  return this.clientsService.findMe(request.user.sub);
}


@Get(':id')
@Roles(Role.ADMIN)
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.clientsService.findOne(id);
}


  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateClientDto) {
    return this.clientsService.create(dto);
  }
  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id', ParseIntPipe) id:number,
    @Body()dto : UpdateClientDto,
  ){
    return this.clientsService.update(id, dto)
  }

@Delete(':id')
@Roles(Role.ADMIN)
remove(@Param('id', ParseIntPipe) id: number) {
  return this.clientsService.remove(id);
}

}