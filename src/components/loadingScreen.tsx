import { Spin } from "antd";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Spin size="large" />
    </div>
  );
};

export default LoadingScreen;
