import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/CreatePage.dto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('page')
export class PageController {
  constructor(private pageService: PageService) { }

  @Post('/:userId')
  @UseGuards(AuthGuard)
  async addPage(@Body() pages: Array<{ id: string, type: string, content: string, children: Array<{ id: string, type: string, content: string }> }>, @Param('userId') userId: string) {
    try {
      console.log("Pages received:", pages);
      console.log("User ID:", userId);

      const newPage = await this.pageService.addPage(pages, userId);
      console.log("New Page:", newPage);

      return newPage;
    } catch (error) {
      console.error("Error adding pages:", error);
      throw error; // Rethrow the error to be handled by NestJS error handling
    }
  }

  @Post('/')
  @UseGuards(AuthGuard)
  async create(@Body() page: CreatePageDto): Promise<any> {
    try {
      const newPage = await this.pageService.create(page);

      return newPage;
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Put('/:id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() page: CreatePageDto): Promise<any> {
    try {
      const updatedPage = await this.pageService.update({ ...page, _id: id });

      return updatedPage;
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async get(@Param('id') id: string): Promise<any> {
    try {
      const page = await this.pageService.get(id);

      return page;
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/user/:userId')
  @UseGuards(AuthGuard)
  async pages(@Param('userId') userId: string,@Req() req:Request): Promise<any> {
    try {
      const currentUser = req['currentUser']; // Access current user from request context
      console.log('::??currentUser', currentUser)

      const pages = await this.pageService.pages(userId);


      console.log("pages", pages)
      return pages;
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/trash/:id')
  async makeTrash(@Param('id') id: string): Promise<any> {
    try {
      const page = await this.pageService.makeTrashed(id);

      return page;
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/recover/:id')
  async recover(@Param('id') id: string): Promise<any> {
    try {
      const page = await this.pageService.recover(id);

      return page;
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<any> {
    try {
      const page = await this.pageService.delete(id);

      return page;
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
