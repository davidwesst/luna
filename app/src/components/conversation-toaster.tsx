import { createRoot } from "react-dom/client";
import { OverlayToaster } from "@blueprintjs/core";

// workaround for use of React.render method. Will be fixed in Blueprint 5.0
// https://github.com/palantir/blueprint/issues/5212#issuecomment-1124544078
export let toaster: OverlayToaster;

createRoot(document.getElementById('toaster')!).render(
    <OverlayToaster
        position="top"
        ref={instance => {
            toaster = instance!;
        }} />
);