import { useEffect, useRef } from "react";

const useTitle = (title: string): void => {
  const documentDefined = typeof document !== "undefined";
  const originalTitle = useRef(documentDefined ? document.title : "");

  useEffect(() => {
    if (!documentDefined) return;

    const currentTitle = originalTitle.current;

    if (document.title !== title) document.title = title;

    return () => {
      document.title = currentTitle;
    };
  }, [documentDefined, title]);
};

export default useTitle;
