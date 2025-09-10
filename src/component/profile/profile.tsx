import React from 'react'
import { MenuProfile } from '../menu'

type Props = {
    children: React.ReactNode
}
const Profile = ({ children }: Props) => {
    return (
        <div>
            <div className="flex justify-center px-2">
                <div className="hidden w-(--lg-md) lg:block pr-2">
                    <div className="h-12"></div>
                    <MenuProfile />
                </div>
                <div className="w-full max-w-(--md)" >
                    {children}
                </div>
                <div className="hidden xl:block pl-2 w-(--xl-lg)">
                    {/* <About /> */}
                </div>
            </div>
            <div className=" xl:hidden p-2 ">
                <div className='w-full max-w-(--md) m-auto'>
                    {/* <About /> */}
                </div>
            </div>
        </div>)
}

export default Profile