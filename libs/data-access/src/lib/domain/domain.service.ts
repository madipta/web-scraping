import { Injectable } from "@nestjs/common";
import { Domain, Prisma } from "@prisma/client";
import { DomainListItem } from '@web-scraping/dto';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DomainService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.DomainCreateInput): Promise<Domain> {
    return this.prisma.domain.create({ data });
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

  async delete(where: Prisma.DomainWhereUniqueInput): Promise<Domain> {
    return this.prisma.domain.delete({
      where,
    });
  }

  async findOne(byId: Prisma.DomainWhereUniqueInput): Promise<Domain | null> {
    return this.prisma.domain.findUnique({
      where: byId,
    });
  }

  async count(params: { where?: Prisma.DomainWhereInput }): Promise<number> {
    return this.prisma.domain.count(params);
  }

  async pageList(params: {
    pageIndex: number;
    pageSize: number,
    where?: Prisma.DomainWhereInput;
    orderBy?: Prisma.DomainOrderByInput;
  }): Promise<DomainListItem[]> {
    const { pageIndex, pageSize, where, orderBy } = params;
    const skip = pageIndex * pageSize - pageSize;
    return this.prisma.domain.findMany({
      skip,
      take: +pageSize,
      select: {
        id: true,
        home: true,
        indexUrl: true,
        adminEmail: true,
        _count: {
          select: {
            links: true
          }
        }
      },
      where,
      orderBy,
    });
  }
}
