import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreatePurchaseParams {
  productId: string;
  customerId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  findMany() {
    return this.prisma.purchase.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findManyByAuthUserId(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId,
      },
    });
  }

  async create({ productId, customerId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new BadRequestException('Product not found');

    return this.prisma.purchase.create({
      data: {
        productId,
        customerId,
      },
    });
  }
}
