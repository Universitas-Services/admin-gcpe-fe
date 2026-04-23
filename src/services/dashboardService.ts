// Mock data para el servicio del dashboard

export interface KPIData {
  totalUsers: number;
  publicServants: number;
  privateAdvisors: number;
  verifiedUsers: number;
  pendingVerification: number;
  suspensions: number;
}

export interface ChartDataPoint {
  month: string;
  users: number;
}

export interface DistributionData {
  name: string;
  value: number;
  fill: string;
}

export interface RecentUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  type: "Servidor Público" | "Asesor Privado";
  status: "Activo" | "Pendiente" | "Suspendido";
  registrationDate: string;
}

export const dashboardService = {
  getKPIs: async (): Promise<KPIData> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      totalUsers: 24592,
      publicServants: 8405,
      privateAdvisors: 12130,
      verifiedUsers: 22850,
      pendingVerification: 1420,
      suspensions: 322,
    };
  },

  getUserEvolution: async (): Promise<ChartDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      { month: "Ene", users: 4200 },
      { month: "Feb", users: 8100 },
      { month: "Mar", users: 6500 },
      { month: "Abr", users: 12800 },
      { month: "May", users: 16500 },
      { month: "Jun", users: 19200 },
    ];
  },

  getDistribution: async (): Promise<DistributionData[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      { name: "Asesores", value: 12130, fill: "#0091be" },
      { name: "Servidores", value: 8405, fill: "#005282" },
    ];
  },

  getRecentUsers: async (): Promise<RecentUser[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      {
        id: "1",
        name: "Ana Martínez",
        email: "ana.m@universidad.edu",
        type: "Servidor Público",
        status: "Activo",
        registrationDate: "2026-04-15",
      },
      {
        id: "2",
        name: "Carlos Díaz",
        email: "carlos.consultor@corp.com",
        type: "Asesor Privado",
        status: "Pendiente",
        registrationDate: "2026-04-18",
      },
      {
        id: "3",
        name: "Laura Sánchez",
        email: "laura.s@gobierno.gob",
        type: "Servidor Público",
        status: "Activo",
        registrationDate: "2026-04-20",
      },
    ];
  },
};
