"use client";
import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { signIn, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [clientReady, setClientReady] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setClientReady(true);
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        // Handle sign-in error
        Swal.fire({
          title: "Failed!",
          text: "Please enter correct Email & Password!",
          icon: "error",
        });
        // console.error(response.error);
      } else {
        // Redirect to home page
        setSubmitting(false);
        Swal.fire({
          title: "Success!",
          text: "Logged In Successfully!",
          icon: "success",
        }).then(() => {
          router.push("/dashboard");
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-[300px]">
      <img src="/logo.png" alt="" />
      <Form
        form={form}
        name="armaf-central-hub"
        layout="vertical"
        size="large"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter the admin email!",
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter the admin password!" },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="default"
              htmlType="submit"
              className="bg-gray-900 text-white w-full"
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
              loading={submitting}
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default SigninForm;
