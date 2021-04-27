import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { DomainDataAccess } from "./domain/domain-data-access";
import { LinkDataAccess } from "./link/link-data-access";
import { ContentService } from "./content/content.service";

@Module({
  providers: [PrismaService, DomainDataAccess, LinkDataAccess, ContentService],
  exports: [DomainDataAccess, LinkDataAccess, ContentService],
})
export class DataAccessModule {}
