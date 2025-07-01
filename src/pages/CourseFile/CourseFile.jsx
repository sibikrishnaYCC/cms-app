import { useNavigate } from "react-router-dom"

export default function CourseFile() {

    const navigate = useNavigate()

    return (
        <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center  gap-3 ">
                <h1>This is CourseFile Page</h1>

                <button onClick={() => navigate('/')} className="border p-4 rounded hover:rounded-lg cursor-pointer hover:bg-black hover:text-white hover:border-black">Back To Home</button>
        
        </div>
    )
}