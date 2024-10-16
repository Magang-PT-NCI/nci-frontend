// PermitPage.tsx
import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import DropdownCustom from "../../components/DropdownCustom";
import ButtonCustom from "../../components/ButtonCustom";
import CheckBox from "expo-checkbox";
import DateItem from "../../components/DateItem";
import customConfirmDialogue from "../../utils/customConfirmDialogue";
import FileInput from "../../components/FileInput";
import { DocumentResult } from "expo-document-picker";
import { getCookie } from "../../utils/getCookie";
import { useNavigation } from "@react-navigation/native";

import { Endpoint } from "../../enums/api-enum";
import ApiRequest from "../../utils/ApiRequest";
import {PermitResData} from "../../interfaces/permit.dto";

type PermitPageProps = {
  NIK: string;
};

const PermitPage: React.FC<PermitPageProps> = ({ NIK }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<DocumentResult | null>(null);
  const [fileName, setFileName] = useState("");

  const navigation = useNavigation();

  const data_hari_izin = [
    { label: "1 Hari", value: "1" },
    { label: "2 Hari", value: "2" },
    { label: "3 Hari", value: "3" },
  ];
  const data_alasan_izin = [
    { label: "Sakit", value: "sick" },
    { label: "Keperluan Mendadak", value: "urgent_reason" },
    { label: "Lainnya", value: "other" },
  ];

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    console.log("Tanggal terpilih:", date);
  };

  const handleDaysChange = (value: string) => {
    setSelectedDays(value);
    console.log("Jumlah Hari Izin:", value);
  };

  const handleReasonChange = (value: string) => {
    setSelectedReason(value);
    console.log("Alasan Izin:", value);
  };

  const handleFileSelect = (file: DocumentResult) => {
    setSelectedFile(file);
    setFileName(file.assets[0].name);
    console.log("File selected:", JSON.stringify(file, null, 2));
    console.log(file.assets[0].name);
  };

  const isFormComplete =
    selectedDate !== null &&
    selectedDays !== null &&
    selectedReason !== null &&
    selectedFile !== null;

  const handleSubmit = () => {
    customConfirmDialogue(
      "Konfirmasi Pengajuan Izin",
      "Apakah Anda yakin akan mengirim pengajuan?",
      handleCancelSubmit,
      handleConfirmSubmit
    );
  };

  const handleCancelSubmit = () => {
    console.log("submit dibatalkan");
  };

  const handleConfirmSubmit = async () => {
    const token = await getCookie("token");

    const formData = new FormData();

    if (token) {
      formData.append("nik", NIK);
      formData.append("reason", selectedReason);
      formData.append("start_date", selectedDate);
      formData.append("duration", selectedDays);
      formData.append("permission_letter", {
        uri: selectedFile,
        name: "letter",
        type: selectedFile.mimeType || "application/pdf",
      });

      await new ApiRequest<FormData, PermitResData>(Endpoint.Permit)
        .setToken(token)
        .setContentType("multipart/form-data")
        .setReqBody(formData)
        .post(
          (data) => console.log(data),
          (error) => console.log(JSON.stringify(error, null, 2))
        );
    } else {
      navigation.replace("LoginPage");
    }
  };

  return (
    <View className="w-full flex flex-col p-4">
      <DateItem onDateChange={handleDateChange} type="outer" />

      <DropdownCustom
        placeholder="Jumlah Hari Izin"
        marginT={20}
        data={data_hari_izin}
        onValueChange={handleDaysChange}
      />

      <DropdownCustom
        placeholder="Alasan Izin"
        marginT={20}
        data={data_alasan_izin}
        onValueChange={handleReasonChange}
      />

      <FileInput onFileSelect={handleFileSelect} />

      <View className="w-full flex flex-row items-center mt-8 ml-4">
        <CheckBox
          className="w-5 h-5"
          value={toggleCheckBox}
          onValueChange={setToggleCheckBox}
          color={isFormComplete ? "#5cb874" : "gray"}
          disabled={!isFormComplete}
        />
        <Text className="text-textDefault ml-4">
          Pastikan data sudah benar. Anda tidak dapat MENGUBAH atau MEMBATALKAN
          pengajuan.
        </Text>
      </View>

      <ButtonCustom
        title="Kirim"
        callbackEvt={handleSubmit}
        mt={20}
        disabled={!toggleCheckBox}
      />
    </View>
  );
};

export default PermitPage;
