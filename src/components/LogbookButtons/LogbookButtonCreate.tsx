import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import ButtonCustom from "../ButtonCustom";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import DropdownCustom from "../DropdownCustom";
import ApiRequest from "../../utils/ApiRequest";
import { Endpoint } from "../../enums/api-enum";
import { getCookie } from "../../utils/getCookie";
import {LogbookReqBody, LogbookResData} from "../../interfaces/logbook.dto";

interface LogbookButtonCreateProps {
  attendanceID: number;
  onSubmit: (logbook: LogbookResData) => void;
}

const LogbookButtonCreate: React.FC<LogbookButtonCreateProps> = ({
  attendanceID,
  onSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedTimeButton, setSelectedTimeButton] = useState<
    "start" | "end" | null
  >(null);
  const [startTime, setStartTime] = useState<string>("Jam Mulai");
  const [endTime, setEndTime] = useState<string>("Jam Selesai");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [activityDescription, setActivityDescription] = useState<string>("");

  const showDatePicker = (button: "start" | "end") => {
    setSelectedTimeButton(button);
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    if (selectedTimeButton === "start") {
      setStartTime(formattedTime);
    } else if (selectedTimeButton === "end") {
      setEndTime(formattedTime);
    }

    hideDatePicker();
  };

  const logbook_status = [
    { label: "done", value: "done" },
    { label: "progress", value: "progress" },
  ];

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleSubmitLogbook = async () => {
    if (isFormValid()) {
      console.log("Start Time:", startTime);
      console.log("End Time:", endTime);
      console.log("Status:", selectedStatus);
      console.log("Activity Description:", activityDescription);

      const token = await getCookie("token");
      if (token) {
        const response = await new ApiRequest<LogbookReqBody, LogbookResData>(
          Endpoint.Logbook
        )
          .setToken(token)
          .setReqBody({
            attendance_id: attendanceID,
            start_time: startTime,
            end_time: endTime,
            status: selectedStatus,
            description: activityDescription,
          })
          .post();

        onSubmit(response.getData());
        setStartTime("Jam Mulai");
        setEndTime("Jam Selesai");
        setActivityDescription("");
        setIsModalOpen(false);
      }
    }
  };

  const isFormValid = () => {
    return (
      startTime !== "Jam Mulai" &&
      endTime !== "Jam Selesai" &&
      selectedStatus !== null &&
      activityDescription.trim() !== ""
    );
  };

  return (
    <View className="w-1/4 mt-3">
      <View className="w-full">
        <ButtonCustom
          title="Create+"
          callbackEvt={() => setIsModalOpen(true)}
        />
      </View>

      <Modal
        visible={isModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalOpen(false)}>
          <View className="h-full p-3 pt-10 bg-black/40">
            <TouchableWithoutFeedback>
              <View
                className="w-full border rounded-lg p-5"
                style={{ borderColor: "#5cb874", backgroundColor: "#0f172a" }}
              >
                <View className="w-full flex-row justify-between">
                  <Text className="text-textDefault text-lg">
                    Buat Aktivitas
                  </Text>
                  <TouchableOpacity onPress={() => setIsModalOpen(false)}>
                    <Ionicons name="close" size={37} color="#94a3b8" />
                  </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center mt-4">
                  <View className="w-28 mr-2">
                    <ButtonCustom
                      title={startTime}
                      callbackEvt={() => showDatePicker("start")}
                    />
                  </View>
                  <View className="w-28">
                    <ButtonCustom
                      title={endTime}
                      callbackEvt={() => showDatePicker("end")}
                    />
                  </View>
                </View>
                <DateTimePicker
                  isVisible={isDatePickerVisible}
                  mode="time"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <DropdownCustom
                  data={logbook_status}
                  onValueChange={handleStatusChange}
                  placeholder="Pilih status aktivitas"
                  marginT={16}
                />
                <TextInput
                  multiline={true}
                  numberOfLines={3}
                  className="border border-accentYellow rounded-lg mt-7 px-3 text-textDefault"
                  onChangeText={(text) => setActivityDescription(text)}
                  value={activityDescription}
                />

                <ButtonCustom
                  title="Kirim"
                  callbackEvt={handleSubmitLogbook}
                  mt={20}
                  disabled={!isFormValid()}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default LogbookButtonCreate;
