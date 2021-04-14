import { Injectable } from "@nestjs/common";
import { Content, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import sanitizeHtml from 'sanitize-html';

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

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ContentWhereUniqueInput;
    where?: Prisma.ContentWhereInput;
    orderBy?: Prisma.ContentOrderByInput;
  }): Promise<Content[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.content.findMany({
      skip,
      take,
      cursor,
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
