import { useEffect, useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import ClassLeaderboardCard from "../components/ClassLeaderboardCard"

function LeaderboardClasses(){

const [classes,setClasses] = useState([])

useEffect(()=>{

fetchClasses()

},[])

const fetchClasses = async()=>{

const res = await API.get("/classes")
// const res = await API.get("/classes_with_teacher")
setClasses(res.data)

}

return(

<AdminLayout>

<h1 className="text-2xl font-bold mb-6">
Leaderboard
</h1>

<div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">

{classes.map(c=>(
<ClassLeaderboardCard key={c.id} data={c}/>
))}

</div>

</AdminLayout>

)

}

export default LeaderboardClasses