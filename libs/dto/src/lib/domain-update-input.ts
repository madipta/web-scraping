export class DomainUpdateInput {
  id: number;
  name?: string;
  indexUrl?: string;
  contentPath?: string | null;
  createdAt?: Date | string;
  updateAt?: Date | string;
  adminEmail?: string | null;
  active?: boolean;
  disabled?: boolean;
}
