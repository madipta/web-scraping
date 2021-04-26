import { Injectable } from "@nestjs/common";
import { Content, Domain, Link, Prisma } from "@prisma/client";
import { LinkCreateInput } from "@web-scraping/dto";
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

  async upsert(data: LinkCreateInput): Promise<Link> {
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

  async update(params: {
    where: Prisma.LinkWhereUniqueInput;
    data: Prisma.LinkUpdateInput;
  }): Promise<Link> {
    const { where, data } = params;
    return this.prisma.link.update({ data, where });
  }

  async remove(where: Prisma.LinkWhereUniqueInput): Promise<Link> {
    return this.prisma.link.delete({ where });
  }

  async findOne(byId: Prisma.LinkWhereUniqueInput): Promise<Link | null> {
    return this.prisma.link.findUnique({
      where: byId,
      include: {
        domain: {
          select: {
            home: true,
            indexPath: true,
            contentPath: true,
            headerPath: true,
            categoryPath: true,
          },
        },
      },
    });
  }

  async count(params: { where: Prisma.LinkWhereInput }): Promise<number> {
    return this.prisma.link.count(params);
  }

  async findMany(params: {
    pageIndex: number;
    pageSize: number,
    where?: Prisma.LinkWhereInput;
    orderBy?: Prisma.LinkOrderByInput;
  }): Promise<Link[]> {
    const { pageIndex, pageSize, where, orderBy } = params;
    const skip = pageIndex * pageSize - pageSize;
    return this.prisma.link.findMany({
      skip,
      take: +pageSize,
      where,
      orderBy,
      include: {
        domain: {
          select: { home: true },
        },
      },
    });
  }
}
