import { useNavigate } from "react-router-dom"

export default function TimeTable() {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-3">
                <h1>This is TimeTable Page</h1>

                <button onClick={() => navigate('/')} className="border p-4 rounded hover:rounded-lg cursor-pointer hover:bg-black hover:text-white">Back To Home</button>
        
        </div>
    )
}