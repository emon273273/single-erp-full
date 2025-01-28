import Loader from "@/components/loader/loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import AppSettings from "@/components/settings/AppSettings/AppSettings";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AddDetails = lazy(() => import("@/components/settings/addDetails"));
export default function SettingRoutes() {
  return (
    <Routes>
      <Route
        path="/app-settings"
        exact
        element={
          <Suspense fallback={<Loader />}>
            <PermissionChecker permission={"readAll-setting"}>
              <AppSettings />
            </PermissionChecker>
          </Suspense>
        }
        key="settings"
      />
      ,
      <Route
        path="/company-setting"
        exact
        element={
          <Suspense fallback={<Loader />}>
            <PermissionChecker permission={"readAll-setting"}>
              <AddDetails />
            </PermissionChecker>
          </Suspense>
        }
        key="company-setting"
      />
      ,
    </Routes>
  );
}
