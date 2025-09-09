import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import z from "zod"
const ResetPasswordPage = () => {
    const [showPasswordBaru, setShowPasswordBaru] = useState<boolean>()
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>()

    const users = [
        { email: "aldi@gmail.com", password: "alditayo" },
        { email: "budi@gmail.com", password: "budi123" },
        { email: "siti@gmail.com", password: "siti456" },
    ]

    //hanya digunakan untuk validasi tidak untuk logika reset password
    const resetPasswordFormScema = z.object({
        email: z.string().nonempty("Masukan Email Anda"),
        passwordBaru: z.string().nonempty("Masukan Password Baru Anda"),
        passwordConfirm: z.string().nonempty("Masukan Confirm Password Anda")
    }).superRefine((arg, ctx) => {
        const foundUser = users.find(user => user.email === arg.email)
        if (!foundUser) {
            ctx.addIssue({
                code: "custom",
                path: ["email"],
                message: "Emal Anda Salah"
            })
        }
        if (arg.passwordBaru !== arg.passwordConfirm) {
            ctx.addIssue({
                code: "custom",
                path: ["passwordConfirm"],
                message: "Password dan konfirmasi password harus sama"
            })
        }
    })

    type ResetPasswordFormScema = z.infer<typeof resetPasswordFormScema>

    const form = useForm({
        resolver: zodResolver(resetPasswordFormScema)
    })

    const handleResetPassword = (values: ResetPasswordFormScema) => {
        const foundUser = users.find(user => user.email === values.email)
        if (foundUser) {
            console.log(`Password lama : ${foundUser.password}`)
            foundUser.password = values.passwordBaru
            console.log(`Password baru : ${foundUser.password}`)
        }
        // console.log(foundUser?.password)
        // console.log(values.passwordBaru)
    }

    return (
        <div className="mt-40">
            <h1 className="font-bold text-xl mb-4">Halaman RESET PASSWORD</h1>
            <h1>SISTEM MANAJAMEN CLUB TAEKWONDO</h1>
            <img src="#" alt="logoTaekwondo" />
            <form className="flex flex-col" onSubmit={form.handleSubmit(handleResetPassword)}>
                <label htmlFor="#" className="flex flex-col">
                    Email
                    <input type="email" {...form.register("email")} className="border w-1/2 text-sm py-1 px-2" placeholder="Masukan Email" />
                    <span className="text-red-500 text-xs">{form.formState.errors.email?.message}</span>
                </label>
                <label htmlFor="#" className="flex flex-col">
                    Password Baru
                    <div>
                        <input type={showPasswordBaru ? "text" : "password"}  {...form.register("passwordBaru")} className="border w-1/2 text-sm py-1 px-2 mr-2" placeholder="Masukan Password Baru" />
                        <input onClick={() => setShowPasswordBaru(!showPasswordBaru)} type="checkbox" />
                    </div>
                    <span className="text-red-500 text-xs">{form.formState.errors.passwordBaru?.message}</span>
                </label>
                <label htmlFor="#" className="flex flex-col">
                    Confirm Password
                    <div>
                        <input type={showPasswordConfirm ? "text" : "password"} {...form.register("passwordConfirm")} className="border w-1/2 text-sm py-1 px-2 mr-2" placeholder="Masukan Password Baru" />
                        <input onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} type="checkbox" />
                    </div>
                    <span className="text-red-500 text-xs">{form.formState.errors.passwordConfirm?.message}</span>
                </label>
                <button className="bg-gray-500 text-white py-1 px-4 w-1/2">Reset</button>
                <button className="bg-gray-500 text-white py-1 px-4 w-1/3 mt-2"><Link to="/">Kembali</Link></button>
            </form>
        </div>
    )
}

export default ResetPasswordPage
