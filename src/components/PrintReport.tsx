import React from 'react';
import { Text } from 'react-native';
import ButtonCustom from 'src/components/ButtonCustom';
import { ReportResData } from 'src/interfaces/report.dto';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { getStatus } from 'src/utils/commonUtils';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PrintReportProps {
  report: ReportResData[];
}

const PrintReport: React.FC<PrintReportProps> = ({ report }) => {
  const getContent = () => {
    const reportByDate: any = {};

    report.forEach((data) => {
      if (!reportByDate[data.date]) reportByDate[data.date] = [];
      reportByDate[data.date].push(data);
    });

    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h2 { color: #020617; text-align: center; }
            h3 { color: #1e293b; margin-top: 50px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
            .center { text-align: center; }
          </style>
        </head>
        <body>
          <h1>Laporan Kehadiran OnSite</h1>
          <h2>PT Nuansa Cerah Informasi</h2>
          ${Object.keys(reportByDate)
            .map(
              (date) => `
              <h3>${date}</h3>
              <table>
                <tr class="center">
                  <th>No</th>
                  <th>NIK</th>
                  <th>Nama</th>
                  <th colspan="2">Jam Kerja</th>
                  <th>Status</th>
                  <th>Catatan</th>
                </tr>
                ${reportByDate[date]
                  .map((data: ReportResData, index: number) => {
                    const workingHours =
                      data.working_hours ?? 'Tidak check out';

                    return `
                      <tr>
                        <td rowspan="2" class="center">${index + 1}</td>
                        <td rowspan="2">${data.nik}</td>
                        <td rowspan="2">${data.name}</td>
                        <td class="center">${data.checkInTime}</td>
                        <td class="center">${data.checkOutTime}</td>
                        <td rowspan="2" class="center">${data.late ? 'Terlambat' : getStatus(data.status)}</td>
                        <td rowspan="2">${data.notes?.replace('\n', '<br>')}</td>
                      </tr>
                      <tr>
                        <td colspan="2" class="center">
                          ${['absent', 'permit'].includes(data.status) ? '-' : workingHours}
                        </td>
                      </tr>
                    `;
                  })
                  .join('')}
              </table>
          `,
            )
            .join('')}
        </body>
      </html>
    `;
  };

  const handlePrintPdf = async () => {
    try {
      // Cetak html content
      await Print.printAsync({ html: getContent() });
    } catch (error) {
      console.error('Gagal membuat PDF:', error);
    }
  };

  const handleSharePdf = async () => {
    try {
      // Buat file PDF dari HTML
      const { uri } = await Print.printToFileAsync({ html: getContent() });

      // Bagikan atau simpan PDF
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      console.log('PDF berhasil dibuat:', uri);

      // Hapus file setelah selesai
      await FileSystem.deleteAsync(uri, { idempotent: true });
      console.log('PDF berhasil dihapus.');
    } catch (error) {
      console.error('Gagal membuat PDF:', error);
    }
  };

  return (
    <View className="w-full flex flex-row my-2">
      <View className="w-[95] mr-3 ">
        <TouchableOpacity
          onPress={handlePrintPdf}
          className="w-full bg-blue-500 rounded-lg p-2 items-center mr-3 flex-row"
        >
          <Ionicons name={'print-outline'} size={24} color="black" />
          <Text className="ml-2 font-bold">Cetak</Text>
        </TouchableOpacity>
      </View>
      <View className="w-[150]">
        <TouchableOpacity
          onPress={handleSharePdf}
          className="w-full bg-accentYellow rounded-lg p-2 items-center mr-3 flex-row"
        >
          <Ionicons name={'share-social-outline'} size={24} color="black" />
          <Text className="ml-2 font-bold">Bagikan file pdf</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrintReport;
