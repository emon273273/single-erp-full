import {
  loadApiConfig,  updateApiConfig,
} from "@/redux/rtk/features/apiConfigAppsettings/apiConfigAppSettingsSlice";
import { Button, Card, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ApiKeyForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { apiConfig, loading } = useSelector((state) => state.apiConfig);

  const [apiKey, setApiKey] = useState("");

  // Load the API key when the component mounts
  useEffect(() => {
    dispatch(loadApiConfig());
  }, [dispatch]);

  // Update the form field when the API config is loaded
  useEffect(() => {
    if (apiConfig) {
      setApiKey(apiConfig.apiKey || "");
    }
  }, [apiConfig]);

  const handleSave = () => {
    const payload = { apiKey };
    dispatch(updateApiConfig(payload));
    form.resetFields(); // Optionally reset the form after saving
  };

  return (
    <Card title="API Key Configuration" className="max-w-md mx-auto mt-10">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          apiKey,
        }}
      >
        <Form.Item
          label="API Key"
          name="apiKey"
          rules={[{ required: true, message: "Please input your API Key!" }]}
        >
          <Input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter API Key"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save API Key
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ApiKeyForm;
