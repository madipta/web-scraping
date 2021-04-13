import { createHash } from "crypto";
import { Injectable } from "@nestjs/common";
import { Content, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  private createContentHash(content) {
    if (!content) {
      return "";
    }
    return createHash("sha256").update(content).digest("hex");
  }

  async create(data: Prisma.ContentCreateInput): Promise<Content> {
    data.contentHash = this.createContentHash(data.content);
    return this.prisma.content.create({
      data,
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

  async update(params: {
    where: Prisma.ContentWhereUniqueInput;
    data: Prisma.ContentUpdateInput;
  }): Promise<Content> {
    const { where, data } = params;
    data.contentHash = this.createContentHash(data.content);
    return this.prisma.content.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ContentWhereUniqueInput): Promise<Content> {
    return this.prisma.content.delete({
      where,
    });
  }
}
