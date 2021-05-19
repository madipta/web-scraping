export interface IDomain {
  id: number;
  home: string;
  adminEmail?: string | null;
  active?: boolean;
  disabled?: boolean;
  broken?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
