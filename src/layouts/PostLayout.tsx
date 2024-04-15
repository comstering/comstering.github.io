import Image from "next/image"
import profileImage from "../../public/profile.png"

const PostLayout = ({children}: {children: React.ReactNode}) => (
    <div>
        <Image src={profileImage} alt="Comstering Blog" />
        <div>
            {children}
        </div>
    </div>
)

export default PostLayout;
