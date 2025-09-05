import {
  Boxes,
  ChartColumnBig,
  ChevronRight,
  CircleAlert,
  PackageCheck,
  PackagePlus,
  PiggyBank,
  Settings,
  Ship,
  TriangleAlert,
  User,
  UserRoundCog,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useGetDashboardDataQuery } from "~/graphql/_generated/graphql";
import { dashboardHelpers } from "~/utils/dashboard";

import { NavLink } from "react-router-dom";
import {
  DiagnosticButton,
  DiagnosticInfo,
} from "~/components/diagnostic/Diagnostic";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
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
  const [errorStats, setErrorStats] = useState(null);

  // Cargar acceso seleccionado del sessionStorage
  const selectedAccess = AuthHelper.getSelectedAccess();

  useEffect(() => {
    try {
      if (!data || !selectedAccess) return;
      const companyId = selectedAccess?.companyID || selectedAccess?.CompanyID;
      const stats = dashboardHelpers.processDashboardData(data, companyId);
      console.log("Estadísticas procesadas:", stats);
      setDashboardStats(stats);
    } catch (err) {
      console.error("Error cargando estadísticas:", err);
      // Fallback: establecer estadísticas en cero
      setDashboardStats(dashboardStatsInit);
      // Mostrar error pero permitir que el dashboard se muestre
      setErrorStats(`Error cargando datos: ${err.message}`);
    }
  }, [data, selectedAccess, setErrorStats]);

  return (
    <div className="container p-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <div>
          <DiagnosticButton />
        </div>
      </div>

      {loading && (
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-accent h-32 p-6 rounded-lg border border-l-4"
              />
            ))}
          </div>
        </div>
      )}

      <DiagnosticInfo />
      {loading && (
        <div className="my-2">
          <AlertLoading />
        </div>
      )}
      {error && (
        <div className="my-2">
          <ApiErrorMessage message={error} />
        </div>
      )}
      {errorStats && (
        <div className="my-2">
          <Alert variant="destructive">
            <TriangleAlert />
            <AlertDescription>{errorStats}</AlertDescription>
          </Alert>
        </div>
      )}

      {!loading && dashboardStats?.pendingOrders > 0 && (
        <Alert className="relative border rounded-lg p-4 mb-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className=" p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold  mb-2">Clientes</h3>
                <p className="text-3xl font-bold">
                  {dashboardStats.totalClients}
                </p>
                <p className="text-sm text-foreground/80 mt-1">
                  {dashboardStats.activeClients} activos
                </p>
              </div>
              <User
                size="72"
                strokeWidth={1.25}
                className="text-muted-foreground"
              />
            </div>
          </div>

          <div className=" p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Items</h3>
                <p className="text-3xl font-bold">
                  {dashboardStats.totalItems}
                </p>
                <p className="text-sm text-foreground/80 mt-1">
                  {dashboardStats.lowStockItems} con stock bajo
                </p>
              </div>
              <Boxes
                size="72"
                strokeWidth={1.25}
                className="text-muted-foreground"
              />
            </div>
          </div>

          <div className=" p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold  mb-2">Órdenes</h3>
                <p className="text-3xl font-bold ">
                  {dashboardStats.totalOrders}
                </p>
                <p className="text-sm text-foreground/80 mt-1">
                  {dashboardStats.pendingOrders} pendientes
                </p>
              </div>
              <PackageCheck
                size="72"
                strokeWidth={1.25}
                className="text-muted-foreground"
              />
            </div>
          </div>

          <div className=" p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold  mb-2">Ventas del Mes</h3>
                <p className="text-3xl font-bold">
                  $
                  {dashboardStats.monthlySales?.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) || "0,00"}
                </p>
                <p className="text-sm text-foreground/80 mt-1">
                  {dashboardStats.completedOrders} completadas
                </p>
              </div>
              <PiggyBank
                size="72"
                strokeWidth={1.25}
                className="text-muted-foreground"
              />
            </div>
          </div>
        </div>
      )}

      {/* Resumen adicional */}
      {!loading && dashboardStats && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border">
            <h3 className="text-lg font-semibold  mb-4">
              Resumen de Inventario
            </h3>
            <div className="space-y-3">
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
                        ? `${
                            (dashboardStats.activeItems /
                              dashboardStats.totalItems) *
                            100
                          }%`
                        : "0%",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className=" p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Actividad de Órdenes</h3>
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
            <div className="w-full  rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{
                  width:
                    dashboardStats.totalOrders > 0
                      ? `${
                          (dashboardStats.completedOrders /
                            dashboardStats.totalOrders) *
                          100
                        }%`
                      : "0%",
                }}
              />
            </div>
          </div>
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

      <div className="mt-4">
        <h2 className="text-md font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => window.open("/clients", "_blank")}
            className="p-4 bg-card hover:bg-primary/10 hover:shadow-sm border hover:border-primary/80 rounded-lg border-l-4 text-left"
          >
            <div className="flex items-center mb-2 gap-1">
              <UserRoundCog />
              <h3 className="font-semibold ">Gestionar Clientes</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Ver, crear y editar clientes
            </p>
          </button>

          <button
            onClick={() => window.open("/suppliers", "_blank")}
            className="p-4 bg-card hover:bg-primary/10 hover:shadow-sm border hover:border-primary/80 rounded-lg border-l-4 text-left"
          >
            <div className="flex items-center mb-2 gap-1">
              <Ship />
              <h3 className="font-semibold ">Gestionar Proveedores</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Ver, crear y editar proveedores
            </p>
          </button>

          <button
            onClick={() => window.open("/orders", "_blank")}
            className="p-4 bg-card hover:bg-primary/10 hover:shadow-sm border hover:border-primary/80 rounded-lg border-l-4 text-left"
          >
            <div className="flex items-center mb-2 gap-1">
              <PackagePlus />
              <h3 className="font-semibold ">Nueva Orden</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Crear una nueva orden de compra
            </p>
          </button>

          <button
            onClick={() => window.open("/items", "_blank")}
            className="p-4 bg-card hover:bg-primary/10 hover:shadow-sm border hover:border-primary/80 rounded-lg border-l-4 text-left"
          >
            <div className="flex items-center mb-2 gap-1">
              <Boxes />
              <h3 className="font-semibold ">Gestionar Items</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Ver inventario y gestionar stock
            </p>
          </button>

          <button
            onClick={() => window.open("/reports", "_blank")}
            className="p-4 bg-card hover:bg-primary/10 hover:shadow-sm border hover:border-primary/80 rounded-lg border-l-4 text-left"
          >
            <div className="flex items-center mb-2 gap-1">
              <ChartColumnBig />
              <h3 className="font-semibold ">Reportes</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Ver reportes y estadísticas
            </p>
          </button>

          <button
            onClick={() => window.open("/settings", "_blank")}
            className="p-4 bg-card hover:bg-primary/10 hover:shadow-sm border hover:border-primary/80 rounded-lg border-l-4 text-left"
          >
            <div className="flex items-center mb-2 gap-1">
              <Settings />
              <h3 className="font-semibold ">Configuración</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Configurar sistema y usuarios
            </p>
          </button>
        </div>
      </div>

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
  );
}
