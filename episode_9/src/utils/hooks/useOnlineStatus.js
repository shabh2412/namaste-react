import { useEffect } from "react";
import { useState } from "react";

const useOnlineStatus = () => {
  const [online_status, set_online_status] = useState(true);
  const handle_online = (e) => {
    set_online_status(true);
  };
  const handle_offline = (e) => {
    set_online_status(false);
  };

  useEffect(() => {
    window.removeEventListener("online", handle_online);
    window.addEventListener("online", handle_online);
    window.removeEventListener("offline", handle_offline);
    window.addEventListener("offline", handle_offline);
  }, []);

  return online_status;
};

export default useOnlineStatus;