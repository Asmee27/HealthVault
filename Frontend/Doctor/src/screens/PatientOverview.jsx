import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";

import ReportItem from "../components/ReportItem";

export default function PatientOverview() {
  const navigate = useNavigate();
  const { qrToken } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [patient, setPatient] = useState(null);
  const [reports, setReports] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [activeTab, setActiveTab] = useState("reports");
  console.log(patient);
  console.log("Prescriptions:", prescriptions);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/patient/qr/${qrToken}`)
      .then(async (res) => {
        const patientData = res.data;

        setPatient(patientData);

        try {
          const presResponse = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/prescriptions/${patientData.id}`,
          );

          setPrescriptions(presResponse.data);
        } catch (err) {
          console.error("Error fetching prescriptions:", err);
        }

        try {
          const reportResponse = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/reports/${patientData.id}`,
          );

          setReports(reportResponse.data);
        } catch (err) {
          console.error("Error fetching reports:", err);
        }
      })
      .catch((err) => {
        console.error("Error fetching patient:", err);
      });
  }, [qrToken]);
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  if (!patient) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  const filteredReports = reports.filter((report) => {
    const search = searchTerm.toLowerCase();

    return (
      report.reportType.toLowerCase().includes(search) ||
      report.fileName.toLowerCase().includes(search) ||
      (report.notes && report.notes.toLowerCase().includes(search))
    );
  });

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-md shadow-sm shadow-teal-900/5 flex items-center justify-between px-6 py-4 h-16">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/scan-patient-id")}
            className="material-symbols-outlined text-teal-700 hover:bg-slate-200/50 transition-colors p-2 rounded-full"
          >
            arrow_back
          </button>
          <h1 className="font-headline font-bold text-slate-900 text-xl tracking-tight">
            {patient.fullName}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-slate-500 hover:bg-slate-200/50 p-2 rounded-full cursor-pointer">
            search
          </span>
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden border border-teal-200">
            <img
              alt="Doctor Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAApMTqyjrGaZ8alnQSo46iko_gqlNnx6pcjdXF3_qH13XX63eMclHBDKoElB5ew1EM7Pd4Vu82NE2BqdLBjdIXMBjabxXv3JUFNimHCNqFfU47z_CmGHuyWXu9RROlCfCd_Jb4saFdQM5n-gO7AC4FsauZhuV6lHXYTSCQn_PLh4W8zCWfhdLiLSkmkz1vfqsd0lyFGcrNhr82R8YCF0b1TndkT7Y4l7CDycMZNsHr6xmJ-S58JBjLk9Nakk7MPPAo8cDTSXijbq8"
            />
          </div>
        </div>
      </header>

      <Sidebar activePatient={patient} />

      <main className="lg:ml-72 pt-20 px-4 md:px-8 pb-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Patient Info Section */}
          <section className="relative bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/15 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-fixed-dim/20 rounded-xl">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      person
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-headline font-extrabold text-on-surface">
                      {patient.fullName}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                      Health ID:{" "}
                      <span className="text-on-surface-variant">
                        {patient.id}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-error-container/30 text-on-error-container rounded-full text-xs font-bold flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      bloodtype
                    </span>
                    Blood Group: {patient.bloodGroup}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:flex md:gap-8">
                <div className="text-center md:text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Age
                  </p>
                  <p className="text-lg font-headline font-bold text-on-surface">
                    {calculateAge(patient.dateOfBirth)}
                  </p>
                </div>
                <div className="text-center md:text-left border-l border-outline-variant/20 pl-4 md:pl-8"></div>
              </div>
            </div>
          </section>

          {/* Reports Section */}
          <section className="space-y-6">
            <div className="flex items-center border-b border-outline-variant/20">
              <button
                onClick={() => setActiveTab("reports")}
                className={`px-8 py-4 text-sm font-bold ${
                  activeTab === "reports"
                    ? "text-primary border-b-2 border-primary"
                    : "text-slate-500"
                }`}
              >
                Reports ({reports.length})
              </button>

              <button
                onClick={() => setActiveTab("prescriptions")}
                className={`px-8 py-4 text-sm font-bold ${
                  activeTab === "prescriptions"
                    ? "text-primary border-b-2 border-primary"
                    : "text-slate-500"
                }`}
              >
                Prescriptions ({prescriptions.length})
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96 group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search medical reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-surface-container-highest/50 border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-slate-400"
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0"></div>
            </div>

            {activeTab === "reports" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white rounded-xl shadow p-5 border border-gray-200"
                  >
                    <h3 className="text-lg font-bold">{report.reportType}</h3>

                    <p className="text-sm text-gray-600 mt-2">
                      {report.fileName}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">{report.notes}</p>

                    <div className="mt-4 flex gap-2">
                      <a
                        href={report.filePath}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-teal-700 text-white rounded-lg"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="bg-white rounded-xl shadow p-5 border border-gray-200"
                  >
                    <h3 className="text-lg font-bold">
                      {prescription.diagnosis}
                    </h3>

                    <p className="mt-2">
                      <b>Medicines:</b> {prescription.medicines}
                    </p>

                    <p className="mt-2">
                      <b>Duration:</b> {prescription.duration}
                    </p>

                    <p className="mt-2">
                      <b>Frequency:</b> {prescription.frequency}
                    </p>

                    <p className="mt-3 text-sm text-gray-500">
                      Dr. {prescription.doctor?.fullName}
                    </p>

                    <p className="text-xs text-gray-400">
                      {new Date(prescription.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {filteredReports.length === 0 && (
              <div className="col-span-2 text-center text-gray-500 py-8">
                No reports found.
              </div>
            )}
            {activeTab === "reports" && (
              <div
                onClick={() => navigate(`/add-prescription/${qrToken}`)}
                className="border-2 border-dashed border-outline-variant/30 rounded-xl flex flex-col items-center justify-center p-6 bg-surface-container-low/50 group hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                  <span className="material-symbols-outlined">add</span>
                </div>

                <p className="text-sm font-bold">Add Prescription</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
