import React, { useState, useEffect } from "react";
import { Form, Select, DatePicker, InputNumber } from "antd";
import ModalComponent from "../../components/ui/Modal";
import { Input } from "antd";
import { Button } from "antd";
import { Edit, Plus } from "lucide-react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createOffer, updateOffer } from "../../api/offers";
import { getAllProducts } from "../../api/products";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const { Option } = Select;

const AddOffer = ({ record = null, isUpdate = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: productsData } = useQuery({
    queryKey: ["products", 1, 1000],
    queryFn: () => getAllProducts(1, 1000),
  });

  const products = productsData?.data || [];

  useEffect(() => {
    if (isUpdate && record && isModalOpen) {
      form.setFieldsValue({
        title: record.title,
        description: record.description,
        discount: record.discount,
        startDate: dayjs(record.startDate),
        endDate: dayjs(record.endDate),
        products: record?.products?.map((product) => product._id) || [],
        priceTypes: record?.priceTypes || [],
      });
    }
  }, [isUpdate, record, isModalOpen, form]);

  const { mutateAsync: addOfferMutation, isLoading: isAddOfferLoading } =
    useMutation({
      mutationFn: (data) => createOffer(data),
      onSuccess: () => {
        setIsModalOpen(false);
        toast.success(t("toasts.offerAdded"));
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: ["offers"] });
      },
      onError: () => {
        toast.error(t("toasts.offerAddFailed"));
      },
    });

  const { mutateAsync: updateOfferMutation, isLoading: isUpdateOfferLoading } =
    useMutation({
      mutationFn: (data) => updateOffer(record._id, data),
      onSuccess: () => {
        setIsModalOpen(false);
        toast.success(t("toasts.offerUpdated"));
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: ["offers"] });
      },
      onError: () => {
        toast.error(t("toasts.offerUpdateFailed"));
      },
    });

  const handleSubmit = async (values) => {
    const formattedData = {
      ...values,
      startDate: values.startDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      endDate: values.endDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      priceTypes: values.priceTypes,
    };

    if (isUpdate) {
      await updateOfferMutation(formattedData);
    } else {
      await addOfferMutation(formattedData);
    }
  };

  const isLoading = isAddOfferLoading || isUpdateOfferLoading;
  const title = isUpdate ? t("buttons.updateOffer") : t("buttons.addOffer");
  const buttonText = isUpdate ? t("buttons.updateOffer") : t("buttons.addOffer");

  const customButton = isUpdate ? (
    <Edit
      className="cursor-pointer"
      size={20}
      onClick={() => setIsModalOpen(true)}
    />
  ) : (
    <Button
      type="primary"
      icon={<Plus />}
      onClick={() => setIsModalOpen(true)}
      loading={isLoading}
    >
      {buttonText}
    </Button>
  );

  return (
    <ModalComponent
      title={title}
      buttonText={buttonText}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      customButton={customButton}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input offer title" }]}
        >
          <Input placeholder="Enter offer title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, min: 20, message: "Please input at least 20 characters" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter offer description" />
        </Form.Item>

        <Form.Item
          label="Discount"
          name="discount"
          rules={[{ required: true, message: "Please input discount percentage" }]}
        >
          <InputNumber min={0} max={100} style={{ width: "100%" }} placeholder="Enter discount percentage" />
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: "Please select start date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{ required: true, message: "Please select end date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Products"
          name="products"
          rules={[{ required: true, message: "Please select at least one product" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select products for this offer"
            style={{ width: "100%" }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {products.map((product) => (
              <Option key={product._id} value={product._id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price Types"
          name="priceTypes"
          rules={[{ required: true, message: "Please select at least one price type" }]}
        >
          <Select mode="multiple" placeholder="Select price types" style={{ width: "100%" }}>
            <Option value="retailPrice">Retail Price</Option>
            <Option value="wholesalePrice">Wholesale Price</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </ModalComponent>
  );
};

export default AddOffer;
