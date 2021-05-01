import { Injectable } from "@nestjs/common";
import { Content, Prisma } from "@prisma/client";
import sanitizeHtml from 'sanitize-html';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  sanitize(content: string) {
    return sanitizeHtml(content, { allowedTags: [] }).replace(
      /[\f\n\r\t\v ]{2,}/g,
      " "
    ).trim();
  }

  async upsert(linkId: number, content: string): Promise<Content> {
    content = this.sanitize(content);
    return this.prisma.content.upsert({
      where: {
        linkId: +linkId,
      },
      update: {
        content,
      },
      create: {
        content,
        link: {
          connect: {
            id: linkId,
          },
        },
      },
    });
  }

  async findOne(byId: Prisma.ContentWhereUniqueInput): Promise<Content | null> {
    return this.prisma.content.findUnique({
      where: byId,
    });
  }

  async count(params: { where?: Prisma.ContentWhereInput }): Promise<number> {
    return this.prisma.content.count(params);
  }

  async pageList(params: {
    pageIndex: number;
    pageSize: number,
    cursor?: Prisma.ContentWhereUniqueInput;
    where?: Prisma.ContentWhereInput;
    orderBy?: Prisma.ContentOrderByInput;
  }): Promise<Content[]> {
    const { pageIndex, pageSize, where, orderBy } = params;
    const skip = pageIndex * pageSize - pageSize;
    return this.prisma.content.findMany({
      skip,
      take: +pageSize,
      where,
      orderBy,
    });
  }

  async remove(where: Prisma.ContentWhereUniqueInput): Promise<Content> {
    return this.prisma.content.delete({
      where,
    });
  }
}
