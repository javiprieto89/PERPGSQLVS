import {
  Boxes,
  ChevronRight,
  CircleAlert,
  PackageCheck,
  PiggyBank,
  TriangleAlert,
  User
} from "lucide-react";
import { useEffect, useState } from "react";

import { useGetDashboardDataQuery } from "~/graphql/_generated/graphql";
import { dashboardHelpers } from "~/utils/dashboard";

import { NavLink } from "react-router-dom";
import {
  DiagnosticInfo
} from "~/components/diagnostic/Diagnostic";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { AuthHelper } from "~/utils/authHelper";

const dashboardStatsInit = {
  totalClients: 0,
  activeClients: 0,
  totalItems: 0,
  activeItems: 0,
  lowStockItems: 0,
  pendingOrders: 0,
  totalOrders: 0,
  completedOrders: 0,
  monthlySales: 0,
  monthlyOrdersCount: 0,
};

export default function Dashboard() {
  const { data, error, loading } = useGetDashboardDataQuery();
  const [dashboardStats, setDashboardStats] = useState(dashboardStatsInit);
  const [errorStats, setErrorStats] = useState<string | null>(null);

  // Cargar acceso seleccionado del sessionStorage
  useEffect(() => {
    try {
      const selectedAccess = AuthHelper.getSelectedAccess();
      if (!data || !selectedAccess) return;
      const stats = dashboardHelpers.processDashboardData(data, selectedAccess?.CompanyID);
      console.log("Estadísticas procesadas:", stats);
      setDashboardStats(stats);
    } catch (err) {
      console.error("Error cargando estadísticas:", err);
      // Fallback: establecer estadísticas en cero
      setDashboardStats(dashboardStatsInit);
      // Mostrar error pero permitir que el dashboard se muestre
      setErrorStats(`Error cargando datos: ${(err as Error).message}`);
    }
  }, [data, setErrorStats]);

  return (
    <>
      <AdminTopBar title="Dashboard" />
      <div className="container-lg m-x-auto space-y-6 p-6">

        <DiagnosticInfo />


        {loading && <AlertLoading />}
        {error && <ApiErrorMessage error={error} />}
        {errorStats && (
          <Alert variant="destructive">
            <TriangleAlert />
            <AlertDescription>{errorStats}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <div className="animate-pulse">
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-accent h-32 p-4 rounded-lg border border-l-4"
                />
              ))}
            </div>
          </div>
        )}

        {!loading && dashboardStats?.pendingOrders > 0 && (
          <Alert className="relative border rounded-lg p-4">
            <CircleAlert />
            <AlertTitle>Órdenes Pendientes</AlertTitle>
            <AlertDescription>
              <p>
                Tienes {dashboardStats.pendingOrders} orden(es) pendientes de
                procesar.
              </p>
            </AlertDescription>
            <Button
              asChild
              variant="primary"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <NavLink to="/orders?status=pending">
                <span className="hidden md:block ">Ver pendientes</span>{" "}
                <ChevronRight />
              </NavLink>
            </Button>
          </Alert>
        )}

        {!loading && dashboardStats && (
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs grid grid-cols-2 xl:grid-cols-4 gap-4">
            <Card className="@container/card">
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardDescription>Clientes</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {dashboardStats.totalClients}
                  </CardTitle>
                  <p className="text-sm text-foreground/80 mt-1">
                    {dashboardStats.activeClients} activos
                  </p>
                </div>
                <User
                  size="72"
                  strokeWidth={1.25}
                  className="text-muted-foreground/50"
                />
              </CardHeader>
            </Card>

            <Card className="@container/card">
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardDescription>Items</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {dashboardStats.totalItems}
                  </CardTitle>
                  <p className="text-sm text-foreground/80 mt-1">
                    {dashboardStats.lowStockItems} con stock bajo
                  </p>
                </div>
                <Boxes
                  size="72"
                  strokeWidth={1.25}
                  className="text-muted-foreground/50"
                />
              </CardHeader>
            </Card>

            <Card className="@container/card">
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardDescription>Órdenes</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {dashboardStats.totalOrders}
                  </CardTitle>
                  <p className="text-sm text-foreground/80 mt-1">
                    {dashboardStats.pendingOrders} pendientes
                  </p>
                </div>
                <PackageCheck
                  size="72"
                  strokeWidth={1.25}
                  className="text-muted-foreground/50"
                />
              </CardHeader>
            </Card>

            <Card className="@container/card">
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardDescription>Ventas del Mes</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    $
                    {dashboardStats.monthlySales?.toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || "0,00"}
                  </CardTitle>
                  <p className="text-sm text-foreground/80 mt-1">
                    {dashboardStats.completedOrders} completadas
                  </p>
                </div>
                <PiggyBank
                  size="72"
                  strokeWidth={1.25}
                  className="text-muted-foreground/50"
                />
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Resumen adicional */}
        {!loading && dashboardStats && (
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="@container/card">
              <CardHeader>
                Resumen de Inventario
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <span className="text-foreground/80">Items activos:</span>
                  <span className="font-semibold">
                    {dashboardStats.activeItems} / {dashboardStats.totalItems}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/80">
                    Items con stock bajo:
                  </span>
                  <span className="font-semibold">
                    {dashboardStats.lowStockItems}
                  </span>
                </div>
                <div className="w-full  rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width:
                        dashboardStats.totalItems > 0
                          ? `${(dashboardStats.activeItems /
                            dashboardStats.totalItems) *
                          100
                          }%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card className="@container/card">
              <CardHeader>Actividad de Órdenes</CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <NavLink
                    to="/orders?status=pending"
                    className="w-full bg-card flex lg:flex-col items-center gap-2 p-4 rounded-sm text-center text-secondary-foreground"
                  >
                    <span className="text-5xl">{dashboardStats.pendingOrders}</span>
                    <span className="text-md">pendientes</span>
                  </NavLink>
                  <NavLink
                    className="w-full bg-card flex lg:flex-col items-center gap-2 p-4 rounded-sm text-center text-secondary-foreground"
                    to="/orders?status=complete"
                  >
                    <span className="text-5xl">
                      {dashboardStats.completedOrders}
                    </span>
                    <span className="text-md">completadas</span>
                  </NavLink>
                  <NavLink
                    className="w-full bg-card flex lg:flex-col items-center gap-2 p-4 rounded-sm text-center text-secondary-foreground"
                    to="/orders?status=monthly"
                  >
                    <span className="text-5xl">
                      {dashboardStats.monthlyOrdersCount}
                    </span>
                    <span className="text-md">este mes</span>
                  </NavLink>
                </div>
                <div className="bg-accent w-full rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full w-full"
                    style={{
                      width:
                        dashboardStats.totalOrders > 0
                          ? `${(dashboardStats.completedOrders / dashboardStats.totalOrders) * 100}%`
                          : undefined,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Alertas y notificaciones */}
        {dashboardStats && (
          <div className="mt-4">
            {dashboardStats.lowStockItems > 0 && (
              <div className="border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-destructive mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h4 className="text-destructive font-semibold">
                    Atención: Stock Bajo
                  </h4>
                </div>
                <p className="text-destructive mt-1">
                  Hay {dashboardStats.lowStockItems} item(s) con stock por debajo
                  del mínimo requerido.
                </p>
                <Button
                  onClick={() => window.open("/items?filter=lowstock", "_blank")}
                  className="mt-2 text-destructive underline hover:text-destructive"
                >
                  Ver items con stock bajo →
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Footer del dashboard */}
        <div className="mt-4 pt-6 border-t ">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Última actualización: {new Date().toLocaleString("es-AR")}
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => window.location.reload()}
              >
                Actualizar datos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
