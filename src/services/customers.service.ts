import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findUniqueByAuthId(authUserId: string) {
    return this.prisma.customer.findUnique({ where: { authUserId } });
  }

  async create(authUserId: string) {
    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
