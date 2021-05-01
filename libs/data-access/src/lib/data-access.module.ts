import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { DomainDataAccess } from "./domain/domain-data-access";
import { LinkDataAccess } from "./link/link-data-access";
import { ContentDataAccess } from "./content/content-data-access";

@Module({
  providers: [
    PrismaService,
    DomainDataAccess,
    LinkDataAccess,
    ContentDataAccess,
  ],
  exports: [DomainDataAccess, LinkDataAccess, ContentDataAccess],
})
export class DataAccessModule {}
