import Image from "next/image"
import profileImage from "../../public/profile.png"
import Head from "next/head";

type ContentLayoutProps = {
    title: string;
    date: string;
    children: React.ReactNode;
};

const ContentLayout = ({title, date, children}: ContentLayoutProps) => (
    <div>
        <Head>
            <title>{title}</title>
        </Head>
        <article>
            <h1>{title}</h1>
            <div>{date}</div>
            <div>
                {children}
            </div>
        </article>
    </div>
);

export default ContentLayout;