import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import PatientList from './PatientList'
import AppointmentList from './AppointmentList'
import AddAppointment from './AddAppointment'
import AddPatient from './AddPatient'

const navigation = [
    { name: 'Appointments', href: '#', component: 'AppointmentList' },
    { name: 'New Appointment', href: '#', component: 'AddAppointment' },
    { name: 'Patient Check-in', href: '#', component: 'PatientList' },
    { name: 'Add Patient', href: '#', component: 'AddPatient' },
    { name: 'Calendar', href: '#', component: 'Calendar' },
]
function Calendar() {
    return <div>Calendar Component</div>
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard({ patients, handleCheckIn }) {
    const [activeComponent, setActiveComponent] = useState(null)

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <img
                                        alt="Your Company"
                                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                        className="size-8"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={() => setActiveComponent(item.component)}
                                                className={classNames(
                                                    activeComponent === item.component
                                                        ? 'bg-gray-700 text-white' // Highlight active item
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                                    <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>
                </Disclosure>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hospital Management System</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {/* Dynamically Render the Component */}
                        {activeComponent === 'AppointmentList' && <AppointmentList />}
                        {activeComponent === 'AddAppointment' && <AddAppointment />}
                        {activeComponent === 'PatientList' && <PatientList patients={patients} handleCheckIn={handleCheckIn} />}
                        {activeComponent === 'AddPatient' && <AddPatient />}
                        {activeComponent === 'Calendar' && <Calendar />}
                    </div>
                </main>
            </div>
        </>
    )
}
