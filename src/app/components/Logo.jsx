import Image from "next/image"

export default function Logo () { 
    return ( 
        <div className="md:w-24 md:h-8 w-16 h-5 absolute top-2 left-2 md:top-5 md:left-5">
            <Image
            src={"/logo.svg"}
            alt="Randall Logo"
            fill={true}
            className="object-cover"
            />
        </div>
    )
}