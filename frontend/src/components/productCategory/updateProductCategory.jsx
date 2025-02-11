import { Alert, Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  loadAllProductCategory,
  updateProductCategory,
} from "../../redux/rtk/features/productCategory/productCategorySlice";

function UpdateProductCategory({ category, modal, onClose }) {
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [initValues, setInitValues] = useState({
    name: category.name,
  });
  const [loader, setLoader] = useState();
  const onFinish = async (values) => {
    try {
      const resp = await dispatch(
        updateProductCategory({ id: modal ? category?.id : id, values })
      );
      if (resp?.payload?.message === "success" && modal) {
        dispatch(
          loadAllProductCategory({
            page: 1,
            count: 10,
            status: "true",
          })
        );
        onClose();
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <>
      <div className="text-center">
        <div className="">
          {success && (
            <div>
              <Alert
                message={`Category details updated successfully`}
                type="success"
                closable={true}
                showIcon
              />
            </div>
          )}

          <Form
            initialValues={{
              ...initValues,
            }}
            form={form}
            className="m-4"
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              style={{ marginBottom: "10px" }}
              fields={[{ name: "Name" }]}
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input Category name!",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item style={{ marginBottom: "10px" }}>
              <Button
                onClick={() => setLoader(true)}
                block
                type="primary"
                htmlType="submit"
                shape="round"
                loading={loader}>
                Update Now
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default UpdateProductCategory;
