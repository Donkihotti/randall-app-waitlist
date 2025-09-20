import Image from "next/image"

export default function Logo () { 
    return ( 
        <div className="w-24 h-8 absolute top-5 left-5">
            <Image
            src={"/logo.svg"}
            alt="Randall Logo"
            fill={true}
            className="object-cover"
            />
        </div>
    )
}