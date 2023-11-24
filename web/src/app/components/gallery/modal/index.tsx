'use client'

import { useState, useRef, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface PhotoModalProps {
    gallerySlug: string
    thumb: string
    thumbWidth: number
    thumbHeight: number
    thumbAlt: string
    imageUuid: string
    imageUrl: string
    imageWidth: number
    imageHeight: number
}

export default function PhotoModal ({
    gallerySlug,
    thumb,
    thumbWidth,
    thumbHeight,
    thumbAlt,
    imageUuid,
    imageUrl,
    imageWidth,
    imageHeight,
}: PhotoModalProps) {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const imageRef = useRef<HTMLImageElement>(null)

    return (
        <div key={imageUuid}>
            {/* Thumbnail */}
            <button
                className="relative flex justify-center items-center focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 rounded-3xl group"
                onClick={() => { setModalOpen(true) }}
            >
                <Image className="rounded-3xl shadow-2xl transition-shadow duration-300 ease-in-out" src={thumb} width={thumbWidth} height={thumbHeight} priority alt={thumbAlt} />
            </button>

            <Transition show={modalOpen} as={Fragment} afterEnter={() => imageRef.current}>
                <Dialog initialFocus={imageRef} onClose={() => setModalOpen(false)}>

                    {/* Modal backdrop */}
                    <Transition.Child
                        className="fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity"
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-out duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        aria-hidden="true"
                    />
                    {/* End: Modal backdrop */}

                    {/* Modal dialog */}
                    <Transition.Child
                        className="fixed inset-0 z-10 flex p-4"
                        enter="transition ease-out duration-300"
                        enterFrom="opacity-0 scale-50"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-out duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-50"
                    >
                        <div className="max-w-5xl mx-auto h-full flex items-center">
                            <Dialog.Panel ref={imageRef} className="w-full max-h-full rounded-3xl shadow-2xl aspect-image bg-black overflow-hidden">
                                <div className="relative">
                                    <Dialog.Overlay className="absolute right-3 top-2 p-2 text-gray-200 drop-shadow" onClick={() => setModalOpen(false)}>
                                        <FontAwesomeIcon icon={faTimes} size="lg" />
                                    </Dialog.Overlay>
                                    <Image src={imageUrl} alt={imageUuid} width={imageWidth} height={imageHeight} quality={100} className="w-full max-h-[90vh]" />
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                    {/* End: Modal dialog */}

                </Dialog>
            </Transition>
        </div>
    )
}