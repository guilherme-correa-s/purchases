import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findUnique(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  findMany() {
    return this.prisma.product.findMany();
  }

  async create({ title }: CreateProductParams) {
    const slug = slugify(title, { lower: true });
    const productWithSameSlug = await this.prisma.product.findUnique({
      where: { slug },
    });
    if (productWithSameSlug) {
      throw new BadRequestException('slug already exist');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
