import React, { useState, useEffect } from "react";
import { Form, InputNumber, Switch } from "antd";
import ModalComponent from "../../components/ui/Modal";
import ImageUpload from "../../components/ui/ImageUpload";
import { Input } from "antd";
import { Button } from "antd";
import { Edit, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSlider, updateSlider } from "../../api/slider";
import toast from "react-hot-toast";

const AddSlider = ({ record = null, isUpdate = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Set form values when updating
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
        toast.success("Slider added successfully");
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: ["sliders"] });
      },
      onError: (error) => {
        toast.error("Failed to add slider");
        console.log(error);
      },
    });

  const {
    mutateAsync: updateSliderMutation,
    isLoading: isUpdateSliderLoading,
  } = useMutation({
    mutationFn: (data) => updateSlider(record._id, data),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success("Slider updated successfully");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
    },
    onError: (error) => {
      toast.error("Failed to update slider");
      console.log(error);
    },
  });

  const handleSubmit = async (values) => {
    // Get the file from form
    const imageFile = form.getFieldValue("image");

    // Prepare data with file
    const submitData = {
      ...values,
    };

    // Only include image if it's a new file (not the placeholder)
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
  const title = isUpdate ? "Update Slider" : "Add Slider";
  const buttonText = isUpdate ? "Update Slider" : "Add Slider";
  const submitButtonText = isUpdate ? "Update Slider" : "Add Slider";

  // Custom button for update mode
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
    <>
      <ModalComponent
        title={title}
        buttonText={buttonText}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customButton={customButton}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input slider title" }]}
          >
            <Input placeholder="Enter slider title" />
          </Form.Item> */}

          {/* <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input slider description" },
            ]}
          >
            <Input.TextArea rows={3} placeholder="Enter slider description" />
          </Form.Item> */}

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

          {/* <Form.Item
            label="Link"
            name="link"
            rules={[{ required: true, message: "Please input link" }]}
          >
            <Input placeholder="Enter link URL" />
          </Form.Item> */}

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
              {submitButtonText}
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </>
  );
};

export default AddSlider;
