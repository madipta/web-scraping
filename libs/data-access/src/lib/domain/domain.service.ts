import { Injectable } from "@nestjs/common";
import { Domain, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DomainService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.DomainCreateInput): Promise<Domain> {
    return this.prisma.domain.create({
      data,
    });
  }

  async findOne(byId: Prisma.DomainWhereUniqueInput): Promise<Domain | null> {
    return this.prisma.domain.findUnique({
      where: byId,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DomainWhereUniqueInput;
    where?: Prisma.DomainWhereInput;
    orderBy?: Prisma.DomainOrderByInput;
  }): Promise<Domain[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.domain.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.DomainWhereUniqueInput;
    data: Prisma.DomainUpdateInput;
  }): Promise<Domain> {
    const { where, data } = params;
    return this.prisma.domain.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.DomainWhereUniqueInput): Promise<Domain> {
    return this.prisma.domain.delete({
      where,
    });
  }
}
