import { Injectable } from "@nestjs/common";
import { Content, Domain, Link, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

export type LinkWithRef = Link & { domain?: Domain; content?: Content };

@Injectable()
export class LinkService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.LinkCreateInput): Promise<Link> {
    return this.prisma.link.create({
      data,
    });
  }

  async upsert(data: {
    url: string;
    title: string;
    domainId: number;
  }): Promise<Link> {
    const { url, title, domainId } = data;
    return this.prisma.link.upsert({
      where: {
        url,
      },
      update: {
        title,
      },
      create: {
        url,
        title,
        domain: {
          connect: {
            id: domainId,
          },
        },
      },
    });
  }

  async findOne(byId: Prisma.LinkWhereUniqueInput): Promise<Link | null> {
    return this.prisma.link.findUnique({
      where: byId,
      include: {
        domain: {
          select: { contentPath: true },
        },
      },
    });
  }

  async count(where: Prisma.LinkWhereInput): Promise<number> {
    return this.prisma.link.count({
      where,
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
