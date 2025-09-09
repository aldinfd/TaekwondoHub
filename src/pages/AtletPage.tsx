import { useState } from 'react'
import Profile from '../components/Profile'
import Absensi from '../components/Absensi'
import ProgramLatihan from '../components/ProgramLatihan'
import Iruan from '../components/Iruan'
import Ujian from '../components/Ujian'
import Kejuaraan from '../components/Kejuaraan'

const AtletPage = () => {
    const [activeMenu, setActiveMenu] = useState<string>()

    const sidebar = [
        { id: 1, nameSidebar: "Profile" },
        { id: 2, nameSidebar: "Absensi" },
        { id: 3, nameSidebar: "Program Latihan" },
        { id: 4, nameSidebar: "Iruan" },
        { id: 5, nameSidebar: "Ujian" },
        { id: 6, nameSidebar: "Kejuaraan" },
    ]
    // type stundetType = {
    //     id: number,
    //     nama: string,
    // }
    // const [foundStudent, setFoundStudent] = useState<stundetType[]>([])
    // const handleInput = (id: number) => {
    //     // setInputId(id)
    //     const foundUser = users.filter(user => user.id === id)
    //     setFoundStudent(foundUser)
    // }

    const foundUser = sidebar.find(user => user.nameSidebar === activeMenu)
    console.log(foundUser)

    return (
        <div>
            <div className='flex'>
                <div className='border-r h-screen w-60 border-black'>
                    <div className='flex flex-col'>
                        {sidebar.map((item) => (
                            <button key={item.id} onClick={() => setActiveMenu(item.nameSidebar)} className='bg-gray-400 mb-2 text-white'>{item.nameSidebar}</button>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center w-full'>
                    {
                        !foundUser ?
                            (
                                <div className='text-center text-sm'>
                                    <p>SELAMAT DATANG DI APLIKASI SISTEM MANAJEMEN CLUB TAEKWONDO</p>
                                </div>
                            ) : (
                                <div>
                                    {activeMenu === "Profile" && <Profile />}
                                    {activeMenu === "Absensi" && <Absensi />}
                                    {activeMenu === "Program Latihan" && <ProgramLatihan />}
                                    {activeMenu === "Iruan" && <Iruan />}
                                    {activeMenu === "Ujian" && <Ujian />}
                                    {activeMenu === "Kejuaraan" && <Kejuaraan />}
                                </div>
                            )

                    }
                </div>
            </div>
        </div>
    )
}

export default AtletPage
