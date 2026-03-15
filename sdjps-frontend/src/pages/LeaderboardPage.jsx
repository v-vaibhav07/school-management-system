import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import LeaderboardTable from "../components/LeaderboardTable"

function LeaderboardPage(){

const {classId,examId} = useParams()

const [students,setStudents] = useState([])

useEffect(()=>{

fetchLeaderboard()

},[])

const fetchLeaderboard = async()=>{

const res = await API.get(`/leaderboard?classId=${classId}&examId=${examId}`)

setStudents(res.data)

}

return(

<AdminLayout>

<h1 className="text-2xl font-bold mb-6">
Leaderboard
</h1>

<LeaderboardTable students={students}/>

</AdminLayout>

)

}

export default LeaderboardPage