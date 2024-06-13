/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import logov3 from "../assets/logoV3.png";
import { Card, Input, Checkbox, Button, Form, Image } from "antd";
import { AuthContext } from "../auth.context";
import useTitle from "../hooks/useTitle";

export default function Login() {
  useTitle("Login");
  const { login, loading } = useContext(AuthContext);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="mx-4 w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Logo />
        </div>
        <Card>
          <Form
            layout="vertical"
            onFinish={login}
            initialValues={{ remember: true }}
          >
            <div className="space-y-4">
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
                className="space-y-2"
                label="Username"
              >
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                className="space-y-2"
                label="Password"
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                className="space-y-2"
              >
                <Checkbox>
                  <span className="select-none">Remember me</span>
                </Checkbox>
              </Form.Item>
            </div>

            <Form.Item className="pt-4">
              <Button htmlType="submit" className="w-full" loading={loading}>
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

function Logo() {
  return <Image src={logov3} alt="Logo" preview={false} height={"150px"} />;
}
