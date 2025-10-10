import { Link, useParams } from "react-router";

import { Submit } from "~/components/form/bkp/InputSubmit";
import { ErrorMessage } from "~/components/form/ErrorMessage";
import { Fieldset } from "~/components/form/Fieldset";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { FormSkeleton } from "~/components/form/FormSkeleton";
import { FormState } from "~/components/form/FormState";
import { Input } from "~/components/form/Input";
import { SelectWithSearch } from "~/components/form/SelectWithSearch";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Checkbox } from "~/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";

import { DevTool } from "@hookform/devtools";
import { DOC_TYPE } from "~/constants";
import { BASE_ROUTE, useSupplierForm } from "~/features/suppliers/useSupplierForm";
import { useGetSupplierFormDataQuery } from "~/graphql/_generated/graphql";

export function SupplierForm() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { form, handleSubmit, data, isEditing, isLoading, isSaving, errors, navigate } = useSupplierForm({ id });
  const { data: formData, loading: formDataLoading } = useGetSupplierFormDataQuery();

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}

      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Proveedores</Link>
        </FormBreadcrumb>
      </AdminTopBar>

      <div className="container p-6">
        <div className="flex justify-between items-center gap-2 mb-6 md:max-w-[700px] lg:max-w-[800px]">
          <h2 className="font-xl font-bold">
            {isEditing ? "Editar Proveedor" : "Nuevo Proveedor"}
          </h2>
          {data?.SupplierID && (
            <div className="flex gap-4 text-muted-foreground text-sm">
              <span className="">ID: {data?.SupplierID}</span>
              <Separator orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <span className="text-sm">
                <strong>Creado:</strong> {new Date().toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {isLoading && <FormSkeleton className="md:max-w-[700px] lg:max-w-[800px]" />}

        {!isLoading && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
              <FormState errors={[errors.query, errors.update, errors.create]} />

              <Fieldset>
                <legend className="font-semibold mb-4 text-md">Información del documento</legend>

                <div className="md:flex md:space-x-4">
                  <FormBlock>
                    <FormField
                      name="DocTypeID"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Documento*</FormLabel>
                          <FormControl>
                            <SelectWithSearch
                              {...form.register("DocTypeID")}
                              placeholder="Seleccione Tipo..."
                              defaultValue={String(data?.DocTypeID || DOC_TYPE.CUIT)}
                              onSelect={field.onChange}
                              accessor="DocTypeID"
                              display="DocTypeName"
                              data={formData?.docTypes}
                              loading={formDataLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </FormBlock>
                  <FormBlock className='w-full'>
                    <Input
                      {...form.register("DocNumber")}
                      type="number"
                      label="Número"
                      placeholder="Ingrese el número de documento"
                      error={form.formState.errors.DocNumber?.message}
                    />
                  </FormBlock>
                </div>
              </Fieldset>

              <Fieldset>
                <legend className="font-semibold mb-1 text-md">Organización</legend>
                <FormDescription className="mb-4">Al seleccionar una compañía se desplegará nueva información en Sucursal</FormDescription>
                <div className="md:flex space-x-4">
                  <FormBlock>
                    <Label data-error={!!form.formState.errors.CompanyID?.message} htmlFor="CompanyID">Compañía</Label>
                    <Select
                      {...form.register("CompanyID")}
                      onValueChange={(id: string) => {
                        form.setValue("CompanyID", id, { shouldTouch: true, shouldDirty: true });
                        form.clearErrors("CompanyID");
                      }}
                      defaultValue={String(data?.CompanyID || "")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={formDataLoading ? "Loading..." : formData?.companies.length === 0 ? "Sin opciones" : "Seleccione..."} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {formData?.companies.map((row) => (
                            <SelectItem key={`CompanyID-${row.CompanyID}`} value={String(row.CompanyID)}>
                              {row.CompanyName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <ErrorMessage error={form.formState.errors.CompanyID?.message} />
                  </FormBlock>
                </div>
              </Fieldset>

              <Fieldset>
                <legend className="font-semibold mb-4 text-md">Información personal</legend>

                <div className="md:flex space-x-4">
                  <FormBlock>
                    <Input
                      {...form.register("FirstName")}
                      placeholder="Nombre del cliente"
                      label="Nombre*"
                      error={form.formState.errors.FirstName?.message}
                    />
                  </FormBlock>

                  <FormBlock>
                    <Input
                      {...form.register("LastName")}
                      placeholder="Apellido del cliente"
                      label="Apellido*"
                      error={form.formState.errors.LastName?.message}
                    />
                  </FormBlock>
                </div>
              </Fieldset>

              <Fieldset>
                <legend className="font-semibold mb-4 text-md">Información de contacto</legend>

                <div className="md:flex space-x-4">
                  <FormBlock>
                    <Input
                      {...form.register("Email")}
                      type="email"
                      placeholder="email@ejemplo.com"
                      label="Email*"
                      error={form.formState.errors.Email?.message}
                    />
                  </FormBlock>

                  <FormBlock>
                    <Input
                      type="tel"
                      {...form.register("Phone")}
                      placeholder="(+54) xx xxxx xxxx"
                      label="Teléfono*"
                      error={form.formState.errors.Phone?.message}
                    />
                  </FormBlock>
                </div>
              </Fieldset>

              <Fieldset>
                <legend className="font-semibold mb-4 text-md">Información de ubicación</legend>

                <FormBlock className="mb-4">
                  <Label htmlFor="Address">Dirección</Label>
                  <Input
                    type="text"
                    {...form.register("Address")}
                    placeholder="Dirección completa"
                    error={form.formState.errors.Address?.message}
                  />
                </FormBlock>

                <div className="md:flex space-x-4">
                  <FormBlock>
                    <Label htmlFor="CountryID">País*</Label>
                    <FormField
                      name="CountryID"
                      control={form.control}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            form.setValue("ProvinceID", "", { shouldTouch: true });
                          }}
                          defaultValue={String(data?.CountryID)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={formDataLoading ? "Loading..." : "Seleccione..."} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {formData?.countries.map((row) => (
                                <SelectItem key={`CountryID-${row.CountryID}`} value={String(row.CountryID)}>
                                  {row.CountryName}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FormMessage>{form.formState.errors.CountryID?.message}</FormMessage>
                  </FormBlock>
                  <FormBlock>
                    <FormLabel htmlFor="ProvinceID">Provincia*</FormLabel>
                    <FormField
                      name="ProvinceID"
                      control={form.control}
                      render={({ field, fieldState }) => {
                        const countryId = form.watch("CountryID");
                        const availableProvinces = (formData?.provinces || []).filter(
                          (p) => String(p.CountryID) === String(countryId) || String(p.ProvinceID) === field.value
                        );

                        return (
                          <Select
                            onValueChange={(value) => {
                              if (fieldState.isTouched) {
                                field.onChange(String(value))
                              }
                            }}
                            defaultValue={String(data?.ProvinceID)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={formDataLoading ? "Loading..." : availableProvinces.length === 0 ? "Sin opciones" : "Seleccione..."} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {availableProvinces.map((row) => (
                                  <SelectItem key={`provinceID-${row.ProvinceID}`} value={String(row.ProvinceID)}>
                                    {row.ProvinceName}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )
                      }}
                    />
                    <FormMessage>{form.formState.errors.ProvinceID?.message}</FormMessage>
                  </FormBlock>
                </div>

                <div className="flex space-x-6">
                  <FormBlock>
                    <Label htmlFor="City">Ciudad</Label>
                    <Input
                      type="text"
                      {...form.register("City")}
                      placeholder="Ciudad"
                      error={form.formState.errors.City?.message}
                    />
                  </FormBlock>

                  <FormBlock>
                    <Label htmlFor="PostalCode">Código Postal</Label>
                    <Input
                      type="text"
                      {...form.register("PostalCode")}
                      placeholder="Código postal"
                      error={form.formState.errors.PostalCode?.message}
                    />
                  </FormBlock>
                </div>
              </Fieldset>

              <Fieldset>
                <FormBlock className="space-y-2">
                  <Label>
                    <Checkbox
                      id="IsActive"
                      {...form.register("IsActive")}
                      defaultChecked={Boolean(data?.IsActive)}
                    />
                    Cliente activo
                  </Label>
                  <FormDescription>
                    Los clientes inactivos no aparecerán en las búsquedas por defecto
                  </FormDescription>
                </FormBlock>
              </Fieldset>

              <Fieldset className="items-center">
                <FormBlock className="p-4 space-x-2 flex justify-between bg-card">
                  <Link className="mt-auto" to={BASE_ROUTE}>Cancel</Link>
                  <Submit type="submit" disabled={isLoading || isSaving} isSubmitting={isSaving}>
                    Guardar
                  </Submit>
                </FormBlock>
              </Fieldset>
            </form>
          </Form>
        )}
      </div>
    </>
  )
}


// export function SupplierCreateWindow({
//   onClose,
//   onSave,
//   supplier: initialSupplier = null,
// }) {
// const availableProvinces = formData?.provinces.filter(
//   (p) => p.CountryID === data?.CountryID
// );
// const availableBranches = formData?.branches.filter(
//   (b) => b.CompanyID === parseInt(supplier.companyID)
// );
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">
//         {isEditing ? "Editar Proveedor" : "Nuevo Proveedor"}
//       </h2>
//       {error && (
//         <Alert variant="destructive">
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className=" p-4 rounded-lg">
//           <h3 className="text-lg font-semibold mb-4">
//             Información del Documento
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Tipo de Documento *
//               </label>
//               <select
//                 name="docTypeID"
//                 value={supplier.docTypeID}
//                 onChange={handleChange}
//                 className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               >
//                 <option value="">Seleccione</option>
//                 {formData.sysDocTypes.map((dt) => (
//                   <option key={dt.DocTypeID} value={dt.DocTypeID}>
//                     {dt.Name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Número de Documento
//               </label>
//               <input
//                 type="text"
//                 name="docNumber"
//                 placeholder="Ingrese el número de documento"
//                 value={supplier.docNumber}
//                 onChange={handleChange}
//                 className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 maxLength={50}
//               />
//             </div>
//           </div>
//         </div>
//         <div className=" p-4 rounded-lg">
//           <h3 className="text-lg font-semibold mb-4">Organización</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Compañía</label>
//               <div className="flex items-center space-x-2">
//                 <select
//                   name="companyID"
//                   value={supplier.companyID}
//                   onChange={handleChange}
//                   className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">Todos</option>
//                   {formData.companies.map((c) => (
//                     <option key={c.CompanyID} value={c.CompanyID}>
//                       {c.Name}
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   type="button"
//                   onClick={() => setShowCompanyModal(true)}
//                   className="text-foreground/80 hover:text-foreground"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className=" p-4 rounded-lg">
//           <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Nombre *</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="Nombre del proveedor"
//                 value={supplier.firstName}
//                 onChange={handleChange}
//                 className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//                 maxLength={100}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2">Apellido</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Apellido del proveedor"
//                 value={supplier.lastName}
//                 onChange={handleChange}
//                 className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 maxLength={100}
//               />
//             </div>
//           </div>
//         </div>
//         <div className=" p-4 rounded-lg">
//           <h3 className="text-lg font-semibold mb-4">
//             Información de Contacto
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="email@ejemplo.com"
//                 value={supplier.email}
//                 onChange={handleChange}
//                 className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 maxLength={100}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2">Teléfono</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Número de teléfono"
//                 value={supplier.phone}
//                 onChange={handleChange}
//                 className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 maxLength={20}
//               />
//             </div>
//           </div>
//         </div>
//         <div className=" p-4 rounded-lg">
//           <h3 className="text-lg font-semibold mb-4">
//             Información de Ubicación
//           </h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Dirección
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Dirección completa"
//                 value={supplier.address}
//                 onChange={handleChange}
//                 className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 maxLength={200}
//               />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">País *</label>
//                 <select
//                   name="countryID"
//                   value={supplier.countryID}
//                   onChange={handleChange}
//                   className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 >
//                   <option value="">Seleccione</option>
//                   {formData.countries.map((c) => (
//                     <option key={c.CountryID} value={c.CountryID}>
//                       {c.Name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Provincia *
//                 </label>
//                 <select
//                   name="provinceID"
//                   value={supplier.provinceID}
//                   onChange={handleChange}
//                   className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 >
//                   <option value="">Seleccione</option>
//                   {availableProvinces.length > 0 ? (
//                     availableProvinces.map((p) => (
//                       <option key={p.ProvinceID} value={p.ProvinceID}>
//                         {p.Name}
//                       </option>
//                     ))
//                   ) : (
//                     <option value="">No hay provincias disponibles</option>
//                   )}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">Ciudad</label>
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="Ciudad"
//                   value={supplier.city}
//                   onChange={handleChange}
//                   className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   maxLength={100}
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Código Postal
//                 </label>
//                 <input
//                   type="text"
//                   name="postalCode"
//                   placeholder="Código postal"
//                   value={supplier.postalCode}
//                   onChange={handleChange}
//                   className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   maxLength={20}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className=" p-4 rounded-lg">
//           <div className="mt-4">
//             <label className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 name="isActive"
//                 checked={supplier.isActive}
//                 onChange={handleChange}
//                 className="w-4 h-4 text-primary   rounded focus:ring-blue-500"
//               />
//               <span className="text-sm font-medium">Proveedor activo</span>
//             </label>
//             <p className="text-xs text-foreground/80 mt-1">
//               Los proveedores inactivos no aparecerán en las búsquedas por
//               defecto
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-end space-x-4 pt-6 border-t">
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={loading}
//             className="px-6 py-3 border  rounded-lg hover: disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Cancelar
//           </button>
//           <button
//             type="submit"
//             disabled={loading || !supplier.firstName.trim()}
//             className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 {isEditing ? "Actualizando..." : "Guardando..."}
//               </>
//             ) : isEditing ? (
//               "Actualizar Proveedor"
//             ) : (
//               "Guardar Proveedor"
//             )}
//           </button>
//         </div>
//       </form>
//       {showCompanyModal && (
//         <CompanySearchModal
//           isOpen={true}
//           onClose={() => setShowCompanyModal(false)}
//           onSelect={(c) => {
//             setSupplier((prev) => ({
//               ...prev,
//               companyID: c.CompanyID,
//               branchID: "",
//             }));
//             setShowCompanyModal(false);
//           }}
//         />
//       )}
//       {showBranchModal && (
//         <BranchSearchModal
//           isOpen={true}
//           companyID={supplier.companyID || null}
//           onClose={() => setShowBranchModal(false)}
//           onSelect={(b) => {
//             setSupplier((prev) => ({
//               ...prev,
//               branchID: b.BranchID,
//               companyID: prev.companyID || b.CompanyID,
//             }));
//             setShowBranchModal(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }