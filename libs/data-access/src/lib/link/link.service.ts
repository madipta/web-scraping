import { Injectable } from "@nestjs/common";
import { Link, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LinkService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.LinkCreateInput): Promise<Link> {
    return this.prisma.link.create({
      data,
    });
  }

  async findOne(byId: Prisma.LinkWhereUniqueInput): Promise<Link | null> {
    return this.prisma.link.findUnique({
      where: byId,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LinkWhereUniqueInput;
    where?: Prisma.LinkWhereInput;
    orderBy?: Prisma.LinkOrderByInput;
  }): Promise<Link[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.link.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.LinkWhereUniqueInput;
    data: Prisma.LinkUpdateInput;
  }): Promise<Link> {
    const { where, data } = params;
    return this.prisma.link.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.LinkWhereUniqueInput): Promise<Link> {
    return this.prisma.link.delete({
      where,
    });
  }
}
