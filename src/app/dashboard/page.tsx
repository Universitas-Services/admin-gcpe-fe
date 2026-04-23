'use client';

import {
  Users,
  Building2,
  Shield,
  ShieldCheck,
  ClipboardList,
  Ban,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
} from 'recharts';

// ──────────────────────────────────────
// Mock Data
// ──────────────────────────────────────

const kpiCards = [
  {
    title: 'Usuarios Totales',
    value: '24,592',
    icon: Users,
    change: '+12%',
  },
  {
    title: 'Servidores Públicos',
    value: '8,405',
    icon: Building2,
    change: '+4%',
  },
  {
    title: 'Asesores Privados',
    value: '12,130',
    icon: Shield,
    change: '+8%',
  },
  {
    title: 'Usuarios Verificados',
    value: '22,850',
    icon: ShieldCheck,
    change: 'Estable',
  },
  {
    title: 'Pendientes Verificar',
    value: '1,420',
    icon: ClipboardList,
    change: '-2%',
  },
  {
    title: 'Suspensiones',
    value: '322',
    icon: Ban,
    change: '-5%',
  },
];

const evolutionData = [
  { month: 'Ene', users: 4200 },
  { month: 'Feb', users: 8100 },
  { month: 'Mar', users: 6500 },
  { month: 'Abr', users: 12800 },
  { month: 'May', users: 16500 },
  { month: 'Jun', users: 19200 },
];

const distributionData = [
  { name: 'Asesores', value: 12130, fill: '#0091be' },
  { name: 'Servidores', value: 8405, fill: '#005282' },
];

const recentUsers = [
  {
    id: '1',
    name: 'Ana Martínez',
    email: 'ana.m@universidad.edu',
    initials: 'AM',
    type: 'Servidor Público' as const,
    typeIcon: Building2,
    status: 'Activo' as const,
    registrationDate: '15 Abr 2026',
  },
  {
    id: '2',
    name: 'Carlos Díaz',
    email: 'carlos.consultor@corp.com',
    initials: 'CD',
    type: 'Asesor Privado' as const,
    typeIcon: Shield,
    status: 'Pendiente' as const,
    registrationDate: '18 Abr 2026',
  },
  {
    id: '3',
    name: 'Laura Sánchez',
    email: 'laura.s@gobierno.gob',
    initials: 'LS',
    type: 'Servidor Público' as const,
    typeIcon: Building2,
    status: 'Activo' as const,
    registrationDate: '20 Abr 2026',
  },
];

// ──────────────────────────────────────
// Chart Configs
// ──────────────────────────────────────

const barChartConfig = {
  users: {
    label: 'Usuarios',
    color: '#0091be',
  },
};

const pieChartConfig = {
  asesores: {
    label: 'Asesores',
    color: '#0091be',
  },
  servidores: {
    label: 'Servidores',
    color: '#005282',
  },
};

// ──────────────────────────────────────
// Helpers
// ──────────────────────────────────────

function getBadgeVariant(status: string) {
  switch (status) {
    case 'Activo':
      return 'default';
    case 'Pendiente':
      return 'secondary';
    case 'Suspendido':
      return 'destructive';
    default:
      return 'secondary';
  }
}

function getBadgeClasses(status: string) {
  switch (status) {
    case 'Activo':
      return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none';
    case 'Pendiente':
      return 'bg-amber-100 text-amber-700 hover:bg-amber-100 border-none';
    case 'Suspendido':
      return 'bg-red-100 text-red-700 hover:bg-red-100 border-none';
    default:
      return '';
  }
}

// ──────────────────────────────────────
// Page Component
// ──────────────────────────────────────

export default function DashboardPage() {
  const totalDistribution = distributionData.reduce(
    (sum, d) => sum + d.value,
    0
  );

  return (
    <div className="flex flex-col gap-6">
      {/* ── Fila 1: Título ── */}
      <div>
        <h1 className="text-3xl font-bold text-[#005282]">
          Panel Administrativo
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Métricas avanzadas y análisis de crecimiento.
        </p>
      </div>

      {/* ── Fila 2: KPI Cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpiCards.map((kpi) => (
          <Card
            key={kpi.title}
            className="border-none shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0091be]/10">
                  <kpi.icon className="h-5 w-5 text-[#0091be]" />
                </div>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                  {kpi.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-[13px] font-bold text-[#005282]">
                  {kpi.title}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Fila 3: Gráficos ── */}
      <div className="grid grid-cols-10 gap-4">
        {/* Bar Chart — Evolución de Usuarios */}
        <Card className="col-span-10 lg:col-span-7 border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900">
              Evolución de Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer
              config={barChartConfig}
              className="h-[280px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={evolutionData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) =>
                      v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
                    }
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="users"
                    fill="#0091be"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie Chart — Distribución */}
        <Card className="col-span-10 lg:col-span-3 border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900">
              Distribución
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer
              config={pieChartConfig}
              className="h-[220px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={distributionData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={85}
                    strokeWidth={2}
                    stroke="#ffffff"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) - 6}
                                className="fill-gray-900 text-xl font-bold"
                              >
                                {(totalDistribution / 1000).toFixed(0)}k
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 14}
                                className="fill-gray-500 text-xs"
                              >
                                Activos
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>

            {/* Leyenda */}
            <div className="mt-2 flex items-center justify-center gap-6">
              {distributionData.map((entry) => (
                <div
                  key={entry.name}
                  className="flex items-center gap-2 text-xs text-gray-600"
                >
                  <span
                    className="inline-block h-3 w-3 rounded-sm"
                    style={{ backgroundColor: entry.fill }}
                  />
                  {entry.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Fila 4: Tabla de Usuarios Recientes ── */}
      <Card className="border-none shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900">
            Usuarios Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Usuario
                </TableHead>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Tipo
                </TableHead>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Estado
                </TableHead>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Fecha de Registro
                </TableHead>
                <TableHead className="text-xs font-medium uppercase text-gray-500 text-right">
                  Acción
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50"
                >
                  {/* Nombre + Avatar */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-[#0091be]/10 text-[#0091be] text-xs font-semibold">
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Tipo de usuario */}
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <user.typeIcon className="h-4 w-4 text-gray-400" />
                      {user.type}
                    </div>
                  </TableCell>

                  {/* Estado */}
                  <TableCell>
                    <Badge
                      variant={getBadgeVariant(user.status)}
                      className={`text-xs font-medium ${getBadgeClasses(user.status)}`}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>

                  {/* Fecha */}
                  <TableCell className="text-sm text-gray-600">
                    {user.registrationDate}
                  </TableCell>

                  {/* Acción */}
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-gray-200 text-gray-600 hover:text-[#0091be] hover:border-[#0091be] transition-colors cursor-pointer"
                    >
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
