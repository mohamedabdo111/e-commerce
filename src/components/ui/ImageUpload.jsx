import React, { useState, useEffect } from "react";
import { Upload, message } from "antd";
import { Upload as UploadIcon } from "lucide-react";

const ImageUpload = ({
  form,
  fieldName = "image",
  existingImage = null,
  isUpdate = false,
  required = true,
  maxSize = 2, // MB
  listType = "picture-card",
  showUploadList = true,
  onFileChange = null,
}) => {
  const [fileList, setFileList] = useState([]);

  // Set file list for existing image when updating
  useEffect(() => {
    if (isUpdate && existingImage) {
      setFileList([
        {
          uid: "-1",
          name: "existing-image.jpg",
          status: "done",
          url: existingImage,
        },
      ]);
      // Set a placeholder value in the form to satisfy validation
      form.setFieldValue(fieldName, "existing-image");
    } else {
      setFileList([]);
      form.setFieldValue(fieldName, null);
    }
  }, [isUpdate, existingImage, form, fieldName]);

  // Upload configuration
  const uploadProps = {
    name: fieldName,
    listType: listType,
    fileList: fileList,
    showUploadList: showUploadList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return false;
      }
      const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
      if (!isLtMaxSize) {
        message.error(`Image must be smaller than ${maxSize}MB!`);
        return false;
      }
      return false; // Prevent auto upload
    },
    onChange: (info) => {
      setFileList(info.fileList);

      // Set the file in form
      if (info.fileList.length > 0) {
        const file = info.fileList[0].originFileObj;
        form.setFieldValue(fieldName, file);

        // Call custom onChange if provided
        if (onFileChange) {
          onFileChange(file);
        }
      } else {
        form.setFieldValue(fieldName, null);

        // Call custom onChange if provided
        if (onFileChange) {
          onFileChange(null);
        }
      }
    },
    onRemove: () => {
      setFileList([]);
      form.setFieldValue(fieldName, null);

      // Call custom onChange if provided
      if (onFileChange) {
        onFileChange(null);
      }
    },
  };

  // Custom upload button for picture-card type
  const uploadButton =
    listType === "picture-card" ? (
      <div>
        <UploadIcon size={20} />
        <div style={{ marginTop: 8 }}>Upload Image</div>
      </div>
    ) : (
      <button type="button" style={{ border: 0, background: "none" }}>
        <UploadIcon size={16} />
        <span style={{ marginLeft: 8 }}>Upload</span>
      </button>
    );

  return (
    <Upload {...uploadProps}>
      {fileList.length >= 1 ? null : uploadButton}
    </Upload>
  );
};

export default ImageUpload;
