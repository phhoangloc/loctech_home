import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import parse from 'html-react-parser';
import { Input } from './input/input';
import Link from 'next/link';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ApiLogin } from '@/api/client';
import DeleteIcon from '@mui/icons-material/Delete';
import store from '@/redux/store';
import { setNoti } from '@/redux/reducer/NotificationReduce';
import { setLoginReFresh } from '@/redux/reducer/LoginRefreshReduce';
type CardType = {
    archive: string,
    category: string,
    slug: string,
    name: string,
    content: string,
    author: string,
    createAt: Date
}

export const CardArticleTop = ({ archive, category, name, slug, content, author, createAt }: CardType) => {
    const toPage = useRouter()
    return (
        <div className="w-full bg-white rounded-md p-2 shadow-md cursor-pointer" onClick={() => toPage.push("/" + archive + "/" + slug)}>
            <div className="text-sm">{moment(createAt).format("YYYY/MM/DD")}</div>
            {category ? <div className='leading-4 text-sm  font-bold uppercase bg-three text-white w-max rounded-md py-1 px-2 '>{category}</div> : null}
            <div className="font-serif text-four font-bold text-2xl uppercase">{name}</div>
            <div className="opacity-50 text-xm leading-5">{author}</div>
            <div className="h-4"></div>
            <div className="h-21 line-clamp-4 text-justify text-sm">{parse(content.split("<p>")[1])}</div>
        </div>)
}
export const CardArticleProfile = ({ archive, name, slug }: CardType) => {
    const toPage = useRouter()
    return (
        <div className="w-full cursor-pointer flex gap-1" onClick={() => toPage.push("/profile/" + archive + "/" + slug)}>
            <div className="font-semibold text-two/75 font-serif text-lg w-(--full-12) my-2.5">{name}</div>
            <div className="w-12 opacity-25 hover:opacity-100"><DeleteIcon className='!w-12 !h-12 p-2' /></div>
        </div>)
}
export const CardArticleDetail = ({ archive, category, name, slug, content, author, createAt }: CardType) => {
    const toPage = useRouter()
    return (
        <div className="w-full bg-white rounded-md p-2 shadow-md" onClick={() => toPage.push("/" + archive + "/" + slug)}>
            <div className="font-serif text-four font-bold text-2xl uppercase">{name}</div>
            {category ? <div className='leading-4 text-sm  font-bold uppercase bg-three text-white w-max rounded-md py-1 px-2 mb-1 '>{category}</div> : null}
            <div className="h-4"></div>
            <div className=" text-justify text-sm sm:text-base dangerous_box">{parse(content)}</div>
            <div className="text-sm text-right">{moment(createAt).format("YYYY/MM/DD")}</div>
            <div className="font-bold text-xm leading-5 mb-4 text-right">{author}</div>
        </div>)
}
export const CardItemTop = ({ archive, name, content, slug, createAt }: CardType) => {
    const toPage = useRouter()
    return (
        <div className="w-full bg-white rounded-md p-2 shadow-md cursor-pointer" onClick={() => toPage.push("/" + archive + "/" + slug)}>
            <div className="font-serif text-three font-bold text-xl">{name}</div>
            <div className="text-sm opacity-50">{moment(createAt).format("YYYY/MM/DD")}</div>
            <div className="h-4"></div>
            <div className="h-24 line-clamp-4 text-justify text-sm sm:text-base">{parse(content.split(".")[0])}</div>
        </div>)
}
export const LoginCard = () => {

    const [_username, set_username] = useState<string>("")
    const [_password, set_password] = useState<string>("")

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const toPage = useRouter()

    const login = async (data: { username: string, password: string }) => {
        const result = await ApiLogin(data)
        if (result.success) {
            store.dispatch(setNoti({ open: true, msg: result.data, type: "noti", value: false }))
            setTimeout(() => {
                store.dispatch(setNoti({ open: false, msg: "", type: "", value: false }))
                store.dispatch(setLoginReFresh())
                toPage.push("/")
            }, 3000);
        } else {
            store.dispatch(setNoti({ open: true, msg: result.data, type: "noti", value: false }))
            setTimeout(() => {
                store.dispatch(setNoti({ open: false, msg: "", type: "", value: false }))
            }, 3000);
        }
    }

    return (
        <div className='bg-white text-three m-auto w-11/12 max-w-[440px] text-center p-10 shadow-md grid gap-1 rounded '>
            <div className="h-12 flex flex-col justify-center text-2xl font-bold">
                <h2>Login</h2>
            </div>
            <Input name="Username" onChange={(v) => set_username(v)} value={_username} />
            <Input name="Password" type={showPassword ? 'text' : 'password'} onChange={(v) => set_password(v)} value={_password}
                icon1={showPassword ?
                    <RemoveRedEyeIcon className='w-6 h-6 my-auto mx-1 cursor-pointer hover:text-colormain' onClick={() => setShowPassword(false)} /> :
                    <VisibilityOffIcon className='w-6 h-6 my-auto mx-1 cursor-pointer hover:text-colormain' onClick={() => setShowPassword(true)} />} />
            <div className="h-12">
            </div>
            <div className="h-12 flex flex-col justify-center">
                <p className='opacity-50 hover:opacity-100 cursor-pointer hover:text-colormain flex w-max m-auto'>Log in by google</p>
            </div>
            <div className="h-12 flex flex-col justify-center">
                <p>You do not have an account</p>
                <Link className='opacity-50 hover:opacity-100 hover:text-colormain' href={"signup"}>Sign Up!</Link>
            </div>
            <div className="h-12">
            </div>
            <button onClick={() => login({ username: _username, password: _password })} className='!w-2/3 m-auto h-12 bg-three text-white uppercase cursor-pointer' >Log In</button>
        </div>
    )
}
export const SignupCard = () => {

    const [_username, set_username] = useState<string>("")
    const [_password, set_password] = useState<string>("")
    const [_email, set_email] = useState<string>("")


    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isError, setIsErrors] = useState<boolean>(true)

    const [Error, setErrors] = useState<{ username?: string, password?: string, email?: string }>({})

    const signup = async (body: { username: string, password: string, email: string }) => {
        console.log(body)
    }

    useEffect(() => {
        const validateForm = async () => {
            const errors: { username?: string, password?: string, email?: string } = {}

            if (_username.length != 0 && 6 > _username.length) {
                errors.username = `username must be longer than 6 character`
            }
            // if (_username && apicheckusername) {
            //     const isusername = await fetch(apicheckusername + _username)
            //         .then((res) => res.json())
            //         .then((data) => data)
            //     if (isusername) { errors.username = "username is Exited" }
            // }
            if (!/\S+@\S+\.\S+/.test(_email) && _email.length != 0) {
                errors.email = 'this email is not valid';
            }
            // if (_email && apicheckemail) {
            //     const isEmail = await fetch(apicheckemail + _email)
            //         .then((res) => res.json())
            //         .then((data) => data)
            //     if (isEmail) { errors.email = "email is existed" }
            // }
            if (_password.length != 0 && _password.length < 6) {
                errors.password = `password must be longer than 6 character`;
            }

            setIsErrors(Object.keys(errors).length || _username === "" || _password === "" || _email === "" ? true : false);
            setErrors(errors)
        }
        if (validateForm) {
            validateForm();
        }
    }, [_username, _password, _email]);
    return (
        <div className='bg-white text-three m-auto w-11/12 max-w-[440px] text-center p-10 shadow-md grid gap-1 rounded '>
            <div className=" h-12 flex flex-col justify-center text-2xl font-bold">
                <h2>Sign Up</h2>
            </div>
            <Input name="Username" onChange={(v) => set_username(v)} value={_username} warn={Error.username} />
            <Input name="Password" type={showPassword ? 'text' : 'password'} onChange={(v) => set_password(v)} value={_password} warn={Error.password}
                icon1={showPassword ?
                    <RemoveRedEyeIcon className='w-6 h-6 my-auto mx-1 cursor-pointer' onClick={() => setShowPassword(false)} /> :
                    <VisibilityOffIcon className='w-6 h-6 my-auto mx-1 cursor-pointer' onClick={() => setShowPassword(true)} />}
            />
            <Input name="Email" onChange={(v) => set_email(v)} value={_email} warn={Error.email} />
            <div className="h-12 flex flex-col justify-center">
            </div>
            <div className="h-12 flex flex-col justify-center">
                <p className='opacity-50 hover:opacity-100 cursor-pointer hover:text-colormain flex w-max m-auto'>Log in by google</p>
            </div>
            <div className="h-12 flex flex-col justify-center">
                <p>Go back to Log In</p>
                <Link className='opacity-50 hover:opacity-100 hover:text-colormain' href={"login"}>Log In!</Link>
            </div>
            <div className="h-12"></div>
            <button onClick={() => signup({ username: _username, password: _password, email: _email })} className='!w-2/3 h-12 cursor-pointer m-auto bg-three text-white uppercase' >Sign Up</button>
        </div>
    )
}
