import { useMemo } from "react";
import get from "lodash/get";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { useLogout, useUnlinkTask } from "./hooks";
import { isNavigatePayload } from "./utils";
import {
  HomePage,
  LoginPage,
  ViewTaskPage,
  LinkTasksPage,
  CreateTaskPage,
  LoadingAppPage,
  AdminCallbackPage,
} from "./pages";
import type { FC } from "react";
import type { EventPayload } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { client } = useDeskproAppClient();
  const { logout, isLoading: isLoadingLogout } = useLogout();
  const { unlink, isLoading: isLoadingUnlink } = useUnlinkTask();
  const isAdmin = useMemo(() => pathname.includes("/admin/"), [pathname]);
  const isLoading = [isLoadingLogout, isLoadingUnlink].some((isLoading) => isLoading);

  useDeskproElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    return match(payload.type)
      .with("changePage", () => {
        if (isNavigatePayload(payload)) {
          navigate(payload.path);
        }
      })
      .with("logout", logout)
      .with("unlink", () => unlink(get(payload, ["task"])))
      .run();
  }, 500);

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(() => client.resize(), 200);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onElementEvent: debounceElementEvent,
  }, [client]);

  if (!client || isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/admin/callback" element={<AdminCallbackPage/>}/>)
        <Route path="/login" element={<LoginPage/>}/>)
        <Route path="/link" element={<LinkTasksPage/>}/>)
        <Route path="/home" element={<HomePage/>}/>)
        <Route path="/task/view/:taskId" element={<ViewTaskPage/>}/>
        <Route path="/task/create" element={<CreateTaskPage/>}/>)
        <Route index element={<LoadingAppPage/>} />
      </Routes>
      {!isAdmin && (<><br/><br/><br/></>)}
    </>
  );
}

export { App };
