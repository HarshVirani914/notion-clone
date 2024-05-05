"use client";
import { useCurrentUser } from "@/modules/hooks";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Input, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ShareDocumentProps {
  documentId: string; // New prop to share documentId
}

const ShareDocument: React.FC<ShareDocumentProps> = ({ documentId }) => {
  console.log("documentId : ", documentId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // TODO: provide proper user options
  const usersList: any[] = [];
  const { user } = useCurrentUser();

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log("search value : ", searchValue);
  };

  useEffect(() => {
    // TODO: Need to fix share document feature
  }, [dispatch, searchValue]);

  const handleUserSelect = async (senderUser: any) => {
    const senderUserId = user._id;
    const receiverUserId = senderUser._id;
    const shareDocumentId = documentId;
    console.log(senderUserId, receiverUserId, shareDocumentId);
    if (senderUserId !== receiverUserId) {
      try {
        // console.log("create  note try :", [...formdata.entries()]);
        const response = await axios.post(
          `http://localhost:3001/share-document/share/${senderUserId}`,
          { receiverUserId, shareDocumentId }
        );
        console.log("res : ", response);
        if (response.status == 201) {
          console.log("response.status  : ", response.status);
          await toast.success("Document sent Successfully");
        }
      } catch (error) {
        console.log("error : ", error);
      }
    } else {
      alert("you can't send doucment to self");
    }
    // console.log(senderUserId, receiverUserId, shareDocumentId)
  };
  return (
    <>
      <button onClick={showModal}>
        <IosShareIcon />
      </button>
      <Modal
        title="Share Document"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Search users..."
          value={searchValue}
          onChange={handleSearchChange}
        />
        {usersList.slice(0, 7).map((senderUser) => (
          <li
            key={senderUser._id}
            className="user-item flex items-center justify-between"
            onClick={() => handleUserSelect(senderUser)}
          >
            <span>{senderUser.username}</span>
          </li>
        ))}
      </Modal>
      <style jsx>{`
        .user-item {
          cursor: pointer;
          padding: 8px;

          margin-bottom: 8px;
        }

        .user-item:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </>
  );
};

export default ShareDocument;
