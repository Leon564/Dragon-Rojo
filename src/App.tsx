import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import AuthProvider from "./auth.context";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { Suspense } from "react";
import LoadingScreen from "./components/common/loadingScreen";

const App = () => {
 
  return (
    <Suspense fallback={<LoadingScreen />}>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
    </Suspense>
  );
};

export default App;
