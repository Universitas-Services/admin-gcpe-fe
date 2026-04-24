// Mock data para el servicio del dashboard

export interface KPIs {
  totalUsers: number;
  activeProviders: number;
  inactiveProviders: number;
  usersWithCompliance: number;
  usersManagerProviders: number;
  usersWithManual: number;
  totalProviders: number;
}

export interface SpecialtyBreakdown {
  bienes: number;
  servicios: number;
  obras: number;
}

export interface ContractLevel {
  alta: number;
  media: number;
  baja: number;
}

export interface RecentProvider {
  id: string;
  rif: string;
  razonSocial: string;
  nivel: 'ALTA' | 'MEDIA' | 'BAJA';
  status: 'Activo' | 'Inactivo';
}

export interface LatestAudit {
  id: string;
  nomenclatura: string;
  entidad: string;
  fecha: string;
  autor: string;
}

export interface RecentUser {
  id: string;
  name: string;
  email: string;
  cargo: string;
  institucion: string;
}

export interface DashboardMetrics {
  kpis: KPIs;
  specialtyBreakdown: SpecialtyBreakdown;
  contractLevel: ContractLevel;
  recentProviders: RecentProvider[];
  latestAudits: LatestAudit[];
  recentUsers: RecentUser[];
  userGrowth: { month: string; users: number }[];
}

export const dashboardService = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      kpis: {
        totalUsers: 24592,
        activeProviders: 18400,
        inactiveProviders: 2100,
        usersWithCompliance: 15420,
        usersManagerProviders: 3200,
        usersWithManual: 850,
        totalProviders: 20500,
      },
      specialtyBreakdown: {
        bienes: 8500,
        servicios: 7200,
        obras: 4800,
      },
      contractLevel: {
        alta: 3200,
        media: 8500,
        baja: 8800,
      },
      recentProviders: [
        {
          id: '1',
          rif: 'J-12345678-9',
          razonSocial: 'Proveedor Alpha C.A.',
          nivel: 'ALTA',
          status: 'Activo',
        },
        {
          id: '2',
          rif: 'J-98765432-1',
          razonSocial: 'Servicios Beta S.A.',
          nivel: 'MEDIA',
          status: 'Inactivo',
        },
        {
          id: '3',
          rif: 'J-45678912-3',
          razonSocial: 'Constructora Gamma',
          nivel: 'ALTA',
          status: 'Activo',
        },
        {
          id: '4',
          rif: 'J-78912345-6',
          razonSocial: 'Suministros Delta',
          nivel: 'BAJA',
          status: 'Activo',
        },
      ],
      latestAudits: [
        {
          id: '1',
          nomenclatura: 'AUD-2026-001',
          entidad: 'Ministerio de Educación',
          fecha: '2026-04-20',
          autor: 'Ana Martínez',
        },
        {
          id: '2',
          nomenclatura: 'AUD-2026-002',
          entidad: 'Gobernación del Estado',
          fecha: '2026-04-22',
          autor: 'Carlos Díaz',
        },
        {
          id: '3',
          nomenclatura: 'AUD-2026-003',
          entidad: 'Alcaldía Mayor',
          fecha: '2026-04-23',
          autor: 'Laura Sánchez',
        },
      ],
      recentUsers: [
        {
          id: '1',
          name: 'Ana Martínez',
          email: 'ana.m@universidad.edu',
          cargo: 'Auditor Senior',
          institucion: 'Ministerio de Educación',
        },
        {
          id: '2',
          name: 'Carlos Díaz',
          email: 'carlos.consultor@corp.com',
          cargo: 'Consultor Externo',
          institucion: 'Independiente',
        },
        {
          id: '3',
          name: 'Laura Sánchez',
          email: 'laura.s@gobierno.gob',
          cargo: 'Analista',
          institucion: 'Gobernación del Estado',
        },
      ],
      userGrowth: [
        { month: 'Ene', users: 4200 },
        { month: 'Feb', users: 8100 },
        { month: 'Mar', users: 6500 },
        { month: 'Abr', users: 12800 },
        { month: 'May', users: 16500 },
        { month: 'Jun', users: 24592 },
      ],
    };
  },
};
