'use client'
import React, { useEffect, useState } from 'react'
import Header from './header'
import { MenuComponent } from './menu'
import About from './about'
import { useParams } from 'next/navigation'
import Profile from './profile/profile'
import { UserType } from '@/redux/reducer/UserReduce'
import store from '@/redux/store'
import { LoginCard } from './card'
import { ModalNoti } from './modal/modal'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)

    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    }, [])
    const params = useParams<{ archive: string }>()
    const archive = params.archive
    return (
        <div className="max-w-(--xl) m-auto">
            <Header />
            {archive === "profile" ?
                _currentUser.id ?
                    <Profile >{children}</Profile> :
                    <div className='h-(--scrh-12) flex flex-col justify-center'>
                        <LoginCard />
                    </div> :
                <div>
                    <div className="flex justify-center">
                        <div className="hidden w-(--lg-md) lg:block">
                            <div className="h-12"></div>
                            <MenuComponent />
                        </div>
                        <div className="w-full max-w-(--md) px-2" >
                            {children}
                        </div>
                        <div className="hidden xl:block w-(--xl-lg)">
                            {/* <About /> */}
                        </div>
                    </div>
                    {/* <div className=" xl:hidden p-2 ">
                        <div className='w-full max-w-(--md) m-auto'>
                            <About />
                        </div>
                    </div> */}
                </div>
            }
            <ModalNoti />
        </div>
    )
}

export default Layout