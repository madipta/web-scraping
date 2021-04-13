import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { DomainService } from "./domain/domain.service";
import { LinkService } from "./link/link.service";
import { ContentService } from "./content/content.service";

@Module({
  providers: [PrismaService, DomainService, LinkService, ContentService],
  exports: [DomainService, LinkService, ContentService],
})
export class DataAccessModule {}
