import React, { useState, useEffect } from "react";
import { Form, InputNumber, Switch } from "antd";
import ModalComponent from "../../components/ui/Modal";
import ImageUpload from "../../components/ui/ImageUpload";
import { Button } from "antd";
import { Edit, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSlider, updateSlider } from "../../api/slider";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const AddSlider = ({ record = null, isUpdate = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  useEffect(() => {
    if (isUpdate && record && isModalOpen) {
      form.setFieldsValue({
        title: record.title,
        description: record.description,
        link: record.link,
        active: record.active,
        order: record.order,
      });
    }
  }, [isUpdate, record, isModalOpen, form]);

  const { mutateAsync: addSliderMutation, isLoading: isAddSliderLoading } =
    useMutation({
      mutationFn: (data) => createSlider(data),
      onSuccess: () => {
        setIsModalOpen(false);
        toast.success(t("toasts.sliderAdded"));
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: ["sliders"] });
      },
      onError: () => {
        toast.error(t("toasts.sliderAddFailed"));
      },
    });

  const {
    mutateAsync: updateSliderMutation,
    isLoading: isUpdateSliderLoading,
  } = useMutation({
    mutationFn: (data) => updateSlider(record._id, data),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success(t("toasts.sliderUpdated"));
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
    },
    onError: () => {
      toast.error(t("toasts.sliderUpdateFailed"));
    },
  });

  const handleSubmit = async (values) => {
    const imageFile = form.getFieldValue("image");
    const submitData = { ...values };

    if (imageFile && imageFile !== "existing-image") {
      submitData.image = imageFile;
    }

    if (isUpdate) {
      await updateSliderMutation(submitData);
    } else {
      await addSliderMutation(submitData);
    }
  };

  const isLoading = isAddSliderLoading || isUpdateSliderLoading;
  const title = isUpdate ? t("buttons.updateSlider") : t("buttons.addSlider");
  const buttonText = isUpdate ? t("buttons.updateSlider") : t("buttons.addSlider");

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
        {!isUpdate && (
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <ImageUpload
              form={form}
              fieldName="image"
              existingImage={record?.image}
              isUpdate={isUpdate}
              required={true}
              listType="text"
            />
          </Form.Item>
        )}

        <Form.Item
          label="Order"
          name="order"
          rules={[{ required: true, message: "Please input order number" }]}
        >
          <InputNumber
            min={1}
            style={{ width: "100%" }}
            placeholder="Enter order number"
          />
        </Form.Item>

        <Form.Item
          label="Active"
          name="active"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
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

export default AddSlider;
