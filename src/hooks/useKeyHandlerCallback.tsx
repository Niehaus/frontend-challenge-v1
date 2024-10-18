import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useKeyHandlerCallback(ref: React.RefObject<HTMLElement>, callback: Function, keyCode: string) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleKeyDown(evt: KeyboardEvent) {
      if (ref.current && evt.code == keyCode ) {
        callback()
      }
    }
    // Bind the event listener
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref]);
}