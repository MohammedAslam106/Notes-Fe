import Link from "next/link";
import { TbBrandTwitter,TbBrandInstagram, TbBrandGithub, TbBrandFacebook, TbBrandLinkedin } from "react-icons/tb";


export default function Footer(){
    return(
        <div className=" relative bottom-0 bg-[#6f9196] w-full px-16 py-5  h-28 z-10">
            <ol className=" list-none flex justify-center gap-5">
                <li className="bg-blue-300 rounded-full shadow-xl"><Link href="https://twitter.com/home" target="blank"><TbBrandTwitter color="" size={30} className="p-2 "/></Link></li>
                <li className="bg-pink-700 rounded-full shadow-xl"><Link href="https://www.instagram.com/mohammedaslam4106/" target="blank"><TbBrandInstagram color="" size={30} className="p-2"/></Link></li>
                <li className="bg-blue-600 rounded-full shadow-xl"><Link href="https://www.linkedin.com/in/mohammed-aslam-152b52217/" target="blank"><TbBrandLinkedin color="" size={30} className="p-2"/></Link></li>
                <li className="bg-gray-700 rounded-full shadow-xl"><Link href="https://github.com/" target="blank"><TbBrandGithub color="" size={30} className="p-2"/></Link></li>
                <li className="bg-blue-500 rounded-full shadow-xl"><Link href="https://www.facebook.com/profile.php?id=100041960631732" target="blank"><TbBrandFacebook color="" size={30} className="p-2"/></Link></li>
            </ol>
            <div className="mt-2">
                <h3 className="text-center">© 2020 Copyright: mohammedaslam.com</h3>
            </div>
        </div>
    )
}