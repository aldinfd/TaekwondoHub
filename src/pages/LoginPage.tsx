import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import z from "zod"

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>()

    const users = [
        { email: "aldi@gmail.com", password: "alditayo" },
        { email: "budi@gmail.com", password: "budi123" },
        { email: "siti@gmail.com", password: "siti456" },
    ]

    //validasi
    const loginFormSchema = z.object({
        email: z.string().nonempty("Email Tidak Boleh Kosong").min(5, "Email terlalu pendek").max(50, "Email terlalu panjang"), //agar field tidak kosong
        password: z.string().nonempty("Password Tidak Boleh Kosong")
    }).superRefine((arg, ctx) => { //cek email dan password
        const foundUser = users.find(user => user.email === arg.email)
        console.log(foundUser?.email, foundUser?.password)
        if (!foundUser?.email) {
            ctx.addIssue({ //memberi tau zod kalau ada yang error
                code: "custom",
                path: ["email"],
                message: "Email Anda Salah"
            })
        } else if (foundUser?.password !== arg.password) {
            ctx.addIssue({
                code: "custom",
                path: ["password"],
                message: "Password Anda Salah"
            })
        }
    })

    type LoginFormSchema = z.infer<typeof loginFormSchema>

    const form = useForm({
        resolver: zodResolver(loginFormSchema)
    })

    const handleLoginUser = (values: LoginFormSchema) => {
        alert("Form submitted")
        console.log(values)
    }

    return (
        <div className="mt-40">
            <h1>SISTEM MANAJAMEN CLUB TAEKWONDO</h1>
            <img src="#" alt="logoTaekwondo" />
            <form onSubmit={form.handleSubmit(handleLoginUser)} className="flex flex-col">
                <label htmlFor="#" className="flex flex-col">
                    Email
                    <input type="email" {...form.register("email")} className="border w-1/2 text-sm py-1 px-2" placeholder="Masukan Email" />
                    <span className="text-red-500 text-xs">{form.formState.errors.email?.message}</span>
                </label>
                <label htmlFor="#" className="flex flex-col">
                    Password
                    <div>
                        <input type={showPassword ? "text" : "password"} {...form.register("password")} className="border w-1/2 text-sm py-1 px-2 mr-2" placeholder="Masukan Password" />
                        <input onClick={() => setShowPassword(!showPassword)} type="checkbox" />
                    </div>
                    <span className="text-red-500 text-xs">{form.formState.errors.password?.message}</span>
                </label>
                <Link to="/reset-password" className="text-xs text-blue-500">Lupa Password</Link>
                <button className="bg-gray-500 text-white py-1 px-4 w-1/2">Login</button>
                <label htmlFor="#">
                    <input type="checkbox" />
                    Ingatkan saya
                </label>
                <label htmlFor="#" className="mt-10">
                    Masuk sebagai pelatih/manager
                    <button className="bg-gray-500 text-white py-1 px-4 w-1/2">Masuk Sebagai Pelatih</button>
                </label>
            </form>
        </div>
    )
}

export default LoginPage
