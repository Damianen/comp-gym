import { Controller, Request } from '@nestjs/common';
import { Get, Param, Post, Body, UseGuards, Put, Delete } from '@nestjs/common';
import { SetService } from './set.service';
import { ISet } from '@comp-gym/shared/api';

@Controller('set')
export class SetController {
    constructor(private setService: SetService) {}

    @Post('')
    create(@Request() req: any): Promise<ISet | null> {
        return this.setService.create(req);
    }

    @Put(':id')
    update(@Param(':id') id: string, @Request() req: any): Promise<ISet | null> {
        return this.setService.update(id, req);
    }

    @Delete(':id')
    delete(@Param(':id') id: string): Promise<null> {
        return this.setService.delete(id);
    }
}