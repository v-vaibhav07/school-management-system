import { useEffect, useState } from "react"
import API from "../services/api"
import { Link } from "react-router-dom"

function TeacherDashboard() {

    const [classes, setClasses] = useState([])

    const fetchClasses = async () => {

        try {

            const res = await API.get("/classes")
            setClasses(res.data)

        } catch (error) {

            console.log("Error loading classes", error)

        }

    }

    useEffect(() => {

        fetchClasses()

    }, [])

    return (

        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                Teacher Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">

                {classes.map((cls) => (

                    <div
                        key={cls.id}
                        className="bg-white shadow rounded p-4"
                    >

                        <h2 className="text-xl font-bold">
                            Class {cls.class_name} {cls.section}
                        </h2>

                        <p className="text-gray-500 mb-4">
                            Academic Year: {cls.academic_year}
                        </p>

                        <div className="flex flex-col gap-2">

                            <Link to={`/teacher/class/${cls.id}/attendance`}>
                                Mark Attendance
                            </Link>

                            <Link to={`/teacher/class/${cls.id}/marks`}>
                                Upload Marks
                            </Link>

                            <Link to={`/teacher/class/${cls.id}/chat`}>
                                Class Chat
                            </Link>

                            <Link to={`/teacher/class/${cls.id}/homework`}>
                                Post Homework
                            </Link>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    )

}

export default TeacherDashboard