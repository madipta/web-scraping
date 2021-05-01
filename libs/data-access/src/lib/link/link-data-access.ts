import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Link, LinkCreateInput, LinkWithRef } from "@web-scraping/dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LinkDataAccess {
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

  async findOne(
    byId: Prisma.LinkWhereUniqueInput
  ): Promise<LinkWithRef | null> {
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

  async pageList(params: {
    pageIndex: number;
    pageSize: number;
    where?: Prisma.LinkWhereInput;
    orderBy?: Prisma.LinkOrderByInput;
  }): Promise<LinkWithRef[]> {
    const { pageIndex, pageSize, where, orderBy } = params;
    const skip = pageIndex * pageSize - pageSize;
    return this.prisma.link.findMany({
      skip,
      take: +pageSize,
      where,
      orderBy,
      select: {
        id: true,
        domainId: true,
        title: true,
        url: true,
        scraped: true,
        broken: true,
        domain: {
          select: { home: true },
        },
      },
    });
  }

  async unscrapedDomainLinks(params: {
    domainId: number;
  }): Promise<LinkWithRef[]> {
    const { domainId } = params;
    return this.prisma.link.findMany({
      where: {
        AND: { domainId, scraped: false },
      },
      select: {
        id: true,
        title: true,
        url: true,
        broken: true,
        domain: true,
      },
    });
  }
}
