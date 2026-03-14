import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

import jsPDF from "jspdf"
import "jspdf-autotable"

function ReportCard() {

  const { student_id } = useParams()

  const [report, setReport] = useState(null)

  const fetchReport = async () => {

    try {

      const res = await API.get(`/report-card/${student_id}`)
      setReport(res.data)

    } catch (error) {

      console.log("Error fetching report card", error)

    }

  }

  useEffect(() => {

    fetchReport()

  }, [])

  const downloadPDF = () => {

    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("SDJPS Modern School", 70, 15)

    doc.setFontSize(14)
    doc.text("Student Report Card", 80, 25)

    doc.setFontSize(12)

    doc.text(`Student: ${report.student_name}`, 14, 40)
    doc.text(`Class: ${report.class}`, 14, 48)
    doc.text(`Attendance: ${report.attendance}%`, 14, 56)
    doc.text(`Rank: ${report.rank}`, 14, 64)

    const tableData = report.subjects.map(s => [
      s.subject,
      s.marks
    ])

    doc.autoTable({
      startY: 75,
      head: [["Subject", "Marks"]],
      body: tableData
    })

    doc.save(`${report.student_name}_report_card.pdf`)

  }

  if (!report) return <p>Loading...</p>

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Report Card
      </h1>

      <div className="bg-white shadow rounded p-6">

        <p className="mb-2">
          <strong>Student:</strong> {report.student_name}
        </p>

        <p className="mb-2">
          <strong>Class:</strong> {report.class}
        </p>

        <p className="mb-2">
          <strong>Attendance:</strong> {report.attendance}%
        </p>

        <p className="mb-4">
          <strong>Rank:</strong> {report.rank}
        </p>

        <table className="w-full border">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-2">Subject</th>
              <th className="p-2">Marks</th>
            </tr>

          </thead>

          <tbody>

            {report.subjects.map((s, index) => (

              <tr key={index} className="border-b">

                <td className="p-2">{s.subject}</td>
                <td className="p-2">{s.marks}</td>

              </tr>

            ))}

          </tbody>

        </table>

        <button
          onClick={downloadPDF}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>

      </div>

    </div>

  )

}

export default ReportCard